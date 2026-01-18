import { createContext, ReactNode, useCallback, useContext, useState } from "react";


type DonacionContextValue = {
  isPaymentFormReady: boolean;
  acceptedFees: boolean;
  handleAcceptingFees: (accepted: boolean) => void;
  handleOnPaymentFormReady: (isReady: boolean) => void;
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

  const handleOnPaymentFormReady = useCallback((isReady: boolean) => {
    setPaymentFormReady(isReady);
  }, []);

  const handleAcceptingFees = useCallback((accepted: boolean) => {
    setAcceptedFees(accepted)
  }, []);

  return {
    isPaymentFormReady,
    acceptedFees,
    handleAcceptingFees,
    handleOnPaymentFormReady
  }
}


export const useDonacionContext = () => useContext(DonacionContext);
