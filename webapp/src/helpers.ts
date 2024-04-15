import { Flight } from "@/types/Flight";
import moment from "moment/moment";

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    // @ts-ignore
    return error.info?.error?.data?.data?.reason ?? error.message;
  } else if (typeof error === "string") {
    return error;
  } else {
    return "An error occurred";
  }
};

export const generateFlightKey = (flight: Flight) => {
  return `${flight.airline}-${flight.flightNumber}-${moment(flight.periodOfOperationUTC.startDate).format("YYYY-MM-DD")}`;
};

export const formatFlightDate = (date: string) =>
  moment(date).format("MMM D, YYYY");
