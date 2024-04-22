import { FC, useEffect } from "react";
import useContract from "@/hooks/useContract";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAlert } from "@/hooks/alert";
import { generateFlightKey, getErrorMessage } from "@/helpers";
import { useFlights } from "@/hooks/useFlights";
import FlightDropdown from "@/components/form/FlightDropdown";
import { ethers } from "ethers";

interface FormType {
  index: number;
}

const INITIAL_VALUES: FormType = {
  index: 0,
};

const validationSchema = Yup.object().shape({
  index: Yup.number().required("This field is required."),
});

const RegisterFlightForm: FC = () => {
  const { contract } = useContract();
  const { alert } = useAlert();
  const { flights, error: flightsError, loading } = useFlights();

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
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        const chosenFlight = flights[values.index];

        const flightKey = ethers.encodeBytes32String(
          generateFlightKey(chosenFlight),
        );

        const tx = await contract?.registerFlight(
          flightKey,
          chosenFlight.name,
          chosenFlight.datetime,
          chosenFlight.origin,
          chosenFlight.destination,
        );

        formik.resetForm();

        alert({
          type: "success",
          message: `Flight has been registered successfully.`,
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
                Register a new flight
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Only registered and funded airlines may register a new flight.
              </p>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Registered flights will be available for insuring by passengers.
              </p>
            </div>

            <div className="md:col-span-2">
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

              <div className="mt-6">
                <button
                  type="submit"
                  className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                  disabled={formik.isSubmitting}
                >
                  Register flight
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterFlightForm;
