'use client'

import { Payment, StatusScreen } from "@mercadopago/sdk-react";
import { IPaymentFormData } from "@mercadopago/sdk-react/esm/bricks/payment/type";
import { Alert, AlertTitle, Backdrop, Box, Button, CircularProgress, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { paymentBrickCustomization } from "./MercadoPagoPayment";
import Link from "next/link";
import { conquiApi } from '@/app/utlis/swr'
import { isAxiosError } from "axios";


export default function OneTimeDonation(props: { amount: number, handleOnReady: (ready: boolean) => void }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [threeDsInfo, setThreeDsInfo] = useState<{ externalResourceURL: string, creq: string } | null>(null);

  const handleSubmit = useCallback(async (data: IPaymentFormData) => {
    try {
      setLoading(true)
      const res = await conquiApi.post('/donaciones', {
        ...data.formData,
        frequency: 'one-time'
      })

      setPaymentId(res.data.paymentId);
      setThreeDsInfo(res.data.threeDsInfo);
    } catch (err) {
      if (isAxiosError(err)) {
        setErrorMessage(err.response?.data.message);
        return;
      }
      setErrorMessage((err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  if (errorMessage) {
    return (<Box mx='auto' maxWidth={'400px'} height={'100px'}>
      <Alert severity="error">
        <AlertTitle color="inherit">Hubo un error al procesar la donación</AlertTitle>
        <Typography>
          {errorMessage}
        </Typography>
        <Button LinkComponent={Link} href='/' color="inherit" sx={{ textTransform: 'none' }}>Volver a inicio</Button>
      </Alert>
    </Box>
    )
  }

  useEffect(() => {
    return () => props.handleOnReady(false)
  }, [])

  return (
    <>
      <Backdrop
        sx={theme => ({
          color: 'whitesmoke',
          zIndex: theme.zIndex.drawer + 1
        })}
        open={loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      {
        paymentId ? (
          <OneTimeDonationStatus
            paymentId={paymentId}
            threeDsInfo={threeDsInfo}
          />
        ) : (
          <Payment
            initialization={{
              amount: props.amount,
            }}
            onSubmit={handleSubmit}
            customization={paymentBrickCustomization}
            onReady={() => props.handleOnReady(true)}
          />
        )
      }
    </>
  )
}


const OneTimeDonationStatus = ({ paymentId, threeDsInfo }: { paymentId: string, threeDsInfo: { externalResourceURL: string, creq: string } | null }) => {
  return (
    <Box maxWidth='500px' mx='auto'>
      <StatusScreen
        initialization={{
          paymentId,
          ...(threeDsInfo !== null && {
            additionalInfo: {
              ...threeDsInfo
            }
          }),
        }}
        onError={console.error}
      />
    </Box>

  )
}