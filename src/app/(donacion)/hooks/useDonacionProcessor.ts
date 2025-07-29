'use client'

import { useCallback, useState } from "react";
import { DonacionResponse } from "../components/OneTimeDonation";
import axios from "axios";


export function useDonacionProcessor(props: { endpoint: string }) {
  const [donacionResponse, setDonacionResponse] = useState<DonacionResponse | null>(null);
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');


  const processDonacion = useCallback(async (data?: any) => {
    try {
      setLoading(true)
      const res = await axios.post(props.endpoint, data);
      setDonacionResponse(res.data);

    } catch (err) {
      setErrorMessage((err as Error).message)
      console.log(err)

    } finally {
      setLoading(false)
    }
  }, []);


  return {
    processDonacion,
    loading,
    donacionResponse,
    errorMessage
  }
}