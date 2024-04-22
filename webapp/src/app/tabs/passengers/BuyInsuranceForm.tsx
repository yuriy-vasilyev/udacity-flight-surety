import { FC, useEffect } from "react";
import useContract from "@/hooks/useContract";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAlert } from "@/hooks/alert";
import { getErrorMessage } from "@/helpers";
import { ethers } from "ethers";
import FlightDropdown from "@/components/form/FlightDropdown";
import { useRegisteredFlights } from "@/hooks/useRegisteredFlights";

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
  const { flights, error: flightsError, loading } = useRegisteredFlights();

  useEffect(() => {
    if (!flightsError) {
      return;
    }

    alert({
      type: "error",
      message: getErrorMessage(flightsError),
    });
  }, [flightsError]);

  const formik = useFormik<FormType>({
    initialValues: INITIAL_VALUES,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const chosenFlight = flights[values.index];

        await contract?.purchaseInsurance(chosenFlight.flightKey, {
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
                  <FlightDropdown
                    flights={flights}
                    loading={loading}
                    value={formik.values.index}
                    onChange={(value: number) =>
                      formik.setFieldValue("index", value)
                    }
                    error={
                      formik.touched.index && formik.errors.index
                        ? formik.errors.index
                        : undefined
                    }
                  />
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
