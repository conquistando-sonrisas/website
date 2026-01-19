'use client'

import { Frequency } from "@/app/(web)/app";
import { IPaymentBrickCustomization } from "@mercadopago/sdk-react/esm/bricks/payment/type";
import RecurrentDonation from "./RecurrentDonation";
import OneTimeDonation from "./OneTimeDonation";
import { Box } from "@mui/material";
import { memo } from "react";
import { useDonacionContext } from "./DonacionContext";
import { CoverFees } from "./CoverFees";

const MemoizedOneTimeDonation = memo(({ amount, handleOnReady }: { amount: number, handleOnReady: (ready: boolean) => void }) => {
  return <OneTimeDonation amount={amount} handleOnReady={handleOnReady} />
})


export const MercadoPagoPayment = ({ frequency }: { frequency: Frequency }) => {
  const methods = useDonacionContext();

  if (!methods) {
    throw new Error('Use Donacion Context Provider');
  }

  const { amount, handleOnPaymentFormReady } = methods;

  const DonationPayment = frequency === 'monthly'
    ? <RecurrentDonation amount={amount} />
    : <MemoizedOneTimeDonation amount={amount} handleOnReady={handleOnPaymentFormReady} />;

  return (
    <Box
      minHeight={'350px'}
    >
      {DonationPayment}
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