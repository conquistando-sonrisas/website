import { Box, Container, Stack } from "@mui/material";
import HeroSection from "./home/components/Hero";
import Apoyos from "./home/components/ApoyosSection";
import BecomeAVoluntario from "./home/components/Voluntario";
import NosotrosSection from "./home/components/NosotrosSection";
import SectionTitle from "./components/SectionTitle";
import NovedadesSection from "./home/components/NovedadesSection";
import TestimoniosSection from "./home/components/TestimoniosSection";
import { HomeSinglePage } from "./app";
import qs from 'qs';
import { Metadata } from "next";


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

      <NovedadesSection />
      <BecomeAVoluntario />
    </main>
  );
}


export async function generateMetadata(): Promise<Metadata> {
  const params = qs.stringify({
    populate: ['NosotrosImagen', 'openGraphImage'],
    fields: ['NosotrosDescripcion']
  }, {
    encodeValuesOnly: true
  })
  const inicioReq = await fetch(`${process.env.NEXT_PUBLIC_CMS_API}/home?${params}`)
  const inicio = await inicioReq.json() as HomeSinglePage;

  return {
    title: 'Conquistando Sonrisas A.C.',
    openGraph: {
      description: inicio.data.NosotrosDescripcion,
      images: [{
        url: `${process.env.NEXT_PUBLIC_STATIC_CONTENT}${inicio.data.openGraphImage.url}`,
        width: inicio.data.openGraphImage.width,
        height: inicio.data.openGraphImage.height
      }]
    }
  }
}