import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import config from "../../config.json";

export default buildModule("FlightSuretyModule", (m) => {
  const flightSuretyData = m.contract("FlightSuretyData", [
    config.ownerAddress,
    config.firstAirlineAddress,
  ]);

  const flightSuretyApp = m.contract("FlightSuretyApp");

  m.call(flightSuretyData, "authorizeContract", [config.appContractAddress]);

  return { flightSuretyData, flightSuretyApp };
});
