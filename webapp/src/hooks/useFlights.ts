import { useCallback, useEffect, useState } from "react";
import { Flight } from "@/types/Flight";
import { getErrorMessage } from "@/helpers";
import { flights as data } from "@/data/flights";

export function useFlights() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFlights = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      setTimeout(() => {
        setFlights(data);
      }, 1000);
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [flights]);

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
