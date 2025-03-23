import { Box, Container, Typography } from "@mui/material";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";
import { Novedad } from "@/app/app";

type PageParams = Promise<{ documentId: string }>

export default async function NovedadPage({ params }: { params: PageParams }) {
  const { documentId } = await params;

  // TODO: Throw error if documentId is not present
  if (!documentId) {
    return (
      <main>
        not found
      </main>
    )
  }

  // TODO: handle error when novedad is not published or not found
  const req = await fetch(`${process.env.NEXT_PUBLIC_CMS_API}/novedades/${documentId}?populate=*`);
  const { data: novedad } = await req.json();

  return (
    <main style={{ minHeight: '100vh' }}>
      <Box>
        <Box display='flex' justifyContent='center' position='relative'>
          <Image
            src={novedad.cover.url}
            width={1200}
            height={600}
            alt=''
            unoptimized
            style={{
              objectFit: 'cover',
              objectPosition: 'center center'
            }} />
        </Box>
        <Container sx={{ mt: -15, zIndex: 10, position: 'relative' }} maxWidth='lg'>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#f1f7fc',
            bottom: 0,
            left: 0,
            right: 0,
            py: 3
          }}>
            <div style={{ textAlign: 'center' }}>
              <Typography variant="h1" fontSize='2.2em' px={1} fontWeight={500}>{novedad.titulo}</Typography>
              <Typography mt={1}>{novedad.createdBy.firstname} {novedad.createdBy.lastname} • {
                new Date(novedad.publishedAt).toLocaleDateString('es-MX', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })
              }
              </Typography>
            </div>
          </Box>
          <Container maxWidth='md' sx={{ my: 5, px: { xs: 1 } }}>

            <MDXRemote
              source={novedad.contenido}
              components={{
                p: (props) => (<Typography {...props} mb={2}>{props.children}</Typography>),
                img: (props) => (
                  <Box component='span' position='relative' display='flex' justifyContent='center' flexDirection='column'>
                    <Image
                      src={props.src}
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
                )
              }}
            />
          </Container>
        </Container>
      </Box>
    </main>
  )
}


// TODO: handle errors
export async function generateMetadata(
  { params }: { params: PageParams },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { documentId } = await params;

  const req = await fetch(`${process.env.NEXT_PUBLIC_CMS_API}/novedades/${documentId}?fields[0]=titulo`);
  const res = await req.json();
  const novedad = res.data as Novedad;

  const prevImages = (await parent)?.openGraph?.images || []

  return {
    title: novedad.titulo,
    authors: [{
      name: `${novedad.createdBy.firstname} ${novedad.createdBy.lastname}`,
    }],
    openGraph: {
      images: [...prevImages]
    }
  }

}
