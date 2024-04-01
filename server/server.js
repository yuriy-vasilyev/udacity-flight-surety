const express = require("express");
const { ethers } = require("ethers");
const config = require("./config.json");
const FlightSuretyData = require("../contracts/build/contracts/FlightSuretyData.json");

const registerOracles = async (contract) => {
  for (const oracle of config.oracles) {
    const theContract = contract.connect(oracle.address);

    const result = await theContract.registerOracle({
      value: ethers.parseEther("1"),
    });

    console.log("Oracle registered!", result);
  }
};

const init = async () => {
  const provider = new ethers.JsonRpcProvider(config.url);

  const contract = new ethers.Contract(
    config.dataAddress,
    FlightSuretyData.abi,
    { provider },
  );

  await contract.waitForDeployment();

  initEvents(contract);

  await registerOracles(contract);
};

const initEvents = (contract) => {
  contract
    .on("OracleRegistered", (requestId, data) => {
      console.log("OracleRegistered", requestId, data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  contract
    .on("OracleRequest", (requestId, data) => {
      console.log("OracleRequest", requestId, data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

init().catch((error) => {
  console.error("Error initializing:", error);
});

const app = express();
app.get("/api", (req, res) => {
  res.send({
    message: "An API for use with your Dapp!",
  });
});

module.exports = app;
