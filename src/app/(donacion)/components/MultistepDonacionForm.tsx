'use client'

import { Alert, Box, Button, Grid2, Paper, Snackbar, Step, StepLabel, Stepper } from "@mui/material";
import { MercadoPagoPayment } from "./MercadoPagoPayment";
import DonacionSummary from "./DonacionSummary";
import { Frequency } from "@/app/(web)/app";
import DonadorForm from "./DonadorForm";
import { DonacionProvider, useDonacion, useDonacionContext } from "./DonacionContext";
import { StepperProvider, useStepper } from "./StepperFormContext";
import { Favorite } from "@mui/icons-material";
import { useState } from "react";


export default function MultistepDonacionForm({ amount, fees, frequency }: { frequency: Frequency, amount: number, fees: number }) {
  const donacionMethods = useDonacion({ amount, fees });

  return (
    <StepperProvider totalSteps={2}>
      <DonacionProvider value={{ ...donacionMethods }}>
        <MultistepContent amount={amount} frequency={frequency} />
      </DonacionProvider>
    </StepperProvider>

  );
}



const MultistepContent = ({ amount, frequency }: { frequency: Frequency, amount: number }) => {
  const stepper = useStepper();
  const donacionMethods = useDonacionContext();
  const [errorMessageOnSubmit, setErrorMessageOnSubmit] = useState('')

  if (!stepper) {
    throw new Error('Use Stepper Context Provider');
  }

  if (!donacionMethods) {
    throw new Error('Use Donacion Context Provider');
  }

  const { activeStep, handlePrev } = stepper;

  const handleOnDonacionClick = async () => {
    const cardFormData = await (window as any)?.paymentBrickController.getFormData()
    if (!cardFormData.formData) {
      setErrorMessageOnSubmit('Ingresa los datos del medio de pago, por favor')
      return;
    }

    console.log('card form data', cardFormData)
  }

  return (
    <Grid2 container rowSpacing={2} justifyContent='space-evenly' maxWidth={{ xs: '400px', md: '100%' }}>
      <Grid2
        order={{ xs: 2, md: 1 }}
        component={Paper}
        borderRadius={2}
        elevation={0}
        variant="outlined"
        px={{ md: 2, xs: 1 }}
        bgcolor={'#f1f7fc'}
        py={3}
        size={{ xs: 12, md: 5.5 }}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
        >
          <Step>
            <StepLabel>Donador</StepLabel>
          </Step>
          <Step>
            <StepLabel>Método de pago</StepLabel>
          </Step>
        </Stepper>
        <Snackbar
          open={!!errorMessageOnSubmit}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={() => setErrorMessageOnSubmit('')}>
          <Alert severity="error">
            {errorMessageOnSubmit}
          </Alert>
        </Snackbar>
        <DonacionStepContent
          step={activeStep}
          frequency={frequency}
        />
        <Box display={'flex'} justifyContent={'space-between'}>
          <Button
            disabled={activeStep === 0 || (activeStep === 1 && !donacionMethods.isPaymentFormReady)}
            onClick={handlePrev}
            sx={{
              textTransform: 'none',
            }}
          >
            Atrás
          </Button>
          {
            activeStep === 1 ? (
              <Button
                disabled={!donacionMethods.isPaymentFormReady}
                variant="contained"
                onClick={handleOnDonacionClick}
                endIcon={<Favorite />}
                sx={{
                  textTransform: 'none',
                }}>
                Donar
              </Button>
            ) : (
              <Button
                form='formulario-donador'
                type='submit'
                variant="contained"
                sx={{
                  textTransform: 'none',
                }}>Siguiente</Button>

            )
          }
        </Box>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 5 }} order={{ xs: 1, md: 2 }}>
        <DonacionSummary
          frequency={frequency}
        />
      </Grid2>

    </Grid2>
  )
}


const DonacionStepContent = ({ step, frequency }: { step: number, frequency: Frequency }) => {

  switch (step) {
    case 0:
      return <DonadorForm />
    case 1:
      return <MercadoPagoPayment frequency={frequency} />
    default:
      return null;
  }
}