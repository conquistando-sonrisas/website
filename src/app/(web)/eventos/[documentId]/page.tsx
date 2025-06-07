import { Box, Button, Container, Grid2, IconButton, Stack, Typography } from "@mui/material";
import { Evento, StrapiSingleResponse, WithDocumentIdPathParam } from "../../app";
import qs from 'qs';
import { eventoDateFormatOptions } from "../components/EventosList";
import Image from "next/image";
import HeartIcon from '../../../../../public/heart_conqui_icon.png';
import PlaceIcon from '@mui/icons-material/Place';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { format, parse } from "date-fns";
import { grey } from "@mui/material/colors";
import { Email, LinkedIn } from "@mui/icons-material";
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { MDXRemote } from "next-mdx-remote/rsc";
import LinkIcon from '@mui/icons-material/Link';
import FixedEventoDetails from "./components/FixedEventoDetails";



export default async function EventoPage({ params }: WithDocumentIdPathParam) {
  const { documentId } = await params;

  const eventoReq = await fetch(`${process.env.NEXT_PUBLIC_CMS_API}/eventos/${documentId}?populate[0]=cover`)
  const eventosRes = await eventoReq.json() as StrapiSingleResponse<Evento>;
  const evento = eventosRes.data;

  return (
    <main style={{ minHeight: '100vh', }}>
      <Box position='relative' maxWidth='900px' minHeight='470px' mx='auto' mt={3}>
        <Image
          alt=''
          src={`${process.env.NEXT_PUBLIC_STATIC_CONTENT}${evento.cover.url}`}
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: 10
          }}
        />
        <Image
          src={HeartIcon}
          height={65}
          width={65}
          alt=''
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
          }}
        />
      </Box>
      <Container maxWidth='xl' sx={{ my: 6, minHeight: 'fit-content', }}>
        <Typography fontSize={20} fontWeight={600} color="conquiDarkBlue.dark">{
          evento.fechaInicio
            ? new Date(evento.fechaInicio).toLocaleDateString('es', eventoDateFormatOptions)
            : 'Por definir'
        }</Typography>
        <Typography fontSize={38} fontWeight={500} mb={3}>{evento.nombre}</Typography>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 8 }} order={{ xs: 2, md: 1 }}>
            <Typography>{evento.descripcion}</Typography>
            <Typography mt={2} mb={1} variant="h3" fontSize={22} fontWeight={500}>Compartir</Typography>
            <Stack direction='row' columnGap={1} mb={5}>
              <IconButton size="large" color="conquiDarkBlue">
                <FacebookIcon fontSize="inherit" />
              </IconButton>
              <IconButton size="large" color="conquiDarkBlue">
                <XIcon fontSize="inherit" />
              </IconButton>
              <IconButton size="large" color="conquiDarkBlue">
                <LinkedIn fontSize="inherit" />
              </IconButton>
              <IconButton size="large" color="conquiDarkBlue">
                <Email fontSize="inherit" />
              </IconButton>
              <IconButton size="large" color="conquiDarkBlue">
                <LinkIcon fontSize="inherit" />
              </IconButton>
            </Stack>
            <MDXRemote
              components={{
                ClientComponent: (props) => (<pre>{JSON.stringify(props.images, null, 2)}</pre>),
                h2: ({ children, ...props }) => (<Typography variant="h2" fontSize={28} fontWeight={500} mt={4} mb={2} {...props}>{children}</Typography>),
                p: ({ children, ...props }) => (<Typography {...props} mb={2}>{children}</Typography>)
              }}
              source={evento.contenido}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }} order={{ xs: 1, md: 2 }}>
            <FixedEventoDetails
              horaInicio={evento.horaInicio}
              fechaInicio={evento.fechaInicio}
              ubicacion={evento.ubicacion}
            />
          </Grid2>
        </Grid2>
      </Container>
    </main>
  )
}