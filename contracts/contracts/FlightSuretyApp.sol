// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.24 to v0.9.0
pragma solidity ^0.8.24;

// Contracts
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

// Libs
import "@openzeppelin/contracts/utils/math/Math.sol";

contract FlightSuretyApp is Ownable, Pausable, ReentrancyGuard {
  using Math for uint256;

  FlightSuretyData flightSuretyData;

  uint8 private constant STATUS_CODE_UNKNOWN = 0;
  uint8 private constant STATUS_CODE_ON_TIME = 10;
  uint8 private constant STATUS_CODE_LATE_AIRLINE = 20;
  uint8 private constant STATUS_CODE_LATE_WEATHER = 30;
  uint8 private constant STATUS_CODE_LATE_TECHNICAL = 40;
  uint8 private constant STATUS_CODE_LATE_OTHER = 50;

  struct Flight {
    string name;
    uint256 updatedTimestamp;
    uint256 datetime;
    string origin;
    string destination;
    bool isRegistered;
    uint8 statusCode;
    address airline;
  }

  mapping(bytes32 => Flight) private flights;

  // Events
  event FlightRegistered(bytes32 flightKey, uint8 statusCode);
  event FlightStatusUpdated(bytes32 flightKey, uint8 statusCode);

  constructor(address initialOwner) Ownable(initialOwner) {}

  function setDataContract(address dataContract) public onlyOwner {
    flightSuretyData = FlightSuretyData(dataContract);
  }

  function registerAirline(
    address airlineAddress,
    string calldata name
  ) public {
    flightSuretyData.registerAirline(airlineAddress, name);
  }

  function registerFlight(
    bytes32 flightKey,
    string memory name,
    uint256 timestamp,
    string memory origin,
    string memory destination
  ) public {
    flights[flightKey] = Flight({
      name: name,
      datetime: timestamp,
      updatedTimestamp: timestamp,
      origin: origin,
      destination: destination,
      isRegistered: true,
      statusCode: STATUS_CODE_UNKNOWN,
      airline: msg.sender
    });

    emit FlightRegistered(flightKey, STATUS_CODE_UNKNOWN);
  }

  /**
   * @dev Called after oracle has updated flight status
   *
   */
  function processFlightStatus(
    string memory flight,
    bytes32 flightKey,
    uint256 timestamp,
    uint8 statusCode
  ) internal {
    require(flights[flightKey].isRegistered, "Flight is not registered.");

    flights[flightKey].updatedTimestamp = timestamp;
    flights[flightKey].statusCode = statusCode;

    if (statusCode == STATUS_CODE_LATE_AIRLINE) {
      flightSuretyData.creditInsurees(flight);
    }
  }

  function updateFlightStatus(bytes32 flightKey, uint8 statusCode) public {
    require(flights[flightKey].isRegistered, "Flight is not registered.");

    flights[flightKey].statusCode = statusCode;
    flights[flightKey].updatedTimestamp = block.timestamp;

    emit FlightStatusUpdated(flightKey, statusCode);
  }

  function getFlight(
    bytes32 flightKey
  )
    public
    view
    returns (
      string memory name,
      uint256 datetime,
      string memory origin,
      string memory destination,
      bool isRegistered,
      uint8 statusCode,
      uint256 updatedTimestamp,
      address airline
    )
  {
    Flight memory flight = flights[flightKey];

    return (
      flight.name,
      flight.datetime,
      flight.origin,
      flight.destination,
      flight.isRegistered,
      flight.statusCode,
      flight.updatedTimestamp,
      flight.airline
    );
  }

  function setPausableStatus(bool mode) public onlyOwner {
    require(paused() != mode, "Contract is already in the state requested.");

    if (mode) {
      _pause();
    } else {
      _unpause();
    }
  }

  // region ORACLE MANAGEMENT

  // Fee to be paid when registering oracle
  uint256 public constant REGISTRATION_FEE = 1 ether;

  // Number of oracles that must respond for valid status
  uint256 private constant MIN_RESPONSES = 3;

  struct Oracle {
    bool isRegistered;
    uint8[3] indexes;
  }

  // Track all registered oracles
  mapping(address => Oracle) private oracles;

  // Model for responses from oracles
  struct ResponseInfo {
    address requester; // Account that requested status
    bool isOpen; // If open, oracle responses are accepted
    mapping(uint8 => address[]) responses; // Mapping key is the status code reported
    // This lets us group responses and identify
    // the response that majority of the oracles
  }

  // Track all oracle responses
  // Key = hash(index, flight, timestamp)
  mapping(bytes32 => ResponseInfo) private oracleResponses;

  // Event fired each time an oracle submits a response
  event FlightStatusInfo(
    address airline,
    string flight,
    uint256 timestamp,
    uint8 status
  );

  event OracleReport(
    address airline,
    string flight,
    uint256 timestamp,
    uint8 status
  );

  event OracleRegistered(address oracle);

  // Event fired when flight status request is submitted
  // Oracles track this and if they have a matching index
  // they fetch data and submit a response
  event OracleRequest(
    uint8 index,
    address airline,
    string flight,
    uint256 timestamp
  );

  // Register an oracle with the contract
  function registerOracle() external payable {
    // Require registration fee
    require(msg.value >= REGISTRATION_FEE, "Registration fee is required");

    // Revert if the oracle is already registered
    require(!oracles[msg.sender].isRegistered, "Oracle is already registered");

    uint8[3] memory indexes = generateIndexes();

    oracles[msg.sender] = Oracle({isRegistered: true, indexes: indexes});

    emit OracleRegistered(msg.sender);
  }

  function getMyIndexes() external view returns (uint8[3] memory) {
    require(oracles[msg.sender].isRegistered, "Not registered as an oracle");

    return oracles[msg.sender].indexes;
  }

  // Called by oracle when a response is available to an outstanding request
  // For the response to be accepted, there must be a pending request that is open
  // and matches one of the three Indexes randomly assigned to the oracle at the
  // time of registration (i.e. uninvited oracles are not welcome)
  function submitOracleResponse(
    uint8 index,
    address airline,
    string memory flight,
    uint256 timestamp,
    uint8 statusCode
  ) external {
    require(oracles[msg.sender].isRegistered, "Oracle is not registered");

    require(
      (oracles[msg.sender].indexes[0] == index) ||
        (oracles[msg.sender].indexes[1] == index) ||
        (oracles[msg.sender].indexes[2] == index),
      "Index does not match oracle request"
    );

    bytes32 key = keccak256(
      abi.encodePacked(index, airline, flight, timestamp)
    );

    require(
      oracleResponses[key].isOpen,
      "Flight or timestamp do not match oracle request"
    );

    oracleResponses[key].responses[statusCode].push(msg.sender);

    // Information isn't considered verified until at least MIN_RESPONSES
    // oracles respond with the *** same *** information
    emit OracleReport(airline, flight, timestamp, statusCode);
    if (oracleResponses[key].responses[statusCode].length >= MIN_RESPONSES) {
      emit FlightStatusInfo(airline, flight, timestamp, statusCode);

      // Handle flight status as appropriate
      processFlightStatus(flight, key, timestamp, statusCode);
    }
  }

  function getFlightKey(
    address airline,
    string memory flight,
    uint256 timestamp
  ) internal pure returns (bytes32) {
    return keccak256(abi.encodePacked(airline, flight, timestamp));
  }

  // Indexes are hardcoded because auto-generation is not reliable,
  // such operations run out of gas pretty often
  uint8[3][20] private oracleIndexes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 0, 1],
    [2, 3, 4],
    [5, 6, 7],
    [8, 9, 0],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 0, 1],
    [2, 3, 4],
    [5, 6, 7],
    [8, 9, 0],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];

  uint8 private nonce = 0;

  function generateIndexes() internal returns (uint8[3] memory) {
    uint8 currentNonce = nonce;

    uint8[3] memory newIndexes = [
      oracleIndexes[currentNonce][0],
      oracleIndexes[currentNonce][1],
      oracleIndexes[currentNonce][2]
    ];

    if (nonce + 1 == oracleIndexes.length) {
      nonce = 0;
    } else {
      nonce++;
    }

    return newIndexes;
  }

  // endregion

  receive() external payable {
    revert();
  }

  /**
   * @dev Fallback function for funding smart contract.
   *
   */
  fallback() external payable {
    revert();
  }
}

abstract contract FlightSuretyData {
  function registerAirline(
    address airlineAddress,
    string calldata name
  ) external virtual returns (bool);
  function creditInsurees(string calldata flightCode) external virtual;
  function withdraw(
    address payable insuredPassenger
  )
    public
    virtual
    returns (uint256, uint256, uint256, uint256, address, address);
}
