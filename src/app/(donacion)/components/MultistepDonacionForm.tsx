'use client'

import { Box, Button, CircularProgress, Grid2, Paper, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import { memo, useState } from "react";
import { MercadoPagoPayment } from "./MercadoPagoPayment";
import DonacionSummary from "./DonacionSummary";
import { Frequency } from "@/app/(web)/app";
import DonadorForm from "./DonadorForm";
import { DonacionProvider, useDonacion } from "./DonacionContext";
import { CoverFees } from "./CoverFees";


export default function MultistepDonacionForm({ amount, fees, frequency }: { frequency: Frequency, amount: number, fees: number }) {
  const donacionMethods = useDonacion();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <DonacionProvider value={{ ...donacionMethods }}>
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
          <DonacionStepContent
            step={activeStep}
            amount={amount}
            fees={fees}
            frequency={frequency}
          />
          <Box display={'flex'} justifyContent={'space-between'}>
            <Button
              disabled={activeStep === 0 || (activeStep === 1 && !donacionMethods.isPaymentFormReady)}
              onClick={() => setActiveStep(0)}
              sx={{
                textTransform: 'none',
              }}
            >
              Atras
            </Button>
            {
              activeStep === 1 ? (
                <Button
                  disabled={!donacionMethods.isPaymentFormReady}
                  variant="contained"
                  size="large"
                  sx={{
                    textTransform: 'none',
                  }}>
                  Donar
                </Button>
              ) : (
                <Button
                  onClick={() => setActiveStep(1)}
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
            amount={amount}
            fees={fees}
            frequency={frequency}
          />
        </Grid2>
      </Grid2 >
    </DonacionProvider >
  );
}


const DonacionStepContent = ({ step, amount, fees, frequency }: { step: number, amount: number, fees: number, frequency: Frequency }) => {

  switch (step) {
    case 0:
      return <DonadorForm />
    case 1:
      return <MercadoPagoPayment amount={amount} fees={fees} frequency={frequency} />
    default:
      return null;
  }
}