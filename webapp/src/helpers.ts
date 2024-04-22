import { UnregisteredFlight } from "@/types/Flight";
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

export const generateFlightKey = (flight: UnregisteredFlight) => {
  return `${flight.name}-${flight.origin}-${flight.destination}-${moment(flight.datetime).format("YYYY-MM-DD")}`;
};

export const formatFlightDate = (datetime: number) =>
  moment(datetime).format("MMM D, YYYY");
