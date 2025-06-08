import { Container, Typography } from "@mui/material";
import Hero from "../components/Hero";
import { Evento, StrapiPaginatedResponse } from "../app";
import EventosList from "./components/EventosList";
import qs from 'qs';


export default async function EventosPage() {

  return (
    <main style={{ minHeight: '100vh' }}>
      <Hero
        title="Eventos"
        desc="Descubre cuales son nuestros próximos eventos y cómo puedes ayudar"
      />
      <Container sx={{ my: 3 }}>
        <EventosList />
      </Container>
    </main>
  )
}