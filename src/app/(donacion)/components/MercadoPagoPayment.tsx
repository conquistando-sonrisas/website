'use client'

import { Frequency } from "@/app/(web)/app";
import { IPaymentBrickCustomization } from "@mercadopago/sdk-react/esm/bricks/payment/type";
import RecurrentDonation from "./RecurrentDonation";
import OneTimeDonation from "./OneTimeDonation";
import { Box } from "@mui/material";
import { memo, useEffect } from "react";
import { useDonacionContext } from "./DonacionContext";
import { CoverFees } from "./CoverFees";
import { Payment } from "@mercadopago/sdk-react";

const MemoizedOneTimeDonation = memo(({ amount, handleOnReady, donadorEmail }: { donadorEmail: string, amount: number, handleOnReady: (ready: boolean) => void }) => {
  return <OneTimeDonation amount={amount} handleOnReady={handleOnReady}  donadorEmail={donadorEmail} />
})

const MemoizedRecurrentDonation = memo(({ amount, handleOnReady, donadorEmail }: { donadorEmail: string, amount: number, handleOnReady: (ready: boolean) => void }) => {
  return <RecurrentDonation amount={amount} handleOnReady={handleOnReady}  donadorEmail={donadorEmail} />

})


export const MercadoPagoPayment = ({ frequency }: { frequency: Frequency }) => {
  const methods = useDonacionContext();

  if (!methods) {
    throw new Error('Use Donacion Context Provider');
  }

  const { amount, handleOnPaymentFormReady, donador } = methods;

  if (!donador) {
    throw new Error('Fill donador form');
  }

  const DonationPayment = frequency === 'monthly'
    ? <MemoizedRecurrentDonation
      amount={amount}
      handleOnReady={handleOnPaymentFormReady} 
      donadorEmail={donador.correo}
      />
    : <MemoizedOneTimeDonation
      amount={amount}
      handleOnReady={handleOnPaymentFormReady}
      donadorEmail={donador.correo}
    />;

  return (
    <Box>
      <Box minHeight={'256px'}>
        {DonationPayment}
      </Box>
      <CoverFees />
    </Box>
  )
}


export const paymentBrickCustomization: IPaymentBrickCustomization = {
  visual: {
    hidePaymentButton: true,
    hideFormTitle: true,

    texts: {
      formSubmit: 'Donar'
    } as any,
    style: {
      customVariables: {
        formBackgroundColor: '#f1f7fc',
        inputBackgroundColor: '#fbfdfe',
        formPadding: '10px',
        textPrimaryColor: '#151633',
        baseColor: '#24376f'
      },
    }
  },
  paymentMethods: {
    maxInstallments: 1,
    minInstallments: 1,
    creditCard: 'all',
    debitCard: 'all',
    mercadoPago: 'all'
  }
}