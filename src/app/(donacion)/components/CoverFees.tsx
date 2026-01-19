'use client'

import { Box, Fade, Switch, Typography } from "@mui/material"
import { useDonacionContext } from "./DonacionContext"
import { ChangeEvent, useCallback } from "react";
import { usePaymentBrick } from "@mercadopago/sdk-react";



export const CoverFees = () => {
  const donacionMethods = useDonacionContext();

  if (!donacionMethods) {
    throw new Error('Use Donacion Context Provider');
  }

  const { handleAcceptingFees, acceptedFees, isPaymentFormReady } = donacionMethods;

  const handleCheck = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    handleAcceptingFees(e.currentTarget.checked);
  }, []);

  return (
    <Fade in={isPaymentFormReady} timeout={{
      enter: 800
    }}>
      <Box
        bgcolor={'conquiYellow.light'}
        color={'conquiDarkBlue.light'}
        mb={2}
        mx={{ md: 4 }}
        p={1}
        borderRadius={2}>
        <Box display={'flex'} alignItems={'center'}>
          <Typography color='inherit'>Cubrir cargos de transferencia</Typography>
          <Switch
            onChange={handleCheck}
            value={'cubrir-cargos'}
            checked={acceptedFees}
            slotProps={{
              input: {
                "aria-label": 'Aceptar cargos de transferencia'
              }
            }} sx={{ ml: 'auto' }} color="conquiDarkBlue" />
        </Box>
        <Typography color='inherit' variant="caption">Esto nos permite aprovechar tu donación al máximo</Typography>
      </Box>
    </Fade>
  )
}