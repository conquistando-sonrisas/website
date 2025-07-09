import { createContext, ReactNode, useCallback, useContext, useState } from "react";

const MultiStepFormContext = createContext<null | {
  registro: any,
  addFormData: (id: string, data: any) => void,
  handlePrev: () => void,
  activeStep: number
}>(null);


export function MultiStepFormProvider(props: { children: ReactNode }) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = useCallback(() => {
    console.log('going to next step')
    setActiveStep(pre => pre == 2 ? 2 : pre + 1)

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
    }
  });

  const addFormData = useCallback((id: string, data: any) => {
    console.log('id', id, 'form data', data)
    setRegistro(pre => ({ ...pre, [id]: data }));

    handleNext();
  }, [])

  return (
    <MultiStepFormContext.Provider value={{ registro, addFormData, handlePrev, activeStep }}>
      {props.children}
    </MultiStepFormContext.Provider>
  )
}


export function useMultiStepForm() {
  return useContext(MultiStepFormContext);
}