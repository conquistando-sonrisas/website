import { StatusScreen } from "@mercadopago/sdk-react";



export default function DonacionStatusScreen(props: { paymentId: string }) {

  return (
    <StatusScreen
      initialization={{
        paymentId: props.paymentId
      }}
    />
  )
}