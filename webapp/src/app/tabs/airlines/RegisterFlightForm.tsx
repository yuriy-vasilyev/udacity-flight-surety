import { FC } from "react";
import useContract from "@/hooks/useContract";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAlert } from "@/hooks/alert";
import { getErrorMessage } from "@/helpers";
import moment from "moment";

interface FormType {
  airlineName: string;
  datetime: number;
  origin: string;
  destination: string;
}

const INITIAL_VALUES: FormType = {
  airlineName: "",
  datetime: moment().valueOf(),
  origin: "",
  destination: "",
};

const validationSchema = Yup.object().shape({
  airlineName: Yup.string().required("This field is required."),
  datetime: Yup.number().required("This field is required."),
  origin: Yup.string().required("This field is required."),
  destination: Yup.string().required("This field is required."),
});

const RegisterFlightForm: FC = () => {
  const { contract } = useContract();
  const { alert } = useAlert();

  const formik = useFormik<FormType>({
    initialValues: INITIAL_VALUES,
    validationSchema: validationSchema,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        await contract?.registerFlight(
          values.airlineName,
          values.datetime,
          values.origin,
          values.destination,
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
              <div>
                <label
                  htmlFor="new-flight-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Airline name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="new-flight-name"
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    {...formik.getFieldProps("airlineName")}
                  />
                  {formik.touched.airlineName && formik.errors.airlineName && (
                    <p className="mt-3 text-sm leading-6 text-red-600">
                      {formik.errors.airlineName}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="new-flight-datetime"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Date and time
                </label>
                <div className="mt-2">
                  <input
                    type="datetime-local"
                    id="new-flight-datetime"
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    {...formik.getFieldProps("datetime")}
                    onChange={(e) => {
                      formik.setFieldValue(
                        "datetime",
                        moment(e.target.value).valueOf(),
                      );
                    }}
                    value={moment(formik.values.datetime).format(
                      "YYYY-MM-DDTHH:mm",
                    )}
                  />
                  {formik.touched.datetime && formik.errors.datetime && (
                    <p className="mt-3 text-sm leading-6 text-red-600">
                      {formik.errors.datetime}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="new-flight-origin"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Origin
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="new-flight-origin"
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    {...formik.getFieldProps("origin")}
                  />
                  {formik.touched.origin && formik.errors.origin && (
                    <p className="mt-3 text-sm leading-6 text-red-600">
                      {formik.errors.origin}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="new-flight-destination"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Origin
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="new-flight-destination"
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    {...formik.getFieldProps("destination")}
                  />
                  {formik.touched.destination && formik.errors.destination && (
                    <p className="mt-3 text-sm leading-6 text-red-600">
                      {formik.errors.destination}
                    </p>
                  )}
                </div>
              </div>

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
