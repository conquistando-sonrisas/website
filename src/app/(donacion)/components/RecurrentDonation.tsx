'use client'

import { createCardToken, initMercadoPago, Payment, useCardPaymentBrick } from "@mercadopago/sdk-react"
import { ReactNode, useCallback, useEffect, useState } from "react"
import DonacionSummary from "./DonacionSummary"
import { Alert, AlertTitle, Backdrop, Box, Button, CircularProgress, Divider, Grid2, Icon, Stack, TextField, Typography } from "@mui/material"
import { IPaymentFormData } from "@mercadopago/sdk-react/esm/bricks/payment/type"
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { grey } from "@mui/material/colors"
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import TodayIcon from '@mui/icons-material/Today';
import Link from "next/link"
import { conquiApi } from "@/app/utlis/swr"
import { isAxiosError } from "axios"
import { paymentBrickCustomization } from "./MercadoPagoPayment"

initMercadoPago(process.env.NEXT_PUBLIC_DONACION_RECURRENTE_PUBLIC_KEY);
export default function RecurrentDonation({ amount, handleOnReady, donadorEmail }: {donadorEmail: string, amount: number, handleOnReady: (ready: boolean) => void }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [suscriptionRes, setSuscriptionRes] = useState<MonthlyResponseType | null>();

  const handleSubmit = useCallback(async (data: IPaymentFormData) => {
    try {
      setLoading(true)
      const res = await conquiApi.post('/donaciones', {
        ...data.formData,
        frequency: 'monthly'
      })
      const body = res.data;
      const suscription: MonthlyResponseType = {
        amount: body.amount,
        nextPayment: new Date(body.nextPayment),
        reason: body.reason,
        status: body.status,
        suscriptionId: body.susscriptionId
      }

      setSuscriptionRes(suscription)
    } catch (err) {
      if (isAxiosError(err)) {
        setErrorMessage(err.response?.data.message);
        return;
      }
      setErrorMessage('Hubo un problema al procesar la donación');
    } finally {
      setLoading(false)
    }
  }, [])

  if (errorMessage) {
    return (<Box mx='auto' maxWidth={'400px'} height={'100px'}>
      <Alert severity="error">
        <AlertTitle color="inherit">Hubo un error al proesar la donación</AlertTitle>
        <Typography color='inherit'>{errorMessage}</Typography>
        <Button LinkComponent={Link} href='/' color="inherit" sx={{ textTransform: 'none' }}>Volver a inicio</Button>
      </Alert>
    </Box>
    )
  }

  useEffect(() => {
    return () => handleOnReady(false)
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
        suscriptionRes ? (
          <RecurrentDonationStatus suscriptionRes={suscriptionRes} />
        ) : (
          <Payment
            initialization={{
              amount: amount,
              payer: {
                email: donadorEmail
              }
            }}
            onSubmit={handleSubmit}
            customization={paymentBrickCustomization}
            onReady={() => handleOnReady(true)}
          />
        )
      }
    </>
  )
}

const DonationDetail = (props: { title: string, description: string, Icon: ReactNode }) => {

  return (
    <Box display='flex' alignItems='center' height={80}>
      {props.Icon}
      <Box ml={2}>
        <Typography fontSize={20} fontWeight={500}>{props.title}</Typography>
        <Typography variant="caption" fontSize={14} color={grey[700]}>{props.description}</Typography>
      </Box>
    </Box>
  )
}


type MonthlyResponseType = {
  suscriptionId: string;
  status: string;
  reason: string;
  nextPayment: Date;
  amount: number;
}


const RecurrentDonationStatus = (props: { suscriptionRes: MonthlyResponseType }) => {
  const { amount, reason } = props.suscriptionRes;
  return (
    <Box
      mx='auto'
      bgcolor={'conquiLightBlue.100'}
      px={3}
      py={5}
      borderRadius={5}
      width={'500px'}
    >
      <Typography mb={3} textAlign='center' variant="h1" fontSize={24} fontWeight={600}>¡Gracias por tu donación recurrente!</Typography>
      <Stack
        divider={<Divider />}
        rowGap={1}
      >
        <DonationDetail
          title={`${Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount)}`}
          Icon={<CreditCardIcon sx={{ fontSize: 30, color: 'conquiLightBlue.dark' }} />}
          description='Monto de donación'
        />
        <DonationDetail
          title="Descripción"
          Icon={<VolunteerActivismIcon sx={{ fontSize: 30, color: 'conquiLightBlue.dark' }} />}
          description={`${reason}`}
        />
        <DonationDetail
          title="Operación"
          Icon={<TodayIcon sx={{ fontSize: 30, color: 'conquiLightBlue.dark' }} />}
          description='La transacción se realizará en un par de horas'
        />
        <Button
          LinkComponent={Link}
          href='/'
          variant="contained"
          color='conquiDarkBlue'
          sx={{ mt: 2, textTransform: 'none' }} >Ir a inicio</Button>
      </Stack>
    </Box>
  )
}