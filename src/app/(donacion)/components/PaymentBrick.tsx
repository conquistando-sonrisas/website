'use client'

import { Frequency } from "@/app/(web)/app"
import { createCardToken, initMercadoPago, Payment, StatusScreen } from '@mercadopago/sdk-react';
import { IAdditionalCardFormData, IPaymentFormData } from "@mercadopago/sdk-react/esm/bricks/payment/type"
import { avatarClasses, Backdrop, Box, CircularProgress, ClickAwayListener, Container, Grid2, IconButton, Switch, Tooltip, Typography } from "@mui/material";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { useCallback, useState } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InfoOutlineIcon from '@mui/icons-material/InfoOutlined';
import { usePaymentBrick } from "@mercadopago/sdk-react/esm/bricks/payment";
import { useRouter } from "next/navigation";


type PaymentBrickProps = {
  amount: number,
  frequency: Frequency,
  fees: number,
}

initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PUBLIC_KEY)

const PaymentBrick = (props: PaymentBrickProps) => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [paymentId, setPaymentId] = useState('');

  const handleSubmit = useCallback(async (data: IPaymentFormData, additional?: IAdditionalCardFormData | null) => {
    // additional?.cardholderName
    console.log(data, additional)
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_CONQUI_API}/donaciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data.formData,
          frequency: props.frequency
        })
      })
      const body = await res.json()

      setPaymentId(body.paymentId);

    } catch (err) {
      console.error('error', err)
      setErrorMessage((err as Error).message);
    } finally {
      setLoading(false)
    }
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
          <Box maxWidth='500px' mx='auto'>
            <StatusScreen
              initialization={{
                paymentId
              }}
              onError={console.error}
            />
          </Box>

        ) : (
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 7 }} order={{ xs: 2, md: 1 }} >
              <Payment
                initialization={{
                  amount: props.amount + props.fees
                }}
                customization={{
                  visual: {
                    style: {
                      customVariables: {
                        formBackgroundColor: '#f1f7fc',
                        formPadding: '10px',
                        textPrimaryColor: '#151633'
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
                }}
                onSubmit={handleSubmit}
                onError={console.error}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 5 }} order={{ xs: 1, md: 2 }}>
              <DonacionSummary amount={props.amount} fees={props.fees} frequency={props.frequency} />
            </Grid2>
          </Grid2>
        )
      }
    </>
  )
}

const DonacionSummary = (props: { amount: number, frequency: Frequency, fees: number }) => {
  const { update } = usePaymentBrick()
  const [checked, setChecked] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [controlledAmount, setControlledAmount] = useState(props.amount + props.fees);

  const handleCheck = useCallback((checked: boolean) => {
    const withFees = props.amount + props.fees;
    const newAmount = checked ? withFees : props.amount;
    setControlledAmount(newAmount)
    setChecked(checked);
    update({ amount: newAmount });
  }, []);

  return (
    <Box sx={{ backgroundColor: '#f1f7fc', px: 1, py: 4, borderRadius: 5 }}>
      <Typography
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          columnGap: '5px'

        }}
        variant='h1' fontSize={'20px'} fontWeight={600} mb={{ xs: 1.2, md: 1 }}>
        Donación <Box component='span' sx={{
          width: 30,
          height: 30,
          borderRadius: 10,
        }}>
          <VolunteerActivismIcon color="inherit" sx={{ fontSize: 30 }} />
        </Box>
      </Typography>
      <Box display='flex' alignItems='center'>
        <Box alignItems='center' display='flex' justifyContent='flex-start'>
          <Typography variant="body2" >
            Cubrir cargos de transferencia
          </Typography>
          <ClickAwayListener onClickAway={() => setClicked(false)}>
            <Tooltip
              title='Los cargos de transferencia son la suma de las tarifas de procesamiento y del software de donación en las que incurrimos con cada donación.'
              arrow
              disableFocusListener
              disableHoverListener
              disableTouchListener
              onClose={() => setClicked(false)}
              open={clicked}
              slotProps={{
                popper: {
                  disablePortal: true,
                },
              }}
            >
              <IconButton disableRipple onClick={() => setClicked(true)} sx={{ flex: 1 }} >
                <InfoOutlineIcon color="action" fontSize="small" />
              </IconButton>
            </Tooltip>
          </ClickAwayListener>
        </Box>
        <Switch
          sx={{ marginLeft: { md: 2 } }}
          aria-label="Cambiar configuración de cargos de transferencia"
          defaultChecked
          color="conquiDarkBlue"
          value={checked}
          onChange={e => handleCheck(e.target.checked)}
        />
      </Box>
      <Box display='flex' alignItems='center' justifyContent={{ xs: 'center', md: 'flex-start' }} columnGap={1} mt={{ xs: 2, md: 0 }}>
        <Typography
          fontSize={32}
          fontWeight={500}
        >

          {Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', }).format(controlledAmount)}
        </Typography>
        <Box display='flex' alignItems='center' columnGap={1}>
          <Typography variant="body2">
            {props.frequency === 'monthly' ? 'Mensual' : 'Una vez'}
          </Typography>
          <CalendarMonthIcon color='action' sx={{ fontSize: 24 }} />
        </Box>
      </Box>
    </Box >

  )
}


export default PaymentBrick