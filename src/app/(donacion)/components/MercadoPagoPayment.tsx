'use client'

import { Frequency } from "@/app/(web)/app";
import { IPaymentBrickCustomization } from "@mercadopago/sdk-react/esm/bricks/payment/type";
import dynamic from "next/dynamic"
import RecurrentDonation from "./RecurrentDonation";
import OneTimeDonation from "./OneTimeDonation";
import { Box } from "@mui/material";
import { CoverFees } from "./CoverFees";



export const MercadoPagoPayment = ({ frequency, amount, fees }: { frequency: Frequency, amount: number, fees: number }) => {
  const DonationPayment = frequency === 'monthly'
    ? <RecurrentDonation amount={amount} fees={fees} />
    : <OneTimeDonation amount={amount} fees={fees} />;

  return (
    <Box>
      {DonationPayment}
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