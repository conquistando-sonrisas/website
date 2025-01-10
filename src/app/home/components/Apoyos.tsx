import { Box, Button, Grid2, IconButton, Paper, Typography } from "@mui/material"
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { ArrowForward } from "@mui/icons-material";

export default function ApoyosSection() {
  return (
    <Box component='section'>
      <Grid2 container justifyContent='space-evenly'>
        <Grid2 component={Paper} elevation={0} variant="outlined" py={2} px={4}>
          <Typography fontWeight={600} fontSize={14}  textTransform='uppercase' color='conquiYellow.dark'>¿Qué apoyos tenemos?</Typography>
          <VaccinesIcon sx={{ fontSize: 100, color: 'conquiLightBlue.dark' }} />
          <Typography fontSize={30} color='conquiDarkBlue.main' fontWeight={600} mt={1}>Estudios médicos</Typography>
          <Typography maxWidth='550px'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus, illo facilis. Quasi odio maiores laudantium voluptas cum. Cum ducimus vitae, exercitationem rerum dolorem porro obcaecati! Esse eius officiis minima provident.</Typography>
          <div style={{ marginLeft: 'auto' }}>
            <IconButton sx={{ backgroundColor: 'lightgray' }}>
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton sx={{ ml: 1, backgroundColor: 'lightgray' }}>
              <NavigateNextIcon />
            </IconButton>
          </div>
        </Grid2>
        <Grid2
          display='flex' justifyContent='center'
          flexDirection='column'
          component={Paper} elevation={0} variant="outlined" py={2} px={4} minWidth={'400px'}>
          <Typography fontSize={30} color='conquiDarkBlue.main' fontWeight={900}>
            Apoyamos a <br />
            más de ### niños
          </Typography>
          <Button endIcon={<ArrowForward />} variant="contained" sx={{
            maxWidth: '120px',
            borderRadius: '25px'
          }} color="conquiLightBlue">Ver más</Button>
        </Grid2>
      </Grid2>
    </Box>
  )
}