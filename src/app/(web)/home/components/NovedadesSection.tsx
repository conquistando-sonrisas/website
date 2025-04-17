import { Box, Button, IconButton, Typography } from "@mui/material";
import * as React from 'react';
import NovedadesMasonry from "./NovedadesMasonry";
import SectionTitle from "@/app/(web)/components/SectionTitle";
import { ArrowForward, QuizSharp } from "@mui/icons-material";
import * as qs from 'qs'
import Link from "next/link";

export default async function NovedadesSection() {
  const params = qs.stringify({
    sort: ['publishedAt:desc'],
    pagination: {
      page: 1,
      pageSize: 6
    },
    fields: ['titulo', 'tipo', 'publishedAt'],
    populate: ['cover'],
  }, {
    arrayFormat: 'indices',
    encode: false
  })
  const novedadesReq = await fetch(`${process.env.NEXT_PUBLIC_CMS_API}/novedades?${params}`);
  const novedades = await novedadesReq.json();

  return (
    <Box component='section' display='flex' flexDirection='column'>
      <SectionTitle>Novedades</SectionTitle>
      <Typography>Actualizaciones más recientes en Conqui</Typography>
      <NovedadesMasonry novedades={novedades.data} />
      <Button
        LinkComponent={Link}
        href='/novedades'
        endIcon={<ArrowForward />}
        variant="contained"
        sx={{
          borderRadius: '25px',
          mt: { xs: 0, md: '-20px' },
          alignSelf: 'center'
        }} color="conquiDarkBlue" size='large'>Ver más</Button>
    </Box>)
}