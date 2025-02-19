import { Box, Button, Grid2, Typography } from "@mui/material";
import Image from "next/image";
import voluntarios from '../../../../public/voluntarios.jpg'
import SectionTitle from "@/app/components/SectionTitle";
import { ArrowForward } from "@mui/icons-material";

export function NosotrosSection() {

  return (<Grid2 container>
    <Grid2
      height='500px'
      size={{ xs: 12, md: 6 }}
      columnSpacing={2}
      rowSpacing={1}
      position='relative'>
      <Image
        src={voluntarios}
        width={0}
        height={0}
        layout='fill'
        style={{ objectFit: 'cover', borderRadius: 10, objectPosition: 'center' }}
        alt='grupo de personas' />
    </Grid2>
    <Grid2 size={{ xs: 12, md: 'grow' }} sx={{ p: { md: 3, xs: 1 } }}>
      <SectionTitle>Nosotros</SectionTitle>
      <Typography mb={2}>
        Somos una asociación que vela por el bienestar emocional y funcional
        de niños, niñas y adolescentes con diagnóstico de cáncer del estado de
        Chihuahua.
      </Typography>
      <Button endIcon={<ArrowForward />} variant="contained" sx={{
        borderRadius: '25px'
      }} color="conquiLightBlue">Ver más</Button>
    </Grid2>
  </Grid2>)
}