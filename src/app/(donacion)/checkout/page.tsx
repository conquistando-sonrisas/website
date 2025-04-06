import { ICardPaymentBrickPayer, ICardPaymentFormData } from '@mercadopago/sdk-react/esm/bricks/cardPayment/type';
import { IPaymentFormData } from '@mercadopago/sdk-react/esm/bricks/payment/type';
import { Box, Container } from '@mui/material';
import { useCallback } from 'react';
import PaymentBrick from '../components/PaymentBrick';
import { Frequency, WithSearchParams } from '@/app/(web)/app';

export default async function CheckoutDonacion(props: WithSearchParams) {
  const { amount = 0, frequency = 'one-time' } = await props.searchParams;

  if (!amount || !frequency) {
    throw new Error('No amount or no frequency defined');
  }


  return (
    <Box component='main' sx={{ minHeight: '85vh', backgroundColor: 'conquiYellow.light' }}>
      <Container sx={{ py: 4 }}>
        <PaymentBrick
          amount={parseFloat(amount as string)}
          frequency={frequency as Frequency}
        />
      </Container>
    </Box>
  )
}