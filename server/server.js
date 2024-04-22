const express = require("express");
const { ethers } = require("ethers");
const config = require("./config.json");
const FlightSuretyData = require("../contracts/artifacts/contracts/FlightSuretyData.sol/FlightSuretyData.json");

const registerOracles = async (contract, provider) => {
  try {
    for (const oracle of config.oracles) {
      const signer = new ethers.Wallet(oracle.key, provider);

      await contract.connect(signer).registerOracle({
        value: ethers.parseEther("1"),
      });
    }
  } catch (error) {
    console.error("Error registering oracles:", error);
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

  await registerOracles(contract, provider);
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
