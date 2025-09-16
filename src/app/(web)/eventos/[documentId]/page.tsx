import { Box, Button, CircularProgress, Container, Grid2, IconButton, Link, Stack, Typography } from "@mui/material";
import { Evento, StrapiPaginatedResponse, StrapiSingleResponse, WithDocumentIdPathParam } from "../../app";
import qs from 'qs';
import { eventoDateFormatOptions } from "../components/EventosList";
import Image from "next/image";
import HeartIcon from '../../../../../public/heart_conqui_icon.png';
import { MDXRemote } from "next-mdx-remote/rsc";
import FixedEventoDetails from "./components/FixedEventoDetails";
import dynamic from "next/dynamic";
import { Metadata, ResolvingMetadata } from "next";

const ShareableLinksComponent = dynamic(() => import("../components/ShareableLinks"))


export const revalidate = 0
export const dynamicParams = true

export async function generateStaticParams() {
  const eventosReq = await fetch(`${process.env.NEXT_PUBLIC_CMS_API}/eventos?fields[0]=nombre`);
  const eventos = await eventosReq.json() as StrapiPaginatedResponse<Evento>;
  return eventos.data.map(evento => ({ documentId: evento.documentId }));

}

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
          unoptimized
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
            <ShareableLinksComponent />
            <MDXRemote
              components={{
                h2: ({ children, ...props }) => (<Typography variant="h2" fontSize={28} fontWeight={500} mt={4} mb={2} {...props}>{children}</Typography>),
                p: ({ children, ...props }) => (<Typography {...props} mb={2}>{children}</Typography>),
                img: (props) => (
                  <Box component='span' position='relative' display='flex' justifyContent='center' flexDirection='column'>
                    <Image
                      src={`${props.src.startsWith('http') ? props.src : `${process.env.NEXT_PUBLIC_STATIC_CONTENT}${props.src}`}`}
                      alt={props.alt || ''}
                      unoptimized
                      width={800}
                      height={450}
                      style={{
                        display: 'block',
                        objectFit: 'contain',
                        width: 'auto',
                        height: '100%',
                        maxHeight: '450px'
                      }}
                    />
                    {props.title && (
                      <Typography textAlign='center' display='block' mt={1} variant="caption">{props.title}</Typography>
                    )}
                  </Box>
                ),
                ol: props => <Box component='ol' ml={3} mb={2}>{props.children}</Box>,
                ul: props => <Box component='ul' ml={3} mb={2}>{props.children}</Box>,
                li: props => <li style={{ marginBottom: '5px' }}>{props.children}</li>
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

export async function generateMetadata(
  { params }: WithDocumentIdPathParam,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { documentId } = await params;
  const eventoParams = qs.stringify({
    fields: ['nombre', 'descripcion'],
    populate: 'cover'
  }, {
    encodeValuesOnly: true
  })
  const eventoReq = await fetch(`${process.env.NEXT_PUBLIC_CMS_API}/eventos/${documentId}?${eventoParams}`)
  const eventosRes = await eventoReq.json() as StrapiSingleResponse<Evento>;
  const evento = eventosRes.data;

  const prevImages = (await parent)?.openGraph?.images || []
  const image = {
    url: `${process.env.NEXT_PUBLIC_STATIC_CONTENT}${evento.cover.formats.small.url}`,
    width: evento.cover.formats.small.width,
    height: evento.cover.formats.small.height
  }
  return {
    title: evento.nombre,
    authors: [{
      name: 'Conquistando Sonrisas A.C.'
    }],
    openGraph: {
      description: evento.descripcion,
      images: [...prevImages, {
        ...image
      }]
    }
  }
}