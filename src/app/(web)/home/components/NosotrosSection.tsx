'use client'

import { Box, Button, Grid2, Typography } from "@mui/material";
import Image from "next/image";
import voluntarios from '../../../../public/voluntarios.jpg'
import SectionTitle from "@/app/(web)/components/SectionTitle";
import { ArrowForward } from "@mui/icons-material";
import Link from "next/link";

export default function NosotrosSection(props: { nosotrosImagenSrc: string, NosotrosDescripcion: string }) {

  return (<Grid2 container component='section'>
    <Grid2
      height='500px'
      size={{ xs: 12, md: 6 }}
      columnSpacing={2}
      rowSpacing={1}
      position='relative'>
      <Image
        src={props.nosotrosImagenSrc}
        width={0}
        height={0}
        layout='fill'
        style={{ objectFit: 'cover', borderRadius: 10, objectPosition: 'center' }}
        alt='grupo de personas' />
    </Grid2>
    <Grid2 size={{ xs: 12, md: 'grow' }} sx={{ p: { md: 3, xs: 1 } }}>
      <SectionTitle>Nosotros</SectionTitle>
      <Typography mb={2}>
        {props.NosotrosDescripcion}
      </Typography>
      <Button
        LinkComponent={Link}
        href="/nosotros"
        endIcon={<ArrowForward />}
        variant="contained"
        sx={{
          borderRadius: '25px'
        }} color="conquiDarkBlue">Ver más</Button>
    </Grid2>
  </Grid2>)
}