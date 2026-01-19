import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { DonadorFormType } from "./DonadorForm";
import { usePaymentBrick } from "@mercadopago/sdk-react";


type DonacionContextValue = {
  isPaymentFormReady: boolean;
  acceptedFees: boolean;
  handleAcceptingFees: (accepted: boolean) => void;
  handleOnPaymentFormReady: (isReady: boolean) => void;
  saveDonador: (donador: DonadorFormType) => void;
  donador: DonadorFormType | null;
  amount: number;
  fees: number;
}

export const DonacionContext = createContext<DonacionContextValue | null>(null)


export const DonacionProvider = ({ value, children }: { value: DonacionContextValue, children: ReactNode }) => {
  return (
    <DonacionContext.Provider value={value}>
      {children}
    </DonacionContext.Provider>
  )
}


export const useDonacion = ({ amount, fees }: { amount: number, fees: number }) => {
  const [isPaymentFormReady, setPaymentFormReady] = useState(false);
  const [acceptedFees, setAcceptedFees] = useState(false);
  const [donador, setDonador] = useState<DonadorFormType | null>(null)
  const { update } = usePaymentBrick();

  const handleOnPaymentFormReady = useCallback((isReady: boolean) => {
    setPaymentFormReady(isReady);
  }, []);

  const handleAcceptingFees = useCallback((accepted: boolean) => {
    setAcceptedFees(accepted);

  }, []);

  const saveDonador = useCallback((donador: DonadorFormType) => {
    setDonador(donador)
  }, [])

  useEffect(() => {
    if (!isPaymentFormReady) return;

    update({ amount: acceptedFees ? amount + fees : amount });
  }, [isPaymentFormReady, acceptedFees])

  return {
    isPaymentFormReady,
    acceptedFees,
    handleAcceptingFees,
    handleOnPaymentFormReady,
    saveDonador,
    donador,
    amount,
    fees
  }
}


export const useDonacionContext = () => useContext(DonacionContext);
