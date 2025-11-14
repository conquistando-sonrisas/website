'use client'

import { Frequency } from "@/app/(web)/app";
import { usePaymentBrick } from "@mercadopago/sdk-react";
import { CalendarMonth, InfoOutlined, VolunteerActivism } from "@mui/icons-material";
import { Box, ClickAwayListener, IconButton, Switch, Tooltip, Typography } from "@mui/material";
import { useCallback, useState } from "react";


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
        variant='h2' fontSize={'20px'} fontWeight={600} >
        Donación <Box component='span' sx={{
          width: 30,
          height: 30,
          borderRadius: 10,
        }}>
          <VolunteerActivism color="inherit" sx={{ fontSize: 30 }} />
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
                <InfoOutlined color="action" fontSize="small" />
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
          <CalendarMonth color='action' sx={{ fontSize: 24 }} />
        </Box>
      </Box>
    </Box >

  )
}

export default DonacionSummary;