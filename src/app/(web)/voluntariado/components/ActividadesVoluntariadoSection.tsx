import { Actividad } from "@/app/(web)/app";
import SectionTitle from "@/app/(web)/components/SectionTitle";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";


export default async function ActividadesVoluntariadoSection() {
  const req = await fetch(`${process.env.NEXT_PUBLIC_CMS_API}/actividades?populate=*&pagination[pageSize]=4`)
  const res = await req.json();
  const actividades = res.data as Array<Actividad>;

  return (<section>
    <SectionTitle sx={{ textAlign: 'center' }}>
      ¿Qué hace un voluntario en Conqui?
    </SectionTitle>
    <Stack
      mt={5}
      direction={{ xs: 'column', md: 'row' }}
      spacing={2}
      justifyContent='space-around'
      alignItems={{ xs: 'center', md: 'stretch' }}>
      {
        actividades.map((actividad, idx) => (
          <Box
            key={actividad.documentId}
            sx={{
              width: '280px',
              borderRadius: '15px',
              zIndex: 3,
              transform: { md: `rotate(${idx % 2 == 0 ? -9 : 9}deg)` }
            }}>
            <Image
              unoptimized
              src={`${process.env.NEXT_PUBLIC_STATIC_CONTENT}${actividad.foto.url}`}
              alt=''
              height={250}
              width={250}
              style={{
                objectFit: 'cover',
                minHeight: '200px',
                height: '300px',
                width: '100%',
                borderRadius: '10px'
              }} />
            <Typography fontSize={24} textAlign='center' color='conquiDarkBlue.light'>
              {actividad.actividad}
            </Typography>
          </Box>
        ))
      }
    </Stack>
  </section>)
}