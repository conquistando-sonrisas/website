import { Box, Container, Grid2, Paper, Typography } from "@mui/material";
import Image from "next/image";
import HeroSection from "./home/components/Hero";
import ApoyosCard from "./home/components/Apoyos";
import NoticiasMasonrySection from "./home/components/Noticias";
import BecomeAVoluntario from "./home/components/Voluntario";
import UpcomingEvent from "./home/components/UpcomingEvent";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Container maxWidth='xl'>
      <Typography my={2} variant="h5" fontSize={30} color="conquiDarkBlue.dark" fontWeight={700}>Pŕoximo evento</Typography>
        <UpcomingEvent />
        <Box my={2}></Box>
        <Typography my={2} variant="h5" fontSize={30} color="conquiDarkBlue.dark" fontWeight={700}>Apoyos</Typography>
        <ApoyosCard />
        <Typography my={2} variant="h5" fontSize={30} color="conquiDarkBlue.dark" fontWeight={700}>Noticias</Typography>
        <NoticiasMasonrySection />
      </Container>
      <BecomeAVoluntario />
    </main>
  );
}