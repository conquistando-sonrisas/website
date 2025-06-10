import { Box, Button, Grid2, Icon, IconButton, Paper, Step, StepContent, Stepper, Typography } from "@mui/material"
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ArrowForward } from "@mui/icons-material";
import Link from "next/link";
import ApoyosList from "./ApoyosList";
import qs from 'qs';
import { Media } from "../../app";


export interface Apoyo {
  nombre: string;
  descripcion: string;
  icon: Media
}

export interface ImpactoSummary {
  anio: number;
  apoyosOtorgados: number;
  beneficiados: number;
}

export default async function Apoyos() {
  const impactosParams = qs.stringify({
    sort: ['anio:desc'],
    pagination: {
      page: 1,
      pageSize: 1
    }
  }, { encodeValuesOnly: true })
  const impactoReq = fetch(`${process.env.NEXT_PUBLIC_CMS_API}/impactos-generales?${impactosParams}`)

  const apoyosParams = qs.stringify({
    sort: ['publishedAt:asc'],
    pagination: {
      page: 1,
      pageSize: 6
    },
    populate: ['icon']
  }, { encodeValuesOnly: true })
  const apoyosReq = fetch(`${process.env.NEXT_PUBLIC_CMS_API}/apoyos?${apoyosParams}`)
  const [impactoRes, apoyosRes] = await Promise.all([impactoReq, apoyosReq])
  let [impacto, apoyos] = await Promise.all([impactoRes.json(), apoyosRes.json()])
  impacto = impacto.data[0]

  return (
    <Grid2 container rowGap={2} columnGap={4} minHeight='300px' height='fit-content'>
      <Grid2
        size={{ xs: 12, md: 8 }}
        component={Paper}
        variant="elevation"
        sx={{ backgroundColor: '#fbfdfe' }}
        elevation={0}
        py={{ xs: 2 }}
        px={{ md: 4, xs: 2 }}>
        <ApoyosList apoyos={apoyos.data} />
      </Grid2>
      <Grid2
        bgcolor='#fbfdfe'
        size={{ md: 'grow', xs: 12 }}
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        component={Paper}
        elevation={0}
        variant="elevation"
        py={{ xs: 2 }}
        px={{ md: 4, xs: 2 }}>
        <Typography mb={2} fontSize={30} color='conquiDarkBlue.dark' fontWeight={900} textAlign='center'>
          En el <Typography fontSize='inherit' fontWeight='inherit' component='span' color='conquiDarkBlue'>{impacto.anio}</Typography> apoyamos a <br />
          más de <Typography fontSize='inherit' fontWeight='inherit' component='span' color='conquiDarkBlue'>{impacto.beneficiados}</Typography> niños
        </Typography>
        <Button
          LinkComponent={Link}
          href="/transparencia"
          endIcon={<ArrowForward />} variant="contained" sx={{
            borderRadius: '25px'
          }}
          color="conquiDarkBlue">Ver más</Button>
      </Grid2>
    </Grid2 >
  )
}