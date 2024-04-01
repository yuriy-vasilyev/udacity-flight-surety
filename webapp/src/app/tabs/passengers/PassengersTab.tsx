import { FC } from "react";
import BuyInsuranceForm from "@/app/tabs/passengers/BuyInsuranceForm";

const PassengersTab: FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Passengers</h1>
      <div className="mt-6 flex flex-col gap-6 md:gap-10">
        <BuyInsuranceForm />
      </div>
    </div>
  );
};

export default PassengersTab;
