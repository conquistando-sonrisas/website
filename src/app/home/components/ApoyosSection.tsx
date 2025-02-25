'use client'

import { Box, Button, Grid2, Icon, IconButton, Paper, Step, StepContent, Stepper, Typography } from "@mui/material"
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ArrowForward } from "@mui/icons-material";
import { useCallback, useState } from "react";

export interface Apoyo {
  nombre: string;
  descripcion: string;
  icono: string;
}

export interface ImpactoSummary {
  anio: number;
  apoyosOtorgados: number;
  beneficiados: number;
}

export default function Apoyos(props: { apoyos: Array<Apoyo>, impacto: ImpactoSummary }) {
  return (
    <Grid2 container rowGap={2} columnGap={4} minHeight='300px' height='fit-content'>
      <Grid2
        size={{ xs: 12, md: 7 }}
        component={Paper}
        variant="elevation"
        elevation={0}
        py={{ xs: 2 }}
        px={{ md: 4, xs: 2 }}>
        <ApoyosCarousel apoyos={props.apoyos} />
      </Grid2>
      <Grid2
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
        <Typography mb={2} fontSize={30} color='conquiLightBlue.dark' fontWeight={900} textAlign='center'>
          En el <Typography fontSize='inherit' fontWeight='inherit' component='span' color='conquiDarkBlue'>{props.impacto.anio}</Typography> apoyamos a <br />
          más de <Typography fontSize='inherit' fontWeight='inherit' component='span' color='conquiDarkBlue'>{props.impacto.beneficiados}</Typography> niños
        </Typography>
        <Button endIcon={<ArrowForward />} variant="contained" sx={{
          borderRadius: '25px'
        }} color="conquiLightBlue">Ver más</Button>
      </Grid2>
    </Grid2 >
  )
}


const ApoyosCarousel = (props: { apoyos: Array<Apoyo> }) => {
  const { apoyos } = props;
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = useCallback(() => {
    setActiveStep(prev => {
      if (prev === apoyos.length - 1) {
        return 0;
      }
      return prev + 1;
    })
  }, [])

  const handlePrev = useCallback(() => {
    setActiveStep(prev => {
      if (prev === 0) {
        return apoyos.length - 1;
      }
      return prev - 1;
    })
  }, []);

  const apoyo = apoyos.length > 0 ? apoyos[activeStep] : null;

  return (
    <Box display='flex' flexDirection='column' height='100%' position='relative'>
      {apoyo && (
        <Box overflow='scroll' flex={1}>
          <span style={{ fontSize: 100, color: '#5f869f', userSelect: 'none' }} className='material-symbols-rounded'>{apoyo.icono}</span>
          <Typography style={{ lineClamp: 3 }} fontSize={26} color='conquiDarkBlue.dark' height='fit-content' fontWeight={600} mt={1}>{apoyo.nombre}</Typography>
          <Typography height='100px' maxHeight='100px' overflow='scroll'>{apoyo.descripcion}</Typography>
        </Box>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', justifySelf: 'flex-end', position: 'absolute', top: 5, right: 5 }}>
        <IconButton onClick={handlePrev} color='conquiDarkBlue' size="large" disabled={apoyos.length == 0}>
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton onClick={handleNext} color='conquiDarkBlue' size="large" disabled={apoyos.length == 0}>
          <NavigateNextIcon />
        </IconButton>
      </div>
    </Box>
  )
}