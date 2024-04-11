import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import config from "../../config.json";

export default buildModule("FlightSurety", (m) => {
  const dataContract = m.contract("FlightSuretyData", [
    config.ownerAddress,
    config.firstAirlineAddress,
  ]);

  return { dataContract };
});
