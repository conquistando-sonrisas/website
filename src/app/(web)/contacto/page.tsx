
import { Box, Button, Container, FormControl, Grid2, IconButton, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import SectionTitle from "../components/SectionTitle";
import YellowBackground from '../../../../public/Asset 25.png'
import Image from "next/image";
import { ReactNode } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContactForm from "./components/ContactoForm";
import ContactoDetails from "./components/ContactoDetails";
import { Contacto } from "../app";


export default async function ContactoPage() {
  const contactoReq = await fetch(`${process.env.NEXT_PUBLIC_CMS_API}/contacto?populate=*`);
  const contactoRes = await contactoReq.json();
  const contacto = contactoRes.data as Contacto;

  return (<main style={{ minHeight: '83vh' }}>
    <Container>
      <SectionTitle>Queremos escucharte</SectionTitle>
      <Typography mb={5}>Si tienes alguna duda escríbenos</Typography>
      <Grid2 container spacing={4} mb={{ xs: 5 }}>
        <Grid2 size={{ xs: 12, md: 5 }}>
          <ContactForm />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 7 }}>
          <ContactoDetails detalles={contacto} />
        </Grid2>
      </Grid2>
    </Container>
  </main>)
}
