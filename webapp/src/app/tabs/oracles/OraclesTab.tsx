import { FC } from "react";
import RegisterFlightForm from "@/app/tabs/oracles/RegisterFlightForm";

const OraclesTab: FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Oracles</h1>
      <div className="mt-6 flex flex-col gap-6 md:gap-10">
        <RegisterFlightForm />
      </div>
    </div>
  );
};

export default OraclesTab;
