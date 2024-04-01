// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// These files are dynamically created at test time
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/FlightSuretyData.sol";

contract FlightSuretyData {
  function testInitialBalanceUsingDeployedContract() public {
    FlightSuretyData meta = FlightSuretyData(
      DeployedAddresses.FlightSuretyData()
    );

    uint expected = 10000;

    Assert.equal(
      meta.getBalance(tx.origin),
      expected,
      "Owner should have 10000 MetaCoin initially"
    );
  }

  function testInitialBalanceWithNewMetaCoin() public {
    FlightSuretyData meta = new FlightSuretyData();

    uint expected = 10000;

    Assert.equal(
      meta.getBalance(tx.origin),
      expected,
      "Owner should have 10000 MetaCoin initially"
    );
  }
}
