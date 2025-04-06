import { Box, Button, Grid2, Typography } from "@mui/material";
import { Pacifico } from "next/font/google";
import localFont from 'next/font/local'
import floresAzules from '../../../../../public/flores_azules.png'
import floresAmarillas from '../../../../../public/flores_amarillas.png'
import Image from "next/image";
import { ArrowForward } from "@mui/icons-material";

const mikHaloo = localFont({
  src: '../../Mikhaloo.ttf',
  display: 'swap'
})


export default function BecomeAVoluntario() {

  return (
    <Grid2 container sx={{ backgroundColor: 'conquiLightBlue.main' }} height={300} justifyContent='space-around' mt={5}>
      <Grid2 size='grow' display={{ xs: 'none', md: 'flex' }} justifyContent='flex-end'>
        <Image src={floresAzules} height={175} width={400} alt='' />
      </Grid2>
      <Grid2 size={{ xs: 'grow', md: 3 }} display='flex' flexDirection='column' textAlign='center' justifyContent='center'>
        <Typography
          textAlign='center'
          fontWeight={600}
          mb={3}
          fontSize={30}>Quiero ser</Typography>
        <span className={mikHaloo.className} style={{ fontSize: '2.5em' }}>
          voluntario
        </span>
        <Button endIcon={<ArrowForward />} color="conquiDarkBlue" size="large" variant="contained" sx={{ width: 'fit-content', alignSelf: 'center', mt: 2, borderRadius: '25px' }}>Registro</Button>
      </Grid2>
      <Grid2 size='grow' display={{ xs: 'none', md: 'flex' }}>
        <Image src={floresAmarillas} height={175} width={400} alt='' style={{ alignSelf: 'flex-end' }} />
      </Grid2>
    </Grid2>
  )
}