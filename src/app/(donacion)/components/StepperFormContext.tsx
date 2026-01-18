'use client'

import { createContext, ReactNode, useCallback, useContext, useState } from "react"

type StepperContextValueType = {
  activeStep: number,
  handlePrev: () => void,
  handleNext: () => void
}

export const StepperContext = createContext<StepperContextValueType | null>(null);

export const StepperProvider = (props: { totalSteps: number, children: ReactNode }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handlePrev = useCallback(() => setActiveStep(pre => pre === 0 ? 0 : pre - 1), [])
  const handleNext = useCallback(() => setActiveStep(pre => pre === props.totalSteps - 1 ? props.totalSteps - 1 : pre + 1), [])


  return <StepperContext.Provider value={{ activeStep, handleNext, handlePrev }}>
    {props.children}
  </StepperContext.Provider>
}


export const useStepper = () => useContext(StepperContext);