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

  // Structs
  struct Airline {
    bool isRegistered;
    bool isFunded;
    string name;
  }

  struct Insurance {
    address passenger;
    uint256 amount;
  }

  // Mappings
  mapping(address => uint256) private authorizedContracts;
  mapping(address => Airline) private airlines;
  mapping(address => address[]) private airlineRegistrationVotes;
  mapping(bytes32 => Insurance[]) private insurances;
  mapping(address => uint256) private passengerCredits;

  // Events
  event AirlineRegistered(address airline);
  event AirlineFunded(address airline);
  event InsurancePurchased(address passenger, bytes32 flightKey);
  event InsuranceCredited(address passenger, uint256 amount);
  event InsuranceWithdrawn(address passenger, uint256 amount);
  event AuthorizedContract(address contractAddress);
  event DeauthorizedContract(address contractAddress);

  modifier onlyAuthorizedContract() {
    require(authorizedContracts[msg.sender] == 1, "Caller is not authorized.");
    _;
  }

  constructor(
    address initialOwner,
    address airlineAddress,
    string airlineName
  ) Ownable(initialOwner) {
    airlines[airlineAddress] = Airline({
      isRegistered: true,
      isFunded: false,
      name: airlineName
    });
    airlineCount++;
  }

  function registerAirline(
    address airlineAddress,
    string calldata name
  ) external pure onlyAirline onlyAuthorizedContract {
    airlines[airlineAddress].isRegistered = true;
    airlines[airlineAddress].name = name;

    emit AirlineRegistered(airlineAddress);
  }

  function fundAirline() external payable nonReentrant whenNotPaused {
    require(airlines[msg.sender].isRegistered, "Airline is not registered.");
    require(!airlines[msg.sender].isFunded, "Airline is already funded.");
    require(
      msg.value >= AIRLINE_FUNDING_AMOUNT,
      "Insufficient funding amount."
    );

    airlines[msg.sender].isFunded = true;

    emit AirlineFunded(msg.sender);
  }

  function getAirlineInfo(
    address airline
  ) external view returns (Airline memory) {
    require(airlines[airline].isRegistered, "Airline is not registered.");

    return airlines[airline];
  }

  function purchaseInsurance(
    bytes32 flightKey
  ) public payable nonReentrant whenNotPaused {
    require(
      msg.value > 0 && msg.value <= INSURANCE_LIMIT,
      "Insurance amount must be greater than 0 and less than or equal to the limit."
    );

    insurances[flightKey].push(
      Insurance({passenger: msg.sender, amount: msg.value})
    );

    emit InsurancePurchased(msg.sender, flightKey);
  }

  function creditInsurees(bytes32 flightKey) public {
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
