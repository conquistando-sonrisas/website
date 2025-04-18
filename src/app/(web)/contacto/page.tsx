
import { Box, Button, Container, FormControl, Grid2, IconButton, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import SectionTitle from "../components/SectionTitle";
import YellowBackground from '../../../../public/Asset 25.png'
import Image from "next/image";
import { ReactNode } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContactForm from "./components/ContactoForm";
import ContactoDetails from "./components/ContactoDetails";


export default function ContactoPage() {


  return (<main style={{ minHeight: '80vh' }}>
    <Container>
      <SectionTitle>Queremos escucharte</SectionTitle>
      <Typography mb={5}>Si tienes alguna duda escribenos</Typography>
      <Grid2 container spacing={4} mb={{ xs: 5 }}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <ContactForm />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <ContactoDetails />
        </Grid2>
      </Grid2>
    </Container>
  </main>)
}
