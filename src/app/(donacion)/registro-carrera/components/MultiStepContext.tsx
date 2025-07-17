import { createContext, ReactNode, useCallback, useContext, useState } from "react";

const MultiStepFormContext = createContext<null | {
  registro: any,
  activeStep: number,
  addFormData: (id: string, data: any) => void,
  handlePrev: () => void,
}>(null);


export function MultiStepFormProvider(props: { children: ReactNode }) {
  const [activeStep, setActiveStep] = useState(0);

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
    }
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
    }}>
      {props.children}
    </MultiStepFormContext.Provider>
  )
}


export function useMultiStepForm() {
  return useContext(MultiStepFormContext);
}