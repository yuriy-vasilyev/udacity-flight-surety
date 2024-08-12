const express = require("express");
const { ethers } = require("ethers");
const config = require("./config.json");
const FlightSuretyData = require("../contracts/artifacts/contracts/FlightSuretyData.sol/FlightSuretyData.json");

const registerOracles = async (contract) => {
  for await (const oracle of config.oracles) {
    console.log("Registering oracle:", oracle.address);

    const signer = new ethers.Wallet(oracle.key, contract.runner.provider);

    const result = await contract.connect(signer).registerOracle({
      value: ethers.parseEther("1"),
    });

    await result.wait();

    console.log("Oracle registered:", oracle.address);
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
    .on("OracleRegistered", (requestId) => {
      console.log("OracleRegistered", requestId);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  contract
    .on("OracleRequest", (requestId) => {
      console.log("OracleRequest", requestId);
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
    message: "An API for use with your DApp!",
  });
});

module.exports = app;
