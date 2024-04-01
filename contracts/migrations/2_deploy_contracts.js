const FlightSuretyData = artifacts.require("FlightSuretyData");
// const FlightSuretyApp = artifacts.require("FlightSuretyApp");

const data = require("../config.json");

module.exports = function (deployer) {
  deployer.deploy(
    FlightSuretyData,
    data.ownerAddress,
    data.firstAirlineAddress
  );

  // deployer.deploy(FlightSuretyData).then(() => {
  //   return deployer.deploy(FlightSuretyApp, data.ownerAddress, FlightSuretyData.address);
  // });
};
