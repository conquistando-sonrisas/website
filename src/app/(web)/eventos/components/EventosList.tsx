import { Box, Container, Grid2, Pagination, Typography } from "@mui/material";
import { Evento, StrapiPagination } from "../../app";
import Image from "next/image";
import { grey } from "@mui/material/colors";
import Link from "next/link";


export default function EventosList(props: { eventos: Evento[], initialPagination: StrapiPagination }) {


  return (
    <Container sx={{ my: 3 }}>
      {
        props.eventos.map((evento) => (
          <EventoListItem key={evento.documentId} evento={evento} />
        ))
      }
      <Box display='flex' justifyContent='center'>
        <Pagination sx={{ my: 4 }} count={1} />
      </Box>
    </Container>
  )
}


const EventoListItem = ({ evento }: { evento: Evento }) => {

  return (
    <Grid2 container columnSpacing={4} rowSpacing={2} mb={8}>
      <Grid2 size={{ xs: 10, md: 4 }} mx='auto' position='relative' height='300px'>
        <Image
          alt=''
          src={evento.cover.formats.medium.url}
          fill
          style={{
            objectFit: 'cover',
            borderRadius: 10
          }} />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 8 }}>
        <Typography fontSize={20} fontWeight={600} color="conquiDarkBlue.dark">{
          evento.fechaInicio
            ? new Date(evento.fechaInicio).toLocaleDateString('es', eventoDateFormatOptions)
            : "Por definir"}</Typography>
        <Typography
          component={Link}
          href={`/eventos/${evento.documentId}`}
          fontSize={32}
          fontWeight={600}
          color='conquiDarkBlue.light'
          sx={{
            textDecoration: 'none',
            ':hover': {
              color: '#4051d4'
            }
          }}
        >{evento.nombre}</Typography>
        <Typography fontWeight={500} color={grey[800]}>{evento.ubicacion}</Typography>
        <Typography mt={3}>{evento.descripcion}</Typography>
      </Grid2>
    </Grid2>
  )
}



export const eventoDateFormatOptions: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'long',
  timeZone: 'utc'
};