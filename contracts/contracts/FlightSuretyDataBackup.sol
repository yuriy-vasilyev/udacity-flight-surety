// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.24 to v0.9.0
pragma solidity ^0.8.24;

// Contracts
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

// Libs
import "@openzeppelin/contracts/utils/math/Math.sol";

contract FlightSuretyData is Ownable, Pausable, ReentrancyGuard {
  using Math for uint256;

  uint256 private airlineCount = 0;

  uint256 private constant AIRLINE_FUNDING_AMOUNT = 10 ether;
  uint8 private constant AIRLINE_MULTIPARTY_THRESHOLD = 4;
  uint8 private constant AIRLINE_MULTIPARTY_CONSENSUS_PERCENT = 50;

  uint256 private constant INSURANCE_LIMIT = 1 ether;
  uint8 private constant INSURANCE_RATE_PERCENT = 150;
  uint8 private constant STATUS_CODE_UNKNOWN = 0;
  uint8 private constant STATUS_CODE_ON_TIME = 10;
  uint8 private constant STATUS_CODE_LATE_AIRLINE = 20;
  uint8 private constant STATUS_CODE_LATE_WEATHER = 30;
  uint8 private constant STATUS_CODE_LATE_TECHNICAL = 40;
  uint8 private constant STATUS_CODE_LATE_OTHER = 50;

  // Structs
  struct Airline {
    bool isRegistered;
    bool isFunded;
  }

  struct Insurance {
    address passenger;
    uint256 amount;
  }

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

  // Mappings
  mapping(address => uint256) private authorizedContracts;
  mapping(address => Airline) private airlines;
  mapping(bytes32 => Insurance[]) private insurances;
  mapping(address => uint256) private passengerCredits;
  mapping(address => address[]) private airlineRegistrationVotes;
  mapping(bytes32 => Flight) private flights;

  // Events
  event AirlineRegistered(address airline);
  event AirlineFunded(address airline);
  event InsurancePurchased(address passenger, bytes32 flightKey);
  event InsuranceCredited(address passenger, uint256 amount);
  event InsuranceWithdrawn(address passenger, uint256 amount);
  event FlightRegistered(bytes32 flightKey, uint8 statusCode);
  event FlightStatusUpdated(bytes32 flightKey, uint8 statusCode);
  event AuthorizedContract(address contractAddress);
  event DeauthorizedContract(address contractAddress);

  modifier onlyAuthorizedContract() {
    require(authorizedContracts[msg.sender] == 1, "Caller is not authorized.");
    _;
  }

  modifier onlyAirline() {
    require(
      airlines[msg.sender].isRegistered,
      "Caller is not a registered airline."
    );
    _;
  }

  modifier onlyFundedAirline() {
    require(airlines[msg.sender].isFunded, "Caller is not a funded airline.");
    _;
  }

  constructor(
    address initialOwner,
    address firstAirline
  ) Ownable(initialOwner) {
    airlines[firstAirline] = Airline({isRegistered: true, isFunded: false});
    airlineCount++;
  }

  function registerAirline(address airline) public onlyAirline {
    require(!airlines[airline].isRegistered, "Airline is already registered.");

    if (airlineCount <= AIRLINE_MULTIPARTY_THRESHOLD) {
      airlines[airline].isRegistered = true;
      airlineCount++;
      emit AirlineRegistered(airline);
    } else {
      if (airlineRegistrationVotes[airline].length == 0) {
        airlineRegistrationVotes[airline].push(msg.sender);
      } else {
        for (uint256 i = 0; i < airlineRegistrationVotes[airline].length; i++) {
          if (airlineRegistrationVotes[airline][i] == msg.sender) {
            revert("You've already voted for this airline.");
          }
        }

        airlineRegistrationVotes[airline].push(msg.sender);
      }

      uint256 votesNeeded = getVotesThreshold();

      if (airlineRegistrationVotes[airline].length >= votesNeeded) {
        airlines[airline].isRegistered = true;
        delete airlineRegistrationVotes[airline];
        airlineCount++;
        emit AirlineRegistered(airline);
      }
    }
  }

  function registerFlight(
    bytes32 flightKey,
    string memory name,
    uint256 timestamp,
    string memory origin,
    string memory destination
  ) public onlyFundedAirline {
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
    address airline,
    string memory flight,
    uint256 timestamp,
    uint8 statusCode
  ) internal pure {}

  function fundAirline() public payable nonReentrant whenNotPaused {
    require(airlines[msg.sender].isRegistered, "Airline is not registered.");
    require(!airlines[msg.sender].isFunded, "Airline is already funded.");
    require(
      msg.value >= AIRLINE_FUNDING_AMOUNT,
      "Insufficient funding amount."
    );

    airlines[msg.sender].isFunded = true;

    emit AirlineFunded(msg.sender);
  }

  function purchaseInsurance(
    bytes32 flightKey
  ) public payable nonReentrant whenNotPaused {
    require(flights[flightKey].isRegistered, "Flight is not registered.");

    require(
      msg.value <= INSURANCE_LIMIT,
      "Insurance amount must be less than or equal to the limit."
    );

    insurances[flightKey].push(
      Insurance({passenger: msg.sender, amount: msg.value})
    );

    emit InsurancePurchased(msg.sender, flightKey);
  }

  function creditInsurees(bytes32 flightKey) public {
    require(flights[flightKey].isRegistered, "Flight is not registered.");
    require(
      flights[flightKey].statusCode == STATUS_CODE_LATE_AIRLINE,
      "Flight is not delayed due to the airline."
    );

    for (uint256 i = 0; i < insurances[flightKey].length; i++) {
      (bool overflowsMul, uint256 resultMul) = insurances[flightKey][i]
        .amount
        .tryMul(INSURANCE_RATE_PERCENT);

      require(overflowsMul, "Multiplication overflow.");

      (bool overflowsAmount, uint256 amount) = resultMul.tryDiv(100);

      require(overflowsAmount, "Division overflow.");

      passengerCredits[insurances[flightKey][i].passenger] = amount;

      emit InsuranceCredited(insurances[flightKey][i].passenger, amount);
    }
  }

  function withdrawCredit() public {
    uint256 amount = passengerCredits[msg.sender];
    require(amount > 0, "No credit to withdraw.");

    passengerCredits[msg.sender] = 0;
    payable(msg.sender).transfer(amount);

    emit InsuranceWithdrawn(msg.sender, amount);
  }

  function updateFlightStatus(bytes32 flightKey, uint8 statusCode) public {
    require(airlines[msg.sender].isRegistered, "Airline is not registered.");
    require(airlines[msg.sender].isFunded, "Airline is not funded.");
    require(flights[flightKey].isRegistered, "Flight is not registered.");

    flights[flightKey].statusCode = statusCode;
    flights[flightKey].updatedTimestamp = block.timestamp;

    emit FlightStatusUpdated(flightKey, statusCode);
  }

  // Getters
  function getAirlineInfo(
    address airline
  ) public view returns (Airline memory) {
    require(airlines[airline].isRegistered, "Airline is not registered.");

    return airlines[airline];
  }

  function getAirlineCount() public view returns (uint256) {
    return airlineCount;
  }

  function getVotesThreshold() public view returns (uint256) {
    if (airlineCount <= AIRLINE_MULTIPARTY_THRESHOLD) {
      return 1;
    }

    (bool overflowsMul, uint256 resultMul) = airlineCount.tryMul(
      AIRLINE_MULTIPARTY_CONSENSUS_PERCENT
    );

    require(overflowsMul, "Multiplication overflow.");

    (bool overflowsDiv, uint256 votesNeeded) = resultMul.tryDiv(100);

    require(overflowsDiv, "Division overflow.");

    return votesNeeded;
  }

  function getVotesForAirline(address airline) public view returns (uint256) {
    return airlineRegistrationVotes[airline].length;
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

  function getPassengerCredit() public view returns (uint256) {
    return passengerCredits[msg.sender];
  }

  function getInsuranceRatePercent() public pure returns (uint256) {
    return INSURANCE_RATE_PERCENT;
  }

  function getInsuranceLimit() public pure returns (uint256) {
    return INSURANCE_LIMIT;
  }

  // Authorizations
  function authorizeContract(address contractAddress) public onlyOwner {
    authorizedContracts[contractAddress] = 1;
    emit AuthorizedContract(contractAddress);
  }

  function deauthorizeContract(address contractAddress) public onlyOwner {
    delete authorizedContracts[contractAddress];
    emit DeauthorizedContract(contractAddress);
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
      processFlightStatus(airline, flight, timestamp, statusCode);
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
