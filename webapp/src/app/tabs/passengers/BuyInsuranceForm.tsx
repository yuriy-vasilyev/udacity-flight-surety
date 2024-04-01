import { FC, Fragment } from "react";
import useContract from "@/hooks/useContract";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAlert } from "@/hooks/alert";
import {
  formatFlightDate,
  generateFlightKey,
  getErrorMessage,
} from "@/helpers";
import { useFlights } from "@/hooks/useFlights";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { Listbox, Transition } from "@headlessui/react";
import { Flight } from "@/types/Flight";
import classNames from "classnames";
import { ethers } from "ethers";

interface FormType {
  index: number;
  value: number;
}

const INITIAL_VALUES: FormType = {
  index: 0,
  value: 0,
};

const validationSchema = Yup.object().shape({
  index: Yup.number().required("This field is required."),
  value: Yup.number()
    .required("This field is required.")
    .positive("This field must be a positive number.")
    .max(1, "The maximum value is 1 ether."),
});

const BuyInsuranceForm: FC = () => {
  const { contract } = useContract();
  const { alert } = useAlert();
  const { flights, error, loading } = useFlights();

  if (error) {
    alert({
      type: "error",
      message: error,
    });
  }

  const formik = useFormik<FormType>({
    initialValues: INITIAL_VALUES,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const flightKey = ethers.encodeBytes32String(
          generateFlightKey(flights[values.index]),
        );

        await contract?.purchaseInsurance(flightKey, {
          value: ethers.parseEther(values.value.toString()),
        });

        formik.resetForm();

        alert({
          type: "success",
          message: "Flight insurance purchased successfully!",
          autoClose: 5000,
        });
      } catch (error) {
        alert({
          type: "error",
          message: getErrorMessage(error),
        });
      }
    },
  });

  const chosenFlight = flights[formik.values.index];

  const generateFlightLabel = (flight: Flight) =>
    flight
      ? `${flight.airline}${flight.flightNumber} - ${formatFlightDate(flight.periodOfOperationUTC.startDate)}`
      : "Select a flight";

  return (
    <div>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Buy flight insurance
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Passengers may pay up to 1 ether for purchasing flight
                insurance.
              </p>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                If flight is delayed due to airline fault, passenger receives
                credit of 1.5X the amount they paid.
              </p>
            </div>

            <div className="md:col-span-2">
              <div>
                <div className="mt-2">
                  <Listbox
                    value={formik.values.index}
                    onChange={(value) => formik.setFieldValue("index", value)}
                  >
                    {({ open }) => (
                      <>
                        <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                          Flight
                        </Listbox.Label>
                        <div className="relative mt-2">
                          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 sm:text-sm sm:leading-6">
                            <span className="block truncate">
                              {generateFlightLabel(chosenFlight)}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {flights.length > 0 &&
                                flights.map((item, index) => (
                                  <Listbox.Option
                                    key={index}
                                    className={({ active }) =>
                                      classNames(
                                        active
                                          ? "bg-emerald-600 text-white"
                                          : "text-gray-900",
                                        "relative cursor-default select-none py-2 pl-3 pr-9",
                                      )
                                    }
                                    value={index}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <span
                                          className={classNames(
                                            selected
                                              ? "font-semibold"
                                              : "font-normal",
                                            "block truncate",
                                          )}
                                        >
                                          {generateFlightLabel(item)}
                                        </span>

                                        {selected ? (
                                          <span
                                            className={classNames(
                                              active
                                                ? "text-white"
                                                : "text-emerald-600",
                                              "absolute inset-y-0 right-0 flex items-center pr-4",
                                            )}
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                  {formik.touched.index && formik.errors.index && (
                    <p className="mt-3 text-sm leading-6 text-red-600">
                      {formik.errors.index}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="website"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Amount
                </label>
                <div className="mt-2">
                  <div className="flex w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-600 sm:max-w-md">
                    <input
                      type="text"
                      id="website"
                      className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      {...formik.getFieldProps("value")}
                    />
                    <span className="flex select-none items-center pr-3 text-gray-500 sm:text-sm">
                      ether
                    </span>
                  </div>
                </div>
                {formik.touched.value && formik.errors.value ? (
                  <p className="mt-3 text-sm leading-6 text-red-600">
                    {formik.errors.value}
                  </p>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Max. 1 ether
                  </p>
                )}
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                  disabled={formik.isSubmitting}
                >
                  Buy insurance
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BuyInsuranceForm;
