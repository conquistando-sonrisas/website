import { MDXRemote } from "next-mdx-remote/rsc";
import { AvisoPrivacidad, StrapiSingleResponse } from "../app";
import { Box, Container, Typography } from "@mui/material";
import SectionTitle from "../components/SectionTitle";



export default async function AvisoPrivacidadPage() {
  const avisoReq = await fetch(`${process.env.NEXT_PUBLIC_CMS_API}/aviso-de-privacidad`);
  const avisoRes = await avisoReq.json() as StrapiSingleResponse<AvisoPrivacidad>;

  return (
    <main style={{ minHeight: '75vh' }}>
      <Container sx={{ my: 6 }}>
        <SectionTitle>Aviso de Privacidad</SectionTitle>
        <MDXRemote
          source={avisoRes.data.contenido}
          components={{
            p: props => <Typography mb={2}>{props.children}</Typography>,
            ul: props => <Box component='ul' ml={3} mb={2}>{props.children}</Box>,
            li: props => <li style={{ marginBottom: '5px' }}>{props.children}</li>
          }}
        />
      </Container>
    </main>
  )
}