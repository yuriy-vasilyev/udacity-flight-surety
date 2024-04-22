import { FC, useCallback, useEffect, useState } from "react";
import useContract from "@/hooks/useContract";
import { useAlert } from "@/hooks/alert";
import { getErrorMessage } from "@/helpers";
import { ethers } from "ethers";

const WithdrawCreditsForm: FC = () => {
  const [loading, setLoading] = useState(false);
  const { contract } = useContract();
  const [currentCredit, setCurrentCredit] = useState(0);
  const { alert } = useAlert();

  const fetchCredits = useCallback(async () => {
    if (!contract) {
      return;
    }

    try {
      const credit = await contract.getPassengerCredit();
      setCurrentCredit(parseFloat(ethers.formatEther(credit)));
    } catch (error: unknown) {
      alert({
        type: "error",
        message: getErrorMessage(error),
      });
    }
  }, [contract]);

  useEffect(() => {
    fetchCredits().catch(console.error);
  }, [contract]);

  const handleWithdraw = async () => {
    setLoading(true);

    try {
      await contract?.withdrawCredit();
      await fetchCredits();

      alert({
        type: "success",
        message: "Credits withdrawn successfully!",
      });
    } catch (error: unknown) {
      alert({
        type: "error",
        message: getErrorMessage(error),
      });
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="space-y-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Withdraw Credits
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Passenger can withdraw any funds owed to them as a result of
              receiving credit for insurance payouts.
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="flex items-center gap-4">
              <label
                htmlFor="currentCredit"
                className="block text-sm font-medium text-gray-700"
              >
                Current credit:
              </label>
              <span
                id="currentCredit"
                className="text-sm font-bold text-gray-900"
              >
                {currentCredit} ETH
              </span>
            </div>
            <div className="mt-6">
              <button
                type="button"
                className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                disabled={loading || !currentCredit}
                onClick={handleWithdraw}
              >
                Withdraw credits
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawCreditsForm;
