import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { DonacionResponse } from "../../components/OneTimeDonation";
import { useDonacionProcessor } from "../../hooks/useDonacionProcessor";

const MultiStepFormContext = createContext<null | {
  registro: any,
  activeStep: number,
  addFormData: (id: string, data: any) => void,
  handlePrev: () => void,
  donacionResponse: DonacionResponse | null,
  errorMessage: string,
  loading: boolean,
  processDonacion: (data: any) => Promise<void>
}>(null);


export function MultiStepFormProvider(props: { children: ReactNode }) {
  const [activeStep, setActiveStep] = useState(0);
  const {
    donacionResponse, errorMessage,
    loading, processDonacion
  } = useDonacionProcessor({ endpoint: `${process.env.NEXT_PUBLIC_CARRERA_API}/carrera/participantes` })


  const handleNext = useCallback(() => {
    setActiveStep(pre => pre == 3 ? 3 : pre + 1)

  }, [])

  const handlePrev = () => {
    setActiveStep(pre => pre == 0 ? 0 : pre - 1)

  }

  const [registro, setRegistro] = useState({
    'main-form': {
      nombre: '',
      edad: null,
      talla: '',
      sexo: null,
      correo: '',
      telefono: ''
    },
    'extra-form': {
      people: []
    },
    'pago-form': {
      isFinalStep: false,
    },
    'terminos-form': {
      aceptadoTerminos: false
    },
  });

  const addFormData = useCallback((id: string, data: any) => {
    setRegistro(pre => ({ ...pre, [id]: data }));

    handleNext();
  }, [])


  return (
    <MultiStepFormContext.Provider value={{
      registro,
      addFormData,
      handlePrev,
      activeStep,
      donacionResponse,
      errorMessage,
      loading,
      processDonacion
    }}>
      {props.children}
    </MultiStepFormContext.Provider>
  )
}


export function useMultiStepForm() {
  return useContext(MultiStepFormContext);
}