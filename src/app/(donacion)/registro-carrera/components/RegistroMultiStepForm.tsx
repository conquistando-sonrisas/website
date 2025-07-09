'use client'

import { Alert, Box, Button, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material"
import FormRegistro from "./FormRegistro"
import { ReactNode, useCallback, useContext, useState } from "react"
import FormRegistroExtra from "./FormRegistroExtra"
import * as yup from 'yup'
import { MultiStepFormProvider, useMultiStepForm } from "./MultiStepContext"


export default function RegistroMultiStepForm() {

  return (
    <Box component={Paper} px={{ xs: 1, md: 2 }} py={3} bgcolor='conquiLightBlue.50'>
      <Typography fontSize={24} fontWeight={500} my={2} textAlign='center'>Registro Carrera 5K</Typography>
      <MultiStepFormProvider>
        <MultiStep />
      </MultiStepFormProvider>
    </Box>
  )
}

function MultiStep() {
  const multi = useMultiStepForm();

  if (!multi) {
    return (<Box>Hubo un error al mostrar el formulario</Box>)
  }

  const { activeStep, handlePrev } = multi;

  return (
    <>
      <Stepper activeStep={multi.activeStep}>
        <Step>
          <StepLabel>Registro</StepLabel>
        </Step>
        <Step>
          <StepLabel
            optional={<Typography variant="caption">Opcional</Typography>}
          >Extra</StepLabel>
        </Step>
        <Step>
          <StepLabel>Pago</StepLabel>
        </Step>
      </Stepper>

      {/* STEP CONTENT */}
      <Box mx={2} my={3} minHeight='400px'>
        <StepContent step={multi.activeStep} />
      </Box>

      <Box display='flex' justifyContent='space-between'>
        <Button
          disabled={activeStep == 0}
          variant='outlined'
          onClick={handlePrev}>Atrás</Button>
        <Button
          type='submit'
          form={activeStep == 0 ? 'main-form' : activeStep == 1 ? 'extra-form' : ''}
          disabled={activeStep == 2}
          variant="contained">Siguiente</Button>
      </Box>
    </>
  )
}


function StepContent(props: { step: number }) {

  switch (props.step) {
    case 0:
      return <FormRegistro />
    case 1:
      return <FormRegistroExtra />
    case 2:
      return <pre>step 2</pre>
    default:
      return null;
  }
}


const registroSchema = yup.object({
  main: yup.object({
    nombre: yup.string().required(),
    edad: yup.string().required().nullable(),
    talla: yup.string().required(),
    sexo: yup.string().required().nullable(),
    correo: yup.string().email().required(),
    telefono: yup.string().required()
  }),
  people: yup.array().of(
    yup.object({
      nombre: yup.string().required(),
      edad: yup.string().required(),
      talla: yup.string().required(),
      sexo: yup.string().nullable().required(),
    })
  )
})