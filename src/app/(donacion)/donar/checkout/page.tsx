import { Alert, AlertTitle, Box, Container } from '@mui/material';
import { Frequency, WithSearchParams } from '@/app/(web)/app';
import MultistepDonacionForm from '../../components/MultistepDonacionForm';


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

  if (typeof frequency === 'string' && (frequency !== 'one-time' && frequency !== 'monthly')) {
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
  // y se redonde a dos decimas despues del punto
  const fees = Math.round((((_amount / 0.966476) - _amount) + Number.EPSILON) * 100) / 100;

  return (
    <Box component='main' sx={{ minHeight: '85vh' }}>
      <Container sx={{ py: 4, justifyContent: 'center' }} >
        <MultistepDonacionForm
          fees={fees}
          amount={_amount}
          frequency={frequency.toString() as Frequency}
        />
      </Container>
    </Box>
  )
}