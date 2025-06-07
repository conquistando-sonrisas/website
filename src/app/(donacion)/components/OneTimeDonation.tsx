'use client'

import { initMercadoPago, Payment, StatusScreen } from "@mercadopago/sdk-react";
import { IPaymentFormData } from "@mercadopago/sdk-react/esm/bricks/payment/type";
import { Alert, AlertTitle, Backdrop, Box, Button, CircularProgress, Grid2, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import DonacionSummary from "./DonacionSummary";
import { paymentBrickCustomization } from "./MercadoPagoPayment";
import Link from "next/link";
import { useWindowSize } from "@react-hook/window-size/throttled";
import ReactConfetti from "react-confetti";
import { conquiApi } from '@/app/utlis/swr'
import { isAxiosError } from "axios";


initMercadoPago(process.env.NEXT_PUBLIC_DONACION_UNICA_PUBLIC_KEY)
export default function OneTimeDonation(props: { amount: number, fees: number }) {
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
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
          <OneTimeDonationStatus paymentId={paymentId} threeDsInfo={threeDsInfo} />
        ) : (
          <Grid2 container spacing={2}>

            <Grid2 size={{ xs: 12, md: 7 }} order={{ xs: 2, md: 1 }} >
              <Payment
                initialization={{
                  amount: props.amount + props.fees,
                }}
                onSubmit={handleSubmit}
                customization={paymentBrickCustomization}
              />
            </Grid2 >
            <Grid2 size={{ xs: 12, md: 5 }} order={{ xs: 1, md: 2 }}>
              <DonacionSummary amount={props.amount} fees={props.fees} frequency='oneTime' />
            </Grid2>
          </Grid2 >
        )
      }
    </>
  )
}


const OneTimeDonationStatus = ({ paymentId, threeDsInfo }: { paymentId: string, threeDsInfo: { externalResourceURL: string, creq: string } | null }) => {
  const [width, height] = useWindowSize();

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
      {
        paymentId && threeDsInfo === null && (
          <ReactConfetti width={width} height={height} />
        )
      }
    </Box>

  )
}