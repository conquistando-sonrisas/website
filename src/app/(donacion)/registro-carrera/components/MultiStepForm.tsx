'use client'

import { Alert, Box, Button, Grid2, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material"
import FormRegistro from "./RegistroForm"
import { ReactNode, useCallback, useContext, useState } from "react"
import FormRegistroExtra from "./RegistroExtraForm"
import * as yup from 'yup'
import { MultiStepFormProvider, useMultiStepForm } from "./MultiStepContext"
import FormPago from "./PagoForm"
import Image from "next/image"
import { VolunteerActivism } from "@mui/icons-material"
import { IPaymentFormData } from "@mercadopago/sdk-react/esm/bricks/payment/type"
import TerminosParticipacionForm from "./TerminosParticipacionForm"



export default function RegistroMultiStepForm() {

  return (
    <Grid2 container size={12} columnSpacing={2} rowSpacing={2}>
      <Grid2 size={{ xs: 12, md: 6.5 }} order={{ xs: 1, md: 2 }}>
        <Box component={Paper} px={{ xs: 1, md: 2 }} py={3} bgcolor='conquiLightBlue.50'>
          <Typography fontSize={24} fontWeight={500} my={2} textAlign='center'>Registro Carrera 5K</Typography>
          <MultiStepFormProvider>
            <MultiStep />
          </MultiStepFormProvider>
        </Box>
      </Grid2>
      <Grid2
        size={{ xs: 12, md: 5.5 }}
        order={{ xs: 2, md: 1 }}
        justifyContent='center'
        position='relative'
        minHeight='500px'
        maxHeight='650px'
      >
        <Image
          unoptimized
          src={'https://cms.conquistandosonrisas.org/uploads/POSTER_Mesa_de_trabajo_1_1_6cc013345c.webp'}
          alt=""
          layout='fill'
          sizes="(min-width: 768px ) 100vw"
          style={{
            borderRadius: '5px',
            objectFit: 'contain',
            objectPosition: 'center top'
          }}
        />
      </Grid2>
    </Grid2>
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
      <Stepper activeStep={multi.activeStep} alternativeLabel>
        <Step>
          <StepLabel>Registro</StepLabel>
        </Step>
        <Step>
          <StepLabel
            optional={<Typography variant="caption">Opcional</Typography>}
          >Extra</StepLabel>
        </Step>
        <Step>
          <StepLabel style={{ wordBreak: 'break-word' }}>Términos de participación</StepLabel>
        </Step>
        <Step>
          <StepLabel>Pago</StepLabel>
        </Step>
      </Stepper>

      <Box minHeight='450px' height='max-content' pt={2} pb={3}>
        <StepContent step={multi.activeStep} />
      </Box>

      <Box display='flex' justifyContent='space-between' mt={1}>
        <Button
          disabled={activeStep == 0}
          variant='outlined'
          onClick={handlePrev}>Atrás</Button>
        <Button
          type='submit'
          data-cy='button-submit'
          form={
            activeStep == 0 ? 'main-form'
              : activeStep == 1 ? 'extra-form'
                : activeStep == 2 ? 'terminos-form'
                  : ''
          }
          disabled={activeStep == 3}
          variant="contained">Siguiente</Button>
      </Box >
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
      return <TerminosParticipacionForm />
    case 3:
      return <FormPago />
    default:
      return null;
  }
}