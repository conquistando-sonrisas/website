import { Box, Container, Grid2, Stack, Typography, } from "@mui/material";
import HeroSection from "./home/components/Hero";
import Apoyos from "./home/components/ApoyosSection";
import BecomeAVoluntario from "./home/components/Voluntario";
import NosotrosSection from "./home/components/NosotrosSection";
import SectionTitle from "./components/SectionTitle";
import NovedadesSection from "./home/components/NovedadesSection";
import { HomeSinglePage } from "./app";
import TestimoniosSection from "./home/components/TestimoniosSection";

export default async function Home() {
  const inicioReq = await fetch(`${process.env.NEXT_PUBLIC_CMS_API}/home?populate=*`)
  const inicio = await inicioReq.json() as HomeSinglePage;


  return (
    <main>
      <HeroSection conquiKidSrc={inicio.data.ConquiKid.url} />
      <Container component={Stack} rowGap={5} maxWidth='xl' sx={{ py: 3, mt: { md: 2 } }}>
        <NosotrosSection nosotrosImagenSrc={inicio.data.NosotrosImagen.url} NosotrosDescripcion={inicio.data.NosotrosDescripcion} />
        <section>
          <SectionTitle>¿Qué apoyos tenemos?</SectionTitle>
          <Apoyos />
        </section>
      </Container>

      <Box component='section' sx={{ my: 3, backgroundColor: '#f9f3f5' }}>
        <TestimoniosSection />
      </Box>

      <Container component={Stack} rowGap={5} maxWidth='xl'>
        <NovedadesSection />
      </Container>
      <BecomeAVoluntario />
    </main>
  );
}