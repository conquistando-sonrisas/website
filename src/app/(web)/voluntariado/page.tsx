import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import Hero from "../components/Hero";
import EquiposSection from "./components/EquiposSection";
import SectionTitle from "../components/SectionTitle";
import Image from "next/image";
import ActividadesVoluntariadoSection from "./components/ActividadesVoluntariadoSection";
import Link from "next/link";
import { ArrowForward } from "@mui/icons-material";



export default async function VoluntariadoPage() {
  return (
    <main>
      <Hero
        title="¿Quieres ser voluntario?"
        desc="¡No te pierdas esta oportunidad de hacer una diferencia! Únete a nosotros y ayúdanos a conquistar sonrisas para estos pequeños héroes."
        callToAction={<Button
          LinkComponent={Link}
          href='/voluntariado/registro'
          variant="contained"
          color="conquiDarkBlue"
          size='large'
          endIcon={<ArrowForward />}
          sx={{
            mt: 1,
            borderRadius: '25px',
            maxWidth: 'fit-content',
          }}>Registro</Button>
        }
      />
      <Container>
        <Grid2 container height='400px' minHeight='fit-content' sx={{ my: 3 }} spacing={2}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Typography mb={1}>
              Conquistando sonrisas está conformada el 98% por jóvenes voluntarios de 16 a 35 años de edad, quienes aportan su tiempo y conocimientos en cumplimiento de nuestros niños, niñas y adolescentes beneﬁciarios. Las actividades desempeñadas van desde la participación en los eventos de esparcimiento hasta el apoyo en actividades de procuración de fondos.
            </Typography>
            <Typography>
              Por lo que la intervención de nuestro equipo de voluntarios es de gran importancia, por lo que a lo largo de la historia de Conquistando Sonrisas A.C., se han involucrado alrededor de 300 jóvenes, quienes se preparan de manera positiva para su desarrollo profesional, personal y social.
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }} position='relative' minHeight='300px'>
            <Image
              src='https://static-content-lccc.s3.us-east-1.amazonaws.com/dia_nino_b402a63814.jpg'
              alt=''
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center center',
                borderRadius: 5
              }}
            />
          </Grid2>
        </Grid2>
      </Container>
      <Box sx={{ py: 5, backgroundColor: '#f9f3f5' }}>
        <Container>
          <EquiposSection />
        </Container>
        <Container maxWidth='xl' sx={{ mt: 3 }}>
          <ActividadesVoluntariadoSection />
        </Container>
      </Box>
      <Container sx={{ py: 5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <SectionTitle>
          ¡Sé parte de Conqui!
        </SectionTitle>
        <Button
          LinkComponent={Link}
          href='/voluntariado/registro'
          variant="contained"
          color="conquiDarkBlue"
          sx={{
            borderRadius: 10,
            maxWidth: 'fit-content'
          }}> Registro</Button>
      </Container>

    </main>
  )
}


