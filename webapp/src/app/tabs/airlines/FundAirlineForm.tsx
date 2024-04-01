import { FC, useState } from "react";
import useContract from "@/hooks/useContract";
import { useAlert } from "@/hooks/alert";
import { ethers } from "ethers";
import { getErrorMessage } from "@/helpers";

const FundAirlineForm: FC = () => {
  const { contract, signer } = useContract();
  const [loading, setLoading] = useState(false);
  const { alert } = useAlert();

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await contract?.fundAirline({
        value: ethers.parseEther("10"),
      });

      alert({
        type: "success",
        message: "Your airline has been funded successfully!",
        autoClose: 5000,
      });
    } catch (error) {
      alert({
        type: "error",
        message: getErrorMessage(error),
      });
    }

    setLoading(false);
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Fund your airline
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Airline can be registered, but does not participate in contract
            until it submits funding of 10 ether
          </p>
        </div>

        <div className="md:col-span-2">
          <button
            type="button"
            className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            onClick={handleSubmit}
            disabled={loading}
          >
            Fund airline
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundAirlineForm;
