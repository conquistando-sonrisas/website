import { Alert, AlertTitle, Box, Button, Container } from '@mui/material';
import { Frequency, WithSearchParams } from '@/app/(web)/app';
import { MercadoPagoPayment } from '../components/MercadoPagoPayment';



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

  const fees = ((_amount + 4.64) / 0.959516) - _amount


  return (
    <Box component='main' sx={{ minHeight: '85vh' }}>
      <Container sx={{ py: 4 }}>
        <MercadoPagoPayment amount={_amount} fees={fees} frequency={frequency as Frequency} />
      </Container>
    </Box>
  )
}