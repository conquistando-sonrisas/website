'use client'

import { Frequency } from "@/app/(web)/app";
import { IPaymentBrickCustomization } from "@mercadopago/sdk-react/esm/bricks/payment/type";
import dynamic from "next/dynamic"

const RecurrentDonation = dynamic(() => import('./RecurrentDonation'), { ssr: false });
const OneTimeDonation = dynamic(() => import('./OneTimeDonation'), { ssr: false });


export const MercadoPagoPayment = ({ frequency, amount, fees }: { frequency: Frequency, amount: number, fees: number }) => {
  if (frequency === 'monthly') {
    return <RecurrentDonation amount={amount} fees={fees} />
  }

  return <OneTimeDonation amount={amount} fees={fees} />
}


export const paymentBrickCustomization: IPaymentBrickCustomization = {
  visual: {
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
      }
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