import { unregisteredFlights } from "@/data/flights";

export async function GET() {
  return Response.json({ data: unregisteredFlights });
}
