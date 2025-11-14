import { Box, Container, Typography } from "@mui/material";
import SectionTitle from "../components/SectionTitle";
import { MDXRemote } from "next-mdx-remote/rsc";


export default async function DonacionesLegalPage() {
  const donacionesLegalReq = await fetch(`${process.env.NEXT_PUBLIC_CMS_API}/donaciones-legal`)
  const donacionesLegalRes = await donacionesLegalReq.json();

  return (
    <main style={{ minHeight: '75vh' }}>
      <Container sx={{ my: 6 }}>
        <SectionTitle>Acerca de las donaciones</SectionTitle>
        <MDXRemote
          source={donacionesLegalRes.data.contenido}
          components={{
            p: props => <Typography mb={2}>{props.children}</Typography>,
            ol: props => <Box component='ol' ml={3} mb={2}>{props.children}</Box>,
            ul: props => <Box component='ul' ml={3} mb={2}>{props.children}</Box>,
            li: props => <li style={{ marginBottom: '5px' }}>{props.children}</li>
          }}
        />
      </Container>
    </main>
  )
}