import { FC } from "react";
import RegisterAirlineForm from "@/app/tabs/airlines/RegisterAirlineForm";
import FundAirlineForm from "@/app/tabs/airlines/FundAirlineForm";

const AirlinesTab: FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Airlines</h1>
      <div className="mt-6 flex flex-col gap-6 md:gap-10">
        <RegisterAirlineForm />
        <FundAirlineForm />
      </div>
    </div>
  );
};

export default AirlinesTab;
