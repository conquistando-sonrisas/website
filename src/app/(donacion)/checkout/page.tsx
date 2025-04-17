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

  const _amount = parseFloat(amount as string);
  const fees = ((_amount + 4.64) / 0.959516) - _amount 
  
  return (
    <Box component='main' sx={{ minHeight: '85vh' }}>
      <Container sx={{ py: 4 }}>
        <PaymentBrick
          amount={_amount}
          fees={fees}
          frequency={frequency as Frequency}
        />
      </Container>
    </Box>
  )
}