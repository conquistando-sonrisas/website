import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from "@mui/material";
import SectionTitle from "../components/SectionTitle";
import { ExpandMore } from "@mui/icons-material";
import { PreguntaFrecuente } from "../app";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function PreguntasFrecuentesPage() {
  const req = await fetch(`${process.env.NEXT_PUBLIC_CMS_API}/faqs`)
  const { data: preguntas = [] } = await req.json();

  return (<main style={{ minHeight: '80vh' }}>
    <Container sx={{ my: 3 }}>
      <SectionTitle>Preguntas Frecuentes</SectionTitle>
      {
        (preguntas as Array<PreguntaFrecuente>).map(frecuente => (
          <Accordion key={frecuente.documentId}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
            >
              <Typography variant="h5">{frecuente.pregunta}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 4 }}>
              <MDXRemote source={frecuente.respuesta} />
            </AccordionDetails>
          </Accordion>
        ))
      }
    </Container>
  </main>)
}