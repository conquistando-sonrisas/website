import { Box, Container, Typography } from "@mui/material";
import { VoluntarioForm } from "./components/VoluntarioForm";
import SectionTitle from "../../components/SectionTitle";



export default function VoluntarioPage() {

  return (
    <main style={{ minHeight: '85vh' }}>
      <Container>
        <SectionTitle>Registro</SectionTitle>
        <Typography mb={1}>Llena el siguiente formulario y nosotros nos pondremos en contacto contigo lo más antes posible.</Typography>
        <VoluntarioForm />
      </Container>
    </main>
  )
}