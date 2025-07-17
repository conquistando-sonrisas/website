import { Box, Container, Typography } from "@mui/material";
import RegistroMultiStepForm from "./components/MultiStepForm";
import SectionTitle from "@/app/(web)/components/SectionTitle";


export default function RegistroCarreraPage() {

  return (
    <Container style={{ minHeight: '85vh', paddingBottom: '10px', paddingLeft: '10px', paddingRight: '10px' }} maxWidth='lg'>
      <Box my={{ xs: 1, md: 3 }} mx={{ xs: 0, sm: 'auto' }}>
        <RegistroMultiStepForm />
      </Box>
    </Container>
  )
}