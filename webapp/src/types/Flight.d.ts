export interface UnregisteredFlight {
  name: string;
  datetime: number;
  origin: string;
  destination: string;
}

export interface RegisteredFlight {
  flightKey: string;
  name: string;
  datetime: number;
  origin: string;
  destination: string;
  isRegistered: boolean;
  statusCode: number;
  updatedTimestamp: number;
  airline: string;
}
