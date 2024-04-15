import { useCallback, useEffect, useState } from "react";
import { Flight } from "@/types/Flight";
import { getErrorMessage } from "@/helpers";
import useContract from "@/hooks/useContract";

export function useFlights() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { contract } = useContract();

  const fetchFlights = useCallback(async () => {
    if (!contract) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await contract.flights();
      console.log(result);
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [contract]);

  useEffect(() => {
    fetchFlights().catch(console.error);
  }, [fetchFlights]);

  return {
    flights,
    loading,
    error,
    fetchFlights,
  };
}
