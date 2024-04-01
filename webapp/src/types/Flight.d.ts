type FlightPeriod = {
  startDate: string;
  endDate: string;
  daysOfOperation: string;
};

type DataElement = {
  startLegSequenceNumber: number;
  endLegSequenceNumber: number;
  id: number;
  value: string;
};

export interface Flight {
  airline: string;
  flightNumber: number;
  suffix: string;
  periodOfOperationUTC: FlightPeriod;
  periodOfOperationLT: FlightPeriod;
  legs: {
    [key: string]: string | boolean | number;
  }[];
  dataElements: DataElement[];
}
