import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Grid2, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Hero from "../components/Hero";
import { ExpandMore } from "@mui/icons-material";
import SectionTitle from "../components/SectionTitle";
import { getImpactoOfYearsWithApoyos } from "./services/apoyos";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Transparencia | Conquistando Sonrisas A.C.",
  description: "Conoce el impacto que hemos tenido"
};


export default async function TransparenciaPage() {
  const impacto = await getImpactoOfYearsWithApoyos();

  return (
    <main>
      <Hero
        title="Transparencia"
        desc="Conoce el impacto que hemos tenido 😊"
      />
      <Container sx={{ my: 6 }}>
        <SectionTitle>Solicita información de transparencia</SectionTitle>
        <Typography mb={2}>
          Si tienes alguna duda acerca de nuestros informes anuales o requieres más información puedes contactarnos.
          Si deseas conocer sobre la informaciòn financiera de Conquistando Sonrisas A.C,
          favor de mandar un correo a: <Link href={`mailto:${'procuracion@conquistandosonrisas.org'}`} target='_blank' color='conquiDarkBlue'>{'procuracion@conquistandosonrisas.org'} </Link>
          con tus datos de contacto.
        </Typography>
        <Box minHeight='500px'>
          {
            impacto && impacto.map((impactoAnual, itemIdx) => (
              <Accordion key={impactoAnual.documentId} defaultExpanded={itemIdx == 0} sx={{ backgroundColor: '#fbfdfe' }}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                >
                  <Typography variant="h5" fontWeight={600} fontSize='2.2em'>
                    {impactoAnual.anio}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid2 container spacing={3}>
                    <Grid2 size={{ xs: 12, md: 7 }}>
                      {impactoAnual.apoyos.length > 0 && (
                        <Box mb={2}>
                          <TableContainer component={Paper} variant='outlined'>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Apoyo</TableCell>
                                  <TableCell align="right">Monto</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {
                                  impactoAnual.apoyos.map((apoyo, idx) => (
                                    <TableRow key={`${impactoAnual.documentId}-${apoyo.documentId}`}>
                                      <TableCell>{apoyo.apoyo.nombre}</TableCell>
                                      <TableCell align="right">${Intl.NumberFormat('es-MX', { currency: 'MXN' }).format(apoyo.monto)}</TableCell>
                                    </TableRow>
                                  ))
                                }
                              </TableBody>
                            </Table>

                          </TableContainer>
                        </Box>
                      )}
                    </Grid2>
                    <Grid2 textAlign='center' size={{ xs: 12, md: 5 }}>
                      {
                        (impactoAnual.apoyosOtorgados > 0 && impactoAnual.beneficiados > 0) && (
                          <>
                            <Typography>Cantidad de apoyos otorgados</Typography>
                            <Typography fontWeight={600} fontSize='3rem' color='conquiDarkBlue.main'>{impactoAnual.apoyosOtorgados}</Typography>
                            <Typography>Impactando a</Typography>
                            <Typography fontWeight={600} fontSize='3rem' color='conquiDarkBlue.main'>{impactoAnual.beneficiados}</Typography>
                            <Typography>niños, niñas y adolescentes con <br /> diagnóstico de cáncer del Estado de Chihuahua</Typography>
                          </>
                        )
                      }
                    </Grid2>
                  </Grid2>
                  {
                    impactoAnual.informeAnualURL !== null && (
                      <Link href={impactoAnual.informeAnualURL} target='_blank'>Informe anual</Link>
                    )
                  }
                </AccordionDetails>
              </Accordion>
            ))
          }
        </Box>
      </Container>
    </main>
  )
}