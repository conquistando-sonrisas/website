import HighlightText from "@/app/(web)/components/HighlightText";
import SectionTitle from "@/app/(web)/components/SectionTitle";
import { Box, Grid2, Stack, Typography } from "@mui/material";
import { Equipo } from "@/app/(web)/app";
import Image from "next/image";



export default async function EquiposSection() {
  const req = await fetch(`${process.env.NEXT_PUBLIC_CMS_API}/equipos?populate=*&pagination[pageSize]=5`)
  const res = await req.json();
  const equipos = res.data as Array<Equipo>;

  return (
    <section>
      <Grid2 container mb={6}>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <SectionTitle sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            Nuestros <br />
            <HighlightText>equipos</HighlightText>
          </SectionTitle>
        </Grid2>
        <EquiposList equipos={equipos} />
      </Grid2>
    </section>
  )
}

const EquiposList = (props: { equipos: Array<Equipo> }) => {

  return (
    <Grid2 container size={{ xs: 12, md: 9 }} spacing={4}>
      {
        props.equipos.map(equipo => (
          <Grid2
            size={{ xs: 12, md: 5 }}
            key={equipo.documentId}
            sx={{
              zIndex: 2,
              height: 'fit-content',
              backgroundColor: '#fdfcfc',
              p: { xs: 1, md: 3 },
              borderRadius: 5
            }} >
            {
              equipo.logo && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STATIC_CONTENT}${equipo.logo?.url}`}
                  height={100}
                  width={100}
                  alt=''
                  unoptimized />
              )
            }
            <Typography variant='h5' mb={1}>{equipo.nombre}</Typography>
            <Typography>{equipo.descripcion}</Typography>
          </Grid2>
        ))
      }
    </Grid2>
  )
}