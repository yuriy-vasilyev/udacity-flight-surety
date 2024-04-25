/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export declare namespace FlightSuretyData {
  export type AirlineStruct = { isRegistered: boolean; isFunded: boolean };

  export type AirlineStructOutput = [
    isRegistered: boolean,
    isFunded: boolean
  ] & { isRegistered: boolean; isFunded: boolean };
}

export interface FlightSuretyDataInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "REGISTRATION_FEE"
      | "authorizeContract"
      | "creditInsurees"
      | "deauthorizeContract"
      | "fundAirline"
      | "getAirlineCount"
      | "getAirlineInfo"
      | "getFlight"
      | "getInsuranceLimit"
      | "getInsuranceRatePercent"
      | "getMyIndexes"
      | "getPassengerCredit"
      | "getVotesForAirline"
      | "getVotesThreshold"
      | "owner"
      | "paused"
      | "purchaseInsurance"
      | "registerAirline"
      | "registerFlight"
      | "registerOracle"
      | "renounceOwnership"
      | "setPausableStatus"
      | "submitOracleResponse"
      | "transferOwnership"
      | "updateFlightStatus"
      | "withdrawCredit"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "AirlineFunded"
      | "AirlineRegistered"
      | "AuthorizedContract"
      | "DeauthorizedContract"
      | "FlightRegistered"
      | "FlightStatusInfo"
      | "FlightStatusUpdated"
      | "InsuranceCredited"
      | "InsurancePurchased"
      | "InsuranceWithdrawn"
      | "OracleRegistered"
      | "OracleReport"
      | "OracleRequest"
      | "OwnershipTransferred"
      | "Paused"
      | "Unpaused"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "REGISTRATION_FEE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "authorizeContract",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "creditInsurees",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "deauthorizeContract",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "fundAirline",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAirlineCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAirlineInfo",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getFlight",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getInsuranceLimit",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getInsuranceRatePercent",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getMyIndexes",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPassengerCredit",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getVotesForAirline",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getVotesThreshold",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "purchaseInsurance",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "registerAirline",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "registerFlight",
    values: [BytesLike, string, BigNumberish, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "registerOracle",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setPausableStatus",
    values: [boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "submitOracleResponse",
    values: [BigNumberish, AddressLike, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "updateFlightStatus",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawCredit",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "REGISTRATION_FEE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "authorizeContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "creditInsurees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deauthorizeContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "fundAirline",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAirlineCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAirlineInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getFlight", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getInsuranceLimit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getInsuranceRatePercent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMyIndexes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPassengerCredit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVotesForAirline",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVotesThreshold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "purchaseInsurance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerAirline",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerFlight",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerOracle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPausableStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "submitOracleResponse",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateFlightStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawCredit",
    data: BytesLike
  ): Result;
}

export namespace AirlineFundedEvent {
  export type InputTuple = [airline: AddressLike];
  export type OutputTuple = [airline: string];
  export interface OutputObject {
    airline: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace AirlineRegisteredEvent {
  export type InputTuple = [airline: AddressLike];
  export type OutputTuple = [airline: string];
  export interface OutputObject {
    airline: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace AuthorizedContractEvent {
  export type InputTuple = [contractAddress: AddressLike];
  export type OutputTuple = [contractAddress: string];
  export interface OutputObject {
    contractAddress: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DeauthorizedContractEvent {
  export type InputTuple = [contractAddress: AddressLike];
  export type OutputTuple = [contractAddress: string];
  export interface OutputObject {
    contractAddress: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace FlightRegisteredEvent {
  export type InputTuple = [flightKey: BytesLike, statusCode: BigNumberish];
  export type OutputTuple = [flightKey: string, statusCode: bigint];
  export interface OutputObject {
    flightKey: string;
    statusCode: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace FlightStatusInfoEvent {
  export type InputTuple = [
    airline: AddressLike,
    flight: string,
    timestamp: BigNumberish,
    status: BigNumberish
  ];
  export type OutputTuple = [
    airline: string,
    flight: string,
    timestamp: bigint,
    status: bigint
  ];
  export interface OutputObject {
    airline: string;
    flight: string;
    timestamp: bigint;
    status: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace FlightStatusUpdatedEvent {
  export type InputTuple = [flightKey: BytesLike, statusCode: BigNumberish];
  export type OutputTuple = [flightKey: string, statusCode: bigint];
  export interface OutputObject {
    flightKey: string;
    statusCode: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace InsuranceCreditedEvent {
  export type InputTuple = [passenger: AddressLike, amount: BigNumberish];
  export type OutputTuple = [passenger: string, amount: bigint];
  export interface OutputObject {
    passenger: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace InsurancePurchasedEvent {
  export type InputTuple = [passenger: AddressLike, flightKey: BytesLike];
  export type OutputTuple = [passenger: string, flightKey: string];
  export interface OutputObject {
    passenger: string;
    flightKey: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace InsuranceWithdrawnEvent {
  export type InputTuple = [passenger: AddressLike, amount: BigNumberish];
  export type OutputTuple = [passenger: string, amount: bigint];
  export interface OutputObject {
    passenger: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OracleRegisteredEvent {
  export type InputTuple = [oracle: AddressLike];
  export type OutputTuple = [oracle: string];
  export interface OutputObject {
    oracle: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OracleReportEvent {
  export type InputTuple = [
    airline: AddressLike,
    flight: string,
    timestamp: BigNumberish,
    status: BigNumberish
  ];
  export type OutputTuple = [
    airline: string,
    flight: string,
    timestamp: bigint,
    status: bigint
  ];
  export interface OutputObject {
    airline: string;
    flight: string;
    timestamp: bigint;
    status: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OracleRequestEvent {
  export type InputTuple = [
    index: BigNumberish,
    airline: AddressLike,
    flight: string,
    timestamp: BigNumberish
  ];
  export type OutputTuple = [
    index: bigint,
    airline: string,
    flight: string,
    timestamp: bigint
  ];
  export interface OutputObject {
    index: bigint;
    airline: string;
    flight: string;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace PausedEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UnpausedEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface FlightSuretyData extends BaseContract {
  connect(runner?: ContractRunner | null): FlightSuretyData;
  waitForDeployment(): Promise<this>;

  interface: FlightSuretyDataInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  REGISTRATION_FEE: TypedContractMethod<[], [bigint], "view">;

  authorizeContract: TypedContractMethod<
    [contractAddress: AddressLike],
    [void],
    "nonpayable"
  >;

  creditInsurees: TypedContractMethod<
    [flightKey: BytesLike],
    [void],
    "nonpayable"
  >;

  deauthorizeContract: TypedContractMethod<
    [contractAddress: AddressLike],
    [void],
    "nonpayable"
  >;

  fundAirline: TypedContractMethod<[], [void], "payable">;

  getAirlineCount: TypedContractMethod<[], [bigint], "view">;

  getAirlineInfo: TypedContractMethod<
    [airline: AddressLike],
    [FlightSuretyData.AirlineStructOutput],
    "view"
  >;

  getFlight: TypedContractMethod<
    [flightKey: BytesLike],
    [
      [string, bigint, string, string, boolean, bigint, bigint, string] & {
        name: string;
        datetime: bigint;
        origin: string;
        destination: string;
        isRegistered: boolean;
        statusCode: bigint;
        updatedTimestamp: bigint;
        airline: string;
      }
    ],
    "view"
  >;

  getInsuranceLimit: TypedContractMethod<[], [bigint], "view">;

  getInsuranceRatePercent: TypedContractMethod<[], [bigint], "view">;

  getMyIndexes: TypedContractMethod<[], [[bigint, bigint, bigint]], "view">;

  getPassengerCredit: TypedContractMethod<[], [bigint], "view">;

  getVotesForAirline: TypedContractMethod<
    [airline: AddressLike],
    [bigint],
    "view"
  >;

  getVotesThreshold: TypedContractMethod<[], [bigint], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  paused: TypedContractMethod<[], [boolean], "view">;

  purchaseInsurance: TypedContractMethod<
    [flightKey: BytesLike],
    [void],
    "payable"
  >;

  registerAirline: TypedContractMethod<
    [airline: AddressLike],
    [void],
    "nonpayable"
  >;

  registerFlight: TypedContractMethod<
    [
      flightKey: BytesLike,
      name: string,
      timestamp: BigNumberish,
      origin: string,
      destination: string
    ],
    [void],
    "nonpayable"
  >;

  registerOracle: TypedContractMethod<[], [void], "payable">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  setPausableStatus: TypedContractMethod<[mode: boolean], [void], "nonpayable">;

  submitOracleResponse: TypedContractMethod<
    [
      index: BigNumberish,
      airline: AddressLike,
      flight: string,
      timestamp: BigNumberish,
      statusCode: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  updateFlightStatus: TypedContractMethod<
    [flightKey: BytesLike, statusCode: BigNumberish],
    [void],
    "nonpayable"
  >;

  withdrawCredit: TypedContractMethod<[], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "REGISTRATION_FEE"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "authorizeContract"
  ): TypedContractMethod<[contractAddress: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "creditInsurees"
  ): TypedContractMethod<[flightKey: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "deauthorizeContract"
  ): TypedContractMethod<[contractAddress: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "fundAirline"
  ): TypedContractMethod<[], [void], "payable">;
  getFunction(
    nameOrSignature: "getAirlineCount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getAirlineInfo"
  ): TypedContractMethod<
    [airline: AddressLike],
    [FlightSuretyData.AirlineStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getFlight"
  ): TypedContractMethod<
    [flightKey: BytesLike],
    [
      [string, bigint, string, string, boolean, bigint, bigint, string] & {
        name: string;
        datetime: bigint;
        origin: string;
        destination: string;
        isRegistered: boolean;
        statusCode: bigint;
        updatedTimestamp: bigint;
        airline: string;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "getInsuranceLimit"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getInsuranceRatePercent"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getMyIndexes"
  ): TypedContractMethod<[], [[bigint, bigint, bigint]], "view">;
  getFunction(
    nameOrSignature: "getPassengerCredit"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getVotesForAirline"
  ): TypedContractMethod<[airline: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getVotesThreshold"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "paused"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "purchaseInsurance"
  ): TypedContractMethod<[flightKey: BytesLike], [void], "payable">;
  getFunction(
    nameOrSignature: "registerAirline"
  ): TypedContractMethod<[airline: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "registerFlight"
  ): TypedContractMethod<
    [
      flightKey: BytesLike,
      name: string,
      timestamp: BigNumberish,
      origin: string,
      destination: string
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "registerOracle"
  ): TypedContractMethod<[], [void], "payable">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setPausableStatus"
  ): TypedContractMethod<[mode: boolean], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "submitOracleResponse"
  ): TypedContractMethod<
    [
      index: BigNumberish,
      airline: AddressLike,
      flight: string,
      timestamp: BigNumberish,
      statusCode: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "updateFlightStatus"
  ): TypedContractMethod<
    [flightKey: BytesLike, statusCode: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "withdrawCredit"
  ): TypedContractMethod<[], [void], "nonpayable">;

  getEvent(
    key: "AirlineFunded"
  ): TypedContractEvent<
    AirlineFundedEvent.InputTuple,
    AirlineFundedEvent.OutputTuple,
    AirlineFundedEvent.OutputObject
  >;
  getEvent(
    key: "AirlineRegistered"
  ): TypedContractEvent<
    AirlineRegisteredEvent.InputTuple,
    AirlineRegisteredEvent.OutputTuple,
    AirlineRegisteredEvent.OutputObject
  >;
  getEvent(
    key: "AuthorizedContract"
  ): TypedContractEvent<
    AuthorizedContractEvent.InputTuple,
    AuthorizedContractEvent.OutputTuple,
    AuthorizedContractEvent.OutputObject
  >;
  getEvent(
    key: "DeauthorizedContract"
  ): TypedContractEvent<
    DeauthorizedContractEvent.InputTuple,
    DeauthorizedContractEvent.OutputTuple,
    DeauthorizedContractEvent.OutputObject
  >;
  getEvent(
    key: "FlightRegistered"
  ): TypedContractEvent<
    FlightRegisteredEvent.InputTuple,
    FlightRegisteredEvent.OutputTuple,
    FlightRegisteredEvent.OutputObject
  >;
  getEvent(
    key: "FlightStatusInfo"
  ): TypedContractEvent<
    FlightStatusInfoEvent.InputTuple,
    FlightStatusInfoEvent.OutputTuple,
    FlightStatusInfoEvent.OutputObject
  >;
  getEvent(
    key: "FlightStatusUpdated"
  ): TypedContractEvent<
    FlightStatusUpdatedEvent.InputTuple,
    FlightStatusUpdatedEvent.OutputTuple,
    FlightStatusUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "InsuranceCredited"
  ): TypedContractEvent<
    InsuranceCreditedEvent.InputTuple,
    InsuranceCreditedEvent.OutputTuple,
    InsuranceCreditedEvent.OutputObject
  >;
  getEvent(
    key: "InsurancePurchased"
  ): TypedContractEvent<
    InsurancePurchasedEvent.InputTuple,
    InsurancePurchasedEvent.OutputTuple,
    InsurancePurchasedEvent.OutputObject
  >;
  getEvent(
    key: "InsuranceWithdrawn"
  ): TypedContractEvent<
    InsuranceWithdrawnEvent.InputTuple,
    InsuranceWithdrawnEvent.OutputTuple,
    InsuranceWithdrawnEvent.OutputObject
  >;
  getEvent(
    key: "OracleRegistered"
  ): TypedContractEvent<
    OracleRegisteredEvent.InputTuple,
    OracleRegisteredEvent.OutputTuple,
    OracleRegisteredEvent.OutputObject
  >;
  getEvent(
    key: "OracleReport"
  ): TypedContractEvent<
    OracleReportEvent.InputTuple,
    OracleReportEvent.OutputTuple,
    OracleReportEvent.OutputObject
  >;
  getEvent(
    key: "OracleRequest"
  ): TypedContractEvent<
    OracleRequestEvent.InputTuple,
    OracleRequestEvent.OutputTuple,
    OracleRequestEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "Paused"
  ): TypedContractEvent<
    PausedEvent.InputTuple,
    PausedEvent.OutputTuple,
    PausedEvent.OutputObject
  >;
  getEvent(
    key: "Unpaused"
  ): TypedContractEvent<
    UnpausedEvent.InputTuple,
    UnpausedEvent.OutputTuple,
    UnpausedEvent.OutputObject
  >;

  filters: {
    "AirlineFunded(address)": TypedContractEvent<
      AirlineFundedEvent.InputTuple,
      AirlineFundedEvent.OutputTuple,
      AirlineFundedEvent.OutputObject
    >;
    AirlineFunded: TypedContractEvent<
      AirlineFundedEvent.InputTuple,
      AirlineFundedEvent.OutputTuple,
      AirlineFundedEvent.OutputObject
    >;

    "AirlineRegistered(address)": TypedContractEvent<
      AirlineRegisteredEvent.InputTuple,
      AirlineRegisteredEvent.OutputTuple,
      AirlineRegisteredEvent.OutputObject
    >;
    AirlineRegistered: TypedContractEvent<
      AirlineRegisteredEvent.InputTuple,
      AirlineRegisteredEvent.OutputTuple,
      AirlineRegisteredEvent.OutputObject
    >;

    "AuthorizedContract(address)": TypedContractEvent<
      AuthorizedContractEvent.InputTuple,
      AuthorizedContractEvent.OutputTuple,
      AuthorizedContractEvent.OutputObject
    >;
    AuthorizedContract: TypedContractEvent<
      AuthorizedContractEvent.InputTuple,
      AuthorizedContractEvent.OutputTuple,
      AuthorizedContractEvent.OutputObject
    >;

    "DeauthorizedContract(address)": TypedContractEvent<
      DeauthorizedContractEvent.InputTuple,
      DeauthorizedContractEvent.OutputTuple,
      DeauthorizedContractEvent.OutputObject
    >;
    DeauthorizedContract: TypedContractEvent<
      DeauthorizedContractEvent.InputTuple,
      DeauthorizedContractEvent.OutputTuple,
      DeauthorizedContractEvent.OutputObject
    >;

    "FlightRegistered(bytes32,uint8)": TypedContractEvent<
      FlightRegisteredEvent.InputTuple,
      FlightRegisteredEvent.OutputTuple,
      FlightRegisteredEvent.OutputObject
    >;
    FlightRegistered: TypedContractEvent<
      FlightRegisteredEvent.InputTuple,
      FlightRegisteredEvent.OutputTuple,
      FlightRegisteredEvent.OutputObject
    >;

    "FlightStatusInfo(address,string,uint256,uint8)": TypedContractEvent<
      FlightStatusInfoEvent.InputTuple,
      FlightStatusInfoEvent.OutputTuple,
      FlightStatusInfoEvent.OutputObject
    >;
    FlightStatusInfo: TypedContractEvent<
      FlightStatusInfoEvent.InputTuple,
      FlightStatusInfoEvent.OutputTuple,
      FlightStatusInfoEvent.OutputObject
    >;

    "FlightStatusUpdated(bytes32,uint8)": TypedContractEvent<
      FlightStatusUpdatedEvent.InputTuple,
      FlightStatusUpdatedEvent.OutputTuple,
      FlightStatusUpdatedEvent.OutputObject
    >;
    FlightStatusUpdated: TypedContractEvent<
      FlightStatusUpdatedEvent.InputTuple,
      FlightStatusUpdatedEvent.OutputTuple,
      FlightStatusUpdatedEvent.OutputObject
    >;

    "InsuranceCredited(address,uint256)": TypedContractEvent<
      InsuranceCreditedEvent.InputTuple,
      InsuranceCreditedEvent.OutputTuple,
      InsuranceCreditedEvent.OutputObject
    >;
    InsuranceCredited: TypedContractEvent<
      InsuranceCreditedEvent.InputTuple,
      InsuranceCreditedEvent.OutputTuple,
      InsuranceCreditedEvent.OutputObject
    >;

    "InsurancePurchased(address,bytes32)": TypedContractEvent<
      InsurancePurchasedEvent.InputTuple,
      InsurancePurchasedEvent.OutputTuple,
      InsurancePurchasedEvent.OutputObject
    >;
    InsurancePurchased: TypedContractEvent<
      InsurancePurchasedEvent.InputTuple,
      InsurancePurchasedEvent.OutputTuple,
      InsurancePurchasedEvent.OutputObject
    >;

    "InsuranceWithdrawn(address,uint256)": TypedContractEvent<
      InsuranceWithdrawnEvent.InputTuple,
      InsuranceWithdrawnEvent.OutputTuple,
      InsuranceWithdrawnEvent.OutputObject
    >;
    InsuranceWithdrawn: TypedContractEvent<
      InsuranceWithdrawnEvent.InputTuple,
      InsuranceWithdrawnEvent.OutputTuple,
      InsuranceWithdrawnEvent.OutputObject
    >;

    "OracleRegistered(address)": TypedContractEvent<
      OracleRegisteredEvent.InputTuple,
      OracleRegisteredEvent.OutputTuple,
      OracleRegisteredEvent.OutputObject
    >;
    OracleRegistered: TypedContractEvent<
      OracleRegisteredEvent.InputTuple,
      OracleRegisteredEvent.OutputTuple,
      OracleRegisteredEvent.OutputObject
    >;

    "OracleReport(address,string,uint256,uint8)": TypedContractEvent<
      OracleReportEvent.InputTuple,
      OracleReportEvent.OutputTuple,
      OracleReportEvent.OutputObject
    >;
    OracleReport: TypedContractEvent<
      OracleReportEvent.InputTuple,
      OracleReportEvent.OutputTuple,
      OracleReportEvent.OutputObject
    >;

    "OracleRequest(uint8,address,string,uint256)": TypedContractEvent<
      OracleRequestEvent.InputTuple,
      OracleRequestEvent.OutputTuple,
      OracleRequestEvent.OutputObject
    >;
    OracleRequest: TypedContractEvent<
      OracleRequestEvent.InputTuple,
      OracleRequestEvent.OutputTuple,
      OracleRequestEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "Paused(address)": TypedContractEvent<
      PausedEvent.InputTuple,
      PausedEvent.OutputTuple,
      PausedEvent.OutputObject
    >;
    Paused: TypedContractEvent<
      PausedEvent.InputTuple,
      PausedEvent.OutputTuple,
      PausedEvent.OutputObject
    >;

    "Unpaused(address)": TypedContractEvent<
      UnpausedEvent.InputTuple,
      UnpausedEvent.OutputTuple,
      UnpausedEvent.OutputObject
    >;
    Unpaused: TypedContractEvent<
      UnpausedEvent.InputTuple,
      UnpausedEvent.OutputTuple,
      UnpausedEvent.OutputObject
    >;
  };
}
