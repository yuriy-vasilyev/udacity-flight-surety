/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export interface FlightSuretyDataInterface extends Interface {
  getFunction(
    nameOrSignature: "creditInsurees" | "registerAirline" | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "creditInsurees",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "registerAirline",
    values: [AddressLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "creditInsurees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerAirline",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
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

  creditInsurees: TypedContractMethod<
    [flightCode: string],
    [void],
    "nonpayable"
  >;

  registerAirline: TypedContractMethod<
    [airlineAddress: AddressLike, name: string],
    [boolean],
    "nonpayable"
  >;

  withdraw: TypedContractMethod<
    [insuredPassenger: AddressLike],
    [[bigint, bigint, bigint, bigint, string, string]],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "creditInsurees"
  ): TypedContractMethod<[flightCode: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "registerAirline"
  ): TypedContractMethod<
    [airlineAddress: AddressLike, name: string],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "withdraw"
  ): TypedContractMethod<
    [insuredPassenger: AddressLike],
    [[bigint, bigint, bigint, bigint, string, string]],
    "nonpayable"
  >;

  filters: {};
}
