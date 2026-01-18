import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { DonadorFormType } from "./DonadorForm";


type DonacionContextValue = {
  isPaymentFormReady: boolean;
  acceptedFees: boolean;
  handleAcceptingFees: (accepted: boolean) => void;
  handleOnPaymentFormReady: (isReady: boolean) => void;
  saveDonador: (donador: DonadorFormType) => void;
  donador: DonadorFormType | null
}

export const DonacionContext = createContext<DonacionContextValue | null>(null)


export const DonacionProvider = ({ value, children }: { value: DonacionContextValue, children: ReactNode }) => {
  return (
    <DonacionContext.Provider value={value}>
      {children}
    </DonacionContext.Provider>
  )
}


export const useDonacion = () => {
  const [isPaymentFormReady, setPaymentFormReady] = useState(false);
  const [acceptedFees, setAcceptedFees] = useState(false);
  const [donador, setDonador] = useState<DonadorFormType | null>(null)

  const handleOnPaymentFormReady = useCallback((isReady: boolean) => {
    setPaymentFormReady(isReady);
  }, []);

  const handleAcceptingFees = useCallback((accepted: boolean) => {
    setAcceptedFees(accepted)
  }, []);

  const saveDonador = useCallback((donador: DonadorFormType) => {
    setDonador(donador)
  }, [])

  return {
    isPaymentFormReady,
    acceptedFees,
    handleAcceptingFees,
    handleOnPaymentFormReady,
    donador,
    saveDonador
  }
}


export const useDonacionContext = () => useContext(DonacionContext);
