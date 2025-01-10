import { Box, Grid2, Paper, Typography } from "@mui/material"
const HeroSection = () => {
  return (
    <Grid2 component='section' container height='75vh' sx={{
      background: 'linear-gradient(149deg, rgba(15,16,40,1) 0%, rgba(38,68,93,1) 46%, rgba(52,199,221,1) 100%)'
    }}>
      <Grid2 display="flex" justifyContent="center" alignItems="center">
        <Box component='section' ml={10} maxWidth='600px'>
          <Typography variant="h1" mb={2} fontWeight={600} fontSize={50} color='white'>
            <span style={{ color: 'white', fontStyle: 'italic' }}>Sé el cambio</span> que quieres <br />
            ver en el mundo
          </Typography>
          <Typography sx={{ wordBreak: 'break-word' }} color='white'>
            Somos una asociación que vela por el bienestar emocional y funcional
            de niños, niñas y adolescentes con diagnóstico de cáncer del estado de
            Chihuahua
          </Typography>
        </Box>
      </Grid2>
      <Grid2 display='flex' justifyContent='center' alignItems='center' offset={{ lg: 4 }}>
        <Box height='500px' width='400px' component={Paper}>
          <Typography m={3} fontSize={32} fontWeight={600} color="conquiDarkBlue.dark">
            Formulario para donaciones
          </Typography>
        </Box>
      </Grid2>
    </Grid2>
  )
}


export default HeroSection;