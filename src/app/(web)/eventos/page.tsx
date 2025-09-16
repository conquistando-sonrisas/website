import { CircularProgress, Container, Typography } from "@mui/material";
import Hero from "../components/Hero";
import { Evento, StrapiPaginatedResponse } from "../app";
import EventosList from "./components/EventosList";
import qs from 'qs';
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eventos | Conquistando Sonrisas A.C.",
  description: "Descubre cuales son nuestros próximos eventos y cómo puedes ayudar"
};

export default async function EventosPage() {

  return (
    <main style={{ minHeight: '100vh' }}>
      <Hero
        title="Eventos"
        desc="Descubre cuáles son nuestros próximos eventos y cómo puedes ayudar"
      />
      <Container sx={{ my: 3 }}>
        <Suspense fallback={<CircularProgress />}>
          <EventosList />
        </Suspense>
      </Container>
    </main>
  )
}