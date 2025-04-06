'use client'

import { Frequency } from "@/app/(web)/app"
import { CardNumber, initMercadoPago, Payment, SecurityCode } from '@mercadopago/sdk-react';
import { IPaymentFormData } from "@mercadopago/sdk-react/esm/bricks/payment/type"
import { IBrickError } from "@mercadopago/sdk-react/esm/bricks/util/types/common"
import { Box } from "@mui/material";

type PaymentBrickProps = {
  amount: number,
  frequency: Frequency,
}

initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PUBLIC_KEY)

const PaymentBrick = (props: PaymentBrickProps) => {

  const handleSubmit = async (formData: IPaymentFormData) => {
    console.log('submiting:', formData)
  }

  return (
    <>
      <Box sx={{ backgroundColor: 'conquiLightBlue.main', p: 1, m: 1 }}>
        <pre>{props.amount}</pre>
      </Box>
      <Payment
        initialization={{
          amount: props.amount,
        }}
        customization={{
          paymentMethods: {
            creditCard: 'all',
            debitCard: 'all',
            mercadoPago: 'all'
          }
        }}
        onSubmit={handleSubmit}
        onError={console.log}
      />
    </>
  )
}


export default PaymentBrick