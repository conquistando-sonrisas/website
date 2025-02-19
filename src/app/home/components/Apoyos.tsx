'use client'

import { Box, Button, Grid2, Icon, IconButton, Paper, Step, StepContent, Stepper, Typography } from "@mui/material"
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ArrowForward } from "@mui/icons-material";
import { useCallback, useState } from "react";

export default function ApoyosSection() {
  return (
    <Grid2 container rowGap={2} columnGap={4} minHeight='300px' height='fit-content'>
      <Grid2
        size={{ xs: 12, md: 7 }}
        component={Paper}
        variant="elevation"
        elevation={0}
        py={{ xs: 2 }}
        px={{ md: 4, xs: 2 }}>
        <ApoyosCarousel />
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
          En el <Typography fontSize='inherit' fontWeight='inherit' component='span' color='conquiDarkBlue' >2024</Typography> apoyamos a <br />
          más de <Typography fontSize='inherit' fontWeight='inherit' component='span' color='conquiDarkBlue'>160</Typography> niños
        </Typography>
        <Button endIcon={<ArrowForward />} variant="contained" sx={{
          borderRadius: '25px'
        }} color="conquiLightBlue">Ver más</Button>
      </Grid2>
    </Grid2 >
  )
}

const apoyos = [{
  nombre: 'Estudios médicos',
  descripcion: 'Son exámenes y pruebas que se realizan para detectar enfermedades y problemas de salud, o para vigilarlos después de un diagnóstico',
  icon: 'Vaccines',
}, {
  nombre: 'Eventos recreativos',
  descripcion: 'Por medio del equipo de voluntariado se ofrecen varios eventos de esparcimiento, entre ellos nuestro campamento de verano, con la finalidad de fomentar la integración plena de estos niños a la sociedad, además de motivarlos a través del juego a continuar sus tratamientos médicos, fomentando su derecho al esparcimiento y a ser vistos como niños antes que como pacientes.',
  icon: 'Celebration'
}, {
  nombre: 'Apoyo en transporte terrestre y aéreo',
  descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet earum cum incidunt dicta aliquid, consequuntur, architecto eum consectetur porro vel et adipisci ad, ut harum saepe maxime hic sequi veritatis?',
  icon: 'Commute'
}]


const ApoyosCarousel = () => {
  const [activeStep, setActiveStep] = useState(0)

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
      console.log('PREV', prev)
      if (prev === 0) {
        return apoyos.length - 1;
      }
      return prev - 1;
    })
  }, []);

  const apoyo = apoyos[activeStep];

  return (
    <Box display='flex' flexDirection='column' height='100%' position='relative'>
      <Box overflow='scroll' flex={1}>
        <span style={{ fontSize: 100, color: '#5f869f' }} className='material-symbols-rounded'>{apoyo.icon}</span>
        <Typography style={{ lineClamp: 3 }} fontSize={26} color='conquiDarkBlue.dark' height='fit-content' fontWeight={600} mt={1}>{apoyo.nombre}</Typography>
        <Typography height='100px' maxHeight='100px' overflow='scroll'>{apoyo.descripcion}</Typography>
      </Box>

      <div style={{ display: 'flex', justifyContent: 'flex-end', justifySelf: 'flex-end', position: 'absolute', top: 5, right: 5 }}>
        <IconButton onClick={handlePrev} color='conquiDarkBlue' size="large">
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton onClick={handleNext} color='conquiDarkBlue' size="large">
          <NavigateNextIcon />
        </IconButton>
      </div>
    </Box>
  )
}