'use client'

import { createCardToken, initMercadoPago, Payment, useCardPaymentBrick } from "@mercadopago/sdk-react"
import { ReactNode, useCallback, useEffect, useState } from "react"
import DonacionSummary from "./DonacionSummary"
import { Alert, AlertTitle, Backdrop, Box, Button, CircularProgress, Divider, Grid2, Icon, Stack, TextField, Typography } from "@mui/material"
import { IPaymentFormData } from "@mercadopago/sdk-react/esm/bricks/payment/type"
import { paymentBrickCustomization } from "./MercadoPagoPayment"
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { grey } from "@mui/material/colors"
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import TodayIcon from '@mui/icons-material/Today';
import Link from "next/link"
import { useWindowSize } from '@react-hook/window-size/throttled'
import ReactConfetti from 'react-confetti'



initMercadoPago(process.env.NEXT_PUBLIC_DONACION_RECURRENTE_PUBLIC_KEY)
export default function RecurrentDonation(props: { amount: number, fees: number }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [suscriptionRes, setSuscriptionRes] = useState<MonthlyResponseType | null>();

  const handleSubmit = useCallback(async (data: IPaymentFormData) => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_CONQUI_API}/donaciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data.formData,
          frequency: 'monthly'
        })
      })
      const body = await res.json();
      const suscription: MonthlyResponseType = {
        amount: body.amount,
        nextPayment: new Date(body.nextPayment),
        reason: body.reason,
        status: body.status,
        suscriptionId: body.susscriptionId
      }
      setSuscriptionRes(suscription)
    } catch (err) {
      console.error('error', err)
      setErrorMessage((err as Error).message);
    } finally {
      setLoading(false)
    }
  }, [])

  if (errorMessage) {
    return (<Box mx='auto' maxWidth={'400px'} height={'100px'}>
      <Alert severity="error">
        <AlertTitle color="inherit">{errorMessage}</AlertTitle>
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
      <Grid2 container spacing={2}>
        {
          suscriptionRes ? (
            <RecurrentDonationStatus suscriptionRes={suscriptionRes} />
          ) : (
            <>
              <Grid2 size={{ xs: 12, md: 7 }} order={{ xs: 2, md: 1 }}>
                <Box>
                  <Payment
                    initialization={{
                      amount: props.amount + props.fees,
                    }}
                    customization={paymentBrickCustomization}
                    onSubmit={handleSubmit}
                  />
                </Box>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 5 }} order={{ xs: 1, md: 2 }}>
                <DonacionSummary amount={props.amount} fees={props.fees} frequency='monthly' />
              </Grid2>
            </>
          )
        }
      </Grid2 >
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

const dateFormatter = (date: Date, opts: Intl.DateTimeFormatOptions) => {
  return new Intl.DateTimeFormat('es-MX', {
    timeZone: 'America/New_York',
    ...opts
  })
    .format(date)
}

type MonthlyResponseType = {
  suscriptionId: string;
  status: string;
  reason: string;
  nextPayment: Date;
  amount: number;
}


const RecurrentDonationStatus = (props: { suscriptionRes: MonthlyResponseType }) => {
  const { amount, reason, nextPayment } = props.suscriptionRes;
  const [width, height] = useWindowSize();
  return (
    <Box
      mx='auto'
      sx={{
        backgroundColor: 'conquiLightBlue.100'
      }}
      px={3}
      py={5}
      borderRadius={5}
      width={'500px'}
    >
      <Typography mb={3} textAlign='center' variant="h1" fontSize={24} fontWeight={600}>¡Gracias por tu donación!</Typography>
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
          description={`${dateFormatter(
            nextPayment,
            { day: 'numeric', month: 'long', year: 'numeric' })
            }`}
        />
        <Button
          LinkComponent={Link}
          href='/'
          variant="contained"
          color='conquiDarkBlue'
          sx={{ mt: 2, textTransform: 'none' }} >Ir a inicio</Button>
      </Stack>
      <ReactConfetti width={width} height={height} />
    </Box>
  )
}