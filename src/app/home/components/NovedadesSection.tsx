import { Box, Button, IconButton, Typography } from "@mui/material";
import * as React from 'react';
import NovedadesMasonry from "./NovedadesMasonry";
import SectionTitle from "@/app/components/SectionTitle";
import { ArrowForward } from "@mui/icons-material";


export default async function NovedadesSection() {
  const novedadesReq = await fetch(`${process.env.NEXT_PUBLIC_CMS_API}/novedades?sort[0]=publishedAt:desc&pagination[page]=1&pagination[pageSize]=6&populate[0]=cover`);
  const novedades = await novedadesReq.json();

  return (
    <Box component='section' display='flex' flexDirection='column'>
      <SectionTitle>Novedades</SectionTitle>
      <Typography>Entérate de las últimas actualizaciones de Conqui</Typography>
      <NovedadesMasonry noticias={novedades.data} />
      <Button
        endIcon={<ArrowForward />}
        variant="contained"
        sx={{
          borderRadius: '25px',
          mt: '-20px',
          alignSelf: 'center'
        }} color="conquiDarkBlue">Ver más</Button>
    </Box>)
}