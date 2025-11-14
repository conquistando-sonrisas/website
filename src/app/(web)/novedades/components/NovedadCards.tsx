import { Box, Grid2, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ConquiLink from "../../components/Link";
import { Novedad } from "../../app";
import { grey } from "@mui/material/colors";


export function MainNovedadCard({ novedad }: { novedad: Novedad }) {
  return (
    <Grid2 container component='article'>
      <Grid2 size={{ xs: 12, md: 7 }}
        position='relative'
        minHeight={{ xs: '200px', md: '500px' }}>
        <Link href={`/novedades/${novedad.documentId}`}>
          <Image
            src={`${process.env.NEXT_PUBLIC_STATIC_CONTENT}${novedad.cover.url}`}
            alt={novedad.titulo}
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </Link>
      </Grid2>
      <Grid2
        display='flex'
        flexDirection='column'
        justifyContent='center'
        size={{ xs: 11, sm: 9, md: 5 }}
        mx={'auto'}
        mt={{ xs: -10, md: 0 }}
        px={{ xs: 2, md: 5 }}
        py={{ xs: 5, md: 10 }}
        sx={{
          backgroundColor: '#fbfdfe',
          position: 'relative'
        }}>
        <Typography variant='h2'>
          <ConquiLink href={`/novedades/${novedad.documentId}`} sx={{ fontWeight: 500, textAlign: 'center', fontSize: { xs: 24, md: 30 } }}>
            {novedad.titulo}
          </ConquiLink>
        </Typography>
        <NovedadCredits autor={novedad.autor} publishedAt={novedad.publishedAt} />
        <Typography mt={2}>
          {novedad.resumen}
        </Typography>
        <NovedadTipo tipo={novedad.tipo} />
      </Grid2>
    </Grid2>
  )
}



export function SecondaryNovedadCard({ novedad }: { novedad: Novedad }) {
  return (
    <Grid2 container component='article' position='relative' >
      <Grid2 size={{ xs: 12, md: 6 }} minHeight={{ xs: '200px', md: '300px' }}>
        <Link href={`/novedades/${novedad.documentId}`}>
          <Image src={`${process.env.NEXT_PUBLIC_STATIC_CONTENT}${novedad.cover.formats.medium.url}`} alt='' fill style={{
            maxHeight: '300px',
            objectFit: 'cover'
          }} />
        </Link>
      </Grid2>
      <Grid2
        size={{ xs: 11, sm: 9, md: 11 }}
        mx={'auto'}
        mt={{ xs: -10, sm: -4, md: -15 }}
        pt={5}
        pb={3}
        px={2}
        minHeight='fit-content'
        height={{ xs: 'fit-content', md: '270px' }}
        sx={{
          backgroundColor: '#fbfdfe',
          position: 'relative'
        }}>
        <Typography variant='h2'>
          <ConquiLink href={`/novedades/${novedad.documentId}`} sx={{ fontWeight: 500, textAlign: 'center', fontSize: 24 }}>
            {novedad.titulo}
          </ConquiLink>
        </Typography>
        <NovedadCredits autor={novedad.autor} publishedAt={novedad.publishedAt} />
        <Typography mt={1}>{novedad.resumen}</Typography>
        <NovedadTipo tipo={novedad.tipo} />
      </Grid2>
    </Grid2>
  )
}



export function NovedadCard({ novedad }: { novedad: Novedad }) {

  return (
    <Grid2 container component='article' position='relative' >
      <Grid2 size={{ xs: 12, md: 6 }} minHeight={{ xs: '200px', md: '200px' }}>
        <Link href={`/novedades/${novedad.documentId}`}>
          <Image src={`${process.env.NEXT_PUBLIC_STATIC_CONTENT}${novedad.cover.formats.medium.url}`} alt='' fill style={{
            maxHeight: '225px',
            objectFit: 'cover'
          }} />
        </Link>
      </Grid2>
      <Grid2 size={{ xs: 11, sm: 9, md: 11 }}
        mx={'auto'}
        mt={{ xs: -10, sm: -4, md: -10 }}
        pt={5}
        pb={3}
        px={2}
        minHeight='fit-content'
        height={{ xs: 'fit-content', md: '180px' }}
        maxHeight={{ md: '250px' }}
        sx={{
          backgroundColor: '#fbfdfe',
          position: 'relative'
        }}>
        <Typography variant='h2'>
          <ConquiLink href={`/novedades/${novedad.documentId}`} sx={{ fontWeight: 500, textAlign: 'center', fontSize: 24 }}>
            {novedad.titulo}
          </ConquiLink>
        </Typography>
        <NovedadCredits autor={novedad.autor} publishedAt={novedad.publishedAt} />
        <Typography mt={1} display={{ md: 'none', xs: 'block' }}>{novedad.resumen}</Typography>
        <NovedadTipo tipo={novedad.tipo} />

      </Grid2>
    </Grid2>
  )
}


export function NovedadCredits(props: { autor: string, publishedAt: string }) {
  const { publishedAt, autor } = props;
  return (
    <>
      <Typography textAlign='center' mt={1} color={grey[800]}>{autor} • {
        new Date(publishedAt).toLocaleDateString('es-MX', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      }
      </Typography>
    </>
  )
}

const NovedadTipo = ({ tipo }: { tipo: string }) => {
  return (
    <Box
      component='span'
      sx={{
        zIndex: 10,
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'conquiYellow.main',
        color: 'conquiDarkBlue.light',
        maxWidth: 'fit-content',
        py: .1,
        px: .4,
        borderRadius: 1,
        userSelect: 'none'
      }}>
      <Typography variant="body2">
        {tipo}
      </Typography>
    </Box>
  )
}