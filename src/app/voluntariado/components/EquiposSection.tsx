import HighlightText from "@/app/components/HighlightText";
import SectionTitle from "@/app/components/SectionTitle";
import { Box, Grid2, Stack, Typography } from "@mui/material";
import { Equipo } from "@/app/app";
import Image from "next/image";



export default async function EquiposSection() {
  const req = await fetch(`${process.env.NEXT_PUBLIC_CMS_API}/equipos?populate=*&pagination[pageSize]=3`)
  const res = await req.json();
  const equipos = res.data as Array<Equipo>;

  return (
    <section>
      <Grid2 container>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <SectionTitle sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            Nuestros <br />
            <HighlightText>equipos</HighlightText>
          </SectionTitle>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 9 }}>
          <EquiposList equipos={equipos} />
        </Grid2>
      </Grid2>
    </section>
  )
}

const EquiposList = (props: { equipos: Array<Equipo> }) => {

  return (
    <Stack spacing={2} direction={{ md: 'row', xs: 'column' }} alignItems={{ xs: 'center', md: 'stretch' }}>
      {
        props.equipos.map(equipo => (
          <Box
            key={equipo.documentId}
            sx={{
              zIndex: 2,
              width: { xs: '100%', md: '300px' },
              height: 'fit-content',
              backgroundColor: 'white',
              p: { xs: 1, md: 3 },
              borderRadius: 5
            }} >
            <Image
              src={equipo.logo.url}
              height={100}
              width={100}
              alt=''
              unoptimized />
            <Typography variant='h5' mb={1}>{equipo.nombre}</Typography>
            <Typography>{equipo.descripcion}</Typography>
          </Box>
        ))
      }
    </Stack>
  )
}