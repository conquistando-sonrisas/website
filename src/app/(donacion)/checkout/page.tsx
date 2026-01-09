import { Alert, AlertTitle, Box, Button, Container, Typography } from '@mui/material';
import { Frequency, WithSearchParams } from '@/app/(web)/app';
import { MercadoPagoPayment } from '../components/MercadoPagoPayment';
import ConstructionIcon from '@mui/icons-material/Construction';


export default async function CheckoutDonacion(props: WithSearchParams) {
  const { amount = 0, frequency = '' } = await props.searchParams;

  if (!amount || !frequency) {
    return (<Box minHeight='85vh' component={Container} pt={3}>
      <Alert severity='error'>
        <AlertTitle color='inherit'>Error</AlertTitle>
        No monto o modo de donación definido
      </Alert>
    </Box>)
  }

  if (typeof frequency === 'string' && (frequency !== 'oneTime' && frequency !== 'monthly')) {
    return (<Box minHeight='85vh' component={Container} pt={3}>
      <Alert severity='error'>
        <AlertTitle color='inherit'>Error</AlertTitle>
        Modo de donación inválido
      </Alert>
    </Box>)
  }
  const _amount = parseFloat(amount as string);
  if (isNaN(_amount)) {
    return (<Box minHeight='85vh' component={Container} pt={3}>
      <Alert severity='error'>
        <AlertTitle color='inherit'>Error</AlertTitle>
        Monto de donación inválido
      </Alert>
    </Box>)
  }

  // se toma 2.89% de tarifas con base en documentacion de Mercado Libre Solidario https://www.mercadolibre.com.mx/ayuda/4942
  const fees = (_amount / 0.966476) - _amount;

  return (
    <Box component='main' sx={{ minHeight: '85vh' }}>
      <Container sx={{ py: 4 }}>
        <Box borderRadius={1} bgcolor={'#f1f7fc'} p={3} display={'flex'} alignItems={'center'} flexDirection={'column'}>
          <ConstructionIcon sx={{ fontSize: 60, color: 'primary.main', my: 3 }} />
          <Typography fontSize={24} textAlign={'center'} mb={3}>
            Por el momento, las donaciones no están disponibles. Estamos trabajando para habilitarlas nuevamente lo más pronto posible.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}