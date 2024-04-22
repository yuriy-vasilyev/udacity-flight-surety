import { FC } from "react";
import BuyInsuranceForm from "@/app/tabs/passengers/BuyInsuranceForm";
import WithdrawCreditsForm from "@/app/tabs/passengers/WithdrawCreditsForm";

const PassengersTab: FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Passengers</h1>
      <div className="mt-6 flex flex-col gap-6 md:gap-10">
        <BuyInsuranceForm />
        <WithdrawCreditsForm />
      </div>
    </div>
  );
};

export default PassengersTab;
