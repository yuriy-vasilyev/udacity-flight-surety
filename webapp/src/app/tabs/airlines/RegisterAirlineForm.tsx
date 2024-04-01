import { FC } from "react";
import useContract from "@/hooks/useContract";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAlert } from "@/hooks/alert";
import { getErrorMessage } from "@/helpers";

interface FormType {
  address: string;
}

const INITIAL_VALUES: FormType = {
  address: "",
};

const validationSchema = Yup.object().shape({
  address: Yup.string()
    .required("This field is required.")
    .matches(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
});

const RegisterAirlineForm: FC = () => {
  const { contract } = useContract();
  const { alert } = useAlert();

  const formik = useFormik<FormType>({
    initialValues: INITIAL_VALUES,
    validationSchema: validationSchema,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        await contract?.registerAirline(values.address);

        formik.resetForm();

        alert({
          type: "success",
          message: `Airline registered at address ${values.address}`,
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
                Register a new airline
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Only existing airline may register a new airline until there are
                at least four airlines registered.
              </p>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Registration of fifth and subsequent airlines requires
                multi-party consensus of 50% of registered airlines.
              </p>
            </div>

            <div className="md:col-span-2">
              <div>
                <label
                  htmlFor="new-airline-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="new-airline-address"
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    {...formik.getFieldProps("address")}
                  />
                  {formik.touched.address && formik.errors.address && (
                    <p className="mt-3 text-sm leading-6 text-red-600">
                      {formik.errors.address}
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
                  Register airline
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterAirlineForm;
