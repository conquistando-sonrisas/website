'use client'

import { initMercadoPago, Payment } from "@mercadopago/sdk-react"
import { Box, Typography } from "@mui/material"
import { useCallback, useEffect } from "react"
import { useMultiStepForm } from "./MultiStepContext"
import { IAdditionalCardFormData, IPaymentFormData } from "@mercadopago/sdk-react/esm/bricks/payment/type"
import axios from "axios"
import { calculateFees, roundToTwo } from "@/app/utlis/payment"

initMercadoPago(process.env.NEXT_PUBLIC_REGISTRO_CARRERA_PUBLIC_KEY)

export default function FormPago() {
  const multi = useMultiStepForm();

  const participantes = [multi?.registro['main-form'], ...multi?.registro['extra-form'].people]
  const grossAmount = participantes.length * 350;
  const fees = calculateFees(grossAmount);
  const total = roundToTwo(grossAmount + fees);

  const handleSubmit = useCallback(async (param: IPaymentFormData, extra?: IAdditionalCardFormData | null) => {
    if (!multi) return;

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_CARRERA_API}/participantes`, {
        main: multi.registro['main-form'],
        extra: multi.registro['extra-form'].people,
        payment: param.formData
      });
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }, [multi])


  if (!multi) return;

  useEffect(() => {
    setTimeout(() => {
      console.log('scrolling')
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0)
  }, [])

  return (
    <Box>
      <Payment
        initialization={{
          amount: total,
          items: {
            totalItemsAmount: total,
            itemsList: [{
              units: participantes.length,
              value: grossAmount,
              name: 'Kit de la carrera',
            }, {
              units: 1,
              value: fees,
              name: 'Cargos de transferencia',
            }]
          },
          payer: {
            email: multi?.registro['main-form'].correo,
          }
        }}
        locale='es-MX'
        customization={{
          visual: {
            texts: {
              formSubmit: 'Donar',
              reviewConfirm: {
                componentTitle: "Revisa y confirma tu donación"
              }
            },
            style: {
              customVariables: {
                textPrimaryColor: '#151633',
                baseColor: '#24376f',
                formPadding: '10px'
              }
            }
          },
          enableReviewStep: true,
          paymentMethods: {
            maxInstallments: 1,
            minInstallments: 1,
            creditCard: 'all',
            debitCard: 'all',
            mercadoPago: 'all'
          },

        } as any}
        onSubmit={handleSubmit}
      />
    </Box>
  )
}