import { Box, Container, Grid2 } from "@mui/material";
import DonacionForm from "./components/DonacionForm";
import Image from "next/image";
import DonacionesIcon from '../../../public/IconoDonaciones.png'
import SectionTitle from "../components/SectionTitle";


export default function DonarPage() {


  return (
    <Box component='main' sx={{ backgroundColor: 'conquiLightBlue.light' }}>
      <Container sx={{ py: { xs: 1, md: 4 } }}>
        <Grid2 container position='relative' height={{ xs: 'auto', md: '75vh' }} my={2} justifyContent={'center'}>
          <Grid2
            order={{ xs: 2, md: 1 }}
            position='relative'
            minHeight='300px'
            size={{ xs: 12, md: 6 }}
          >
            <Image
              unoptimized
              src='https://static-content-lccc.s3.us-east-1.amazonaws.com/Asset_17_d941fc204a.jpg'
              fill
              style={{
                objectFit: 'cover'
              }}
              alt=''
            />
          </Grid2>
          <Grid2
            order={{ xs: 1, md: 2 }}
            sx={{ backgroundColor: '#f1f7fc' }}
            size={{ xs: 12, md: 6 }}
            display='flex'
            justifyContent='center'
          >
            <DonacionForm
              elevation={0}
            />
          </Grid2>
          <Image
            src={DonacionesIcon}
            height={100}
            width={100}
            alt=''
            style={{
              zIndex: 3,
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: -40,
              marginInline: 'auto'
            }} />
        </Grid2>
      </Container>
    </Box>
  )
}