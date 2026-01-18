'use client'

import { Frequency } from "@/app/(web)/app";
import { Box, Divider, Typography } from "@mui/material";
import { useDonacionContext } from "./DonacionContext";


const DonacionSummary = ({ amount, fees, frequency }: { amount: number, frequency: Frequency, fees: number }) => {
  const donacionMethods = useDonacionContext();

  if (!donacionMethods) {
    throw new Error('Use Donacion Context Provider')
  }

  const { acceptedFees } = donacionMethods;

  return (
    <Box sx={{ backgroundColor: '#f1f7fc', p: 2, borderRadius: 2, maxWidth: '400px' }}>
      <Typography
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          columnGap: '5px'
        }}
        mb={1.3}
        variant='h2' fontSize={'20px'} fontWeight={600} >
        Resumen
      </Typography>
      <Box display={'flex'}>
        <Typography variant="body2">Donación {frequency === 'one-time' ? 'única' : 'mensual'}</Typography>
        <Typography ml='auto'>{
          Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', }).format(amount)
        }</Typography>
      </Box>
      <Box display={'flex'}>
        <Typography variant="body2">Cargos de transferencia</Typography>
        <Typography ml='auto'>{
          Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', }).format(acceptedFees ? fees : 0)
        }</Typography>
      </Box>
      <Divider sx={{ my: 1.5 }} />
      <Box display={'flex'}>
        <Typography fontWeight={600}>Total</Typography>
        <Typography fontWeight={600}ml='auto'>{
          Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', }).format(acceptedFees ? fees + amount : amount)
        }</Typography>
      </Box>
    </Box>

  )
}

export default DonacionSummary;