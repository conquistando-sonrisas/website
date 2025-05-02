import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Grid2, Link, Typography } from "@mui/material";
import Hero from "../components/Hero";
import { ImpactoApoyo, ImpactoGeneral } from "../app";
import { ExpandMore } from "@mui/icons-material";
import SectionTitle from "../components/SectionTitle";



export default async function TransparenciaPage() {
  const impactos = new Map();

  const impactoApoyosReq = await fetch(`${process.env.NEXT_PUBLIC_CMS_API}/impacto-apoyos?populate=*`)
  const impactoApoyoRes = await impactoApoyosReq.json()
  const impactoApoyos = impactoApoyoRes.data as Array<ImpactoApoyo>;
  const apoyos = Object.groupBy(impactoApoyos, ({ anio }) => anio)

  for (const anio in apoyos) {
    impactos.set(anio, { anio, apoyos: apoyos[anio], })
  }

  const impactosAnualesReq = await fetch(`${process.env.NEXT_PUBLIC_CMS_API}/impactos-generales?populate=*`)
  const impactosAnualesRes = await impactosAnualesReq.json();
  const impactosAnuales = impactosAnualesRes.data as Array<ImpactoGeneral>;
  const anuales = Object.groupBy(impactosAnuales, ({ anio }) => anio)

  for (const anio in anuales) {
    const impactoAnual = anuales[anio] as any;
    if (impactos.has(anio)) {
      const currValue = impactos.get(anio);
      impactos.set(anio, { ...currValue, anual: impactoAnual[0] })
      continue;
    }
    impactos.set(anio, { anual: impactoAnual })
  }

  const impactosArr = [] as any[];

  for (const [_, value] of impactos) {
    impactosArr.push(value)
  }

  const sortedImpactos = impactosArr.sort((a, b) => b.anio - a.anio)

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
            sortedImpactos.map((item, itemIdx) => (
              <Accordion key={item.anio} defaultExpanded={itemIdx == 0} sx={{ backgroundColor: '#fbfdfe' }}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                >
                  <Typography variant="h5" fontWeight={600} fontSize='2.2em'>
                    {item.anio}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid2 container spacing={3}>
                    <Grid2 size={{ xs: 12, md: 7 }}>
                      <Typography variant="h6">Apoyos</Typography>
                      <Box mb={2}>
                        {
                          (item.apoyos as any[]).map((apoyo, idx) => (
                            <Typography key={idx} lineHeight='2em'>
                              - {apoyo.apoyo.nombre}
                              <Box component='span' fontSize='1.2rem' fontWeight={600} color='conquiDarkBlue.main'> ${Intl.NumberFormat('es-MX', { currency: 'MXN' }).format(apoyo.monto)}</Box>
                            </Typography>
                          ))
                        }
                      </Box>
                      {
                        (item.anual.informeAnual as any) !== null && (
                          <Link href={item.anual.informeAnual?.url} target='_blank'>Informe anual</Link>
                        )
                      }
                    </Grid2>
                    <Grid2 textAlign='center' size={{ xs: 12, md: 5 }}>
                      <Typography>Cantidad de apoyos otorgados</Typography>
                      <Typography fontWeight={600} fontSize='3rem' color='conquiDarkBlue.main'>{item.anual.apoyosOtorgados}</Typography>
                      <Typography>Impactando a</Typography>
                      <Typography fontWeight={600} fontSize='3rem' color='conquiDarkBlue.main'>{item.anual.beneficiados}</Typography>
                      <Typography>niños, niñas y adolescentes con <br /> diagnóstico de cáncer del Estado de Chihuahua</Typography>
                    </Grid2>
                  </Grid2>
                </AccordionDetails>
              </Accordion>
            ))
          }
        </Box>
      </Container>
    </main>
  )
}