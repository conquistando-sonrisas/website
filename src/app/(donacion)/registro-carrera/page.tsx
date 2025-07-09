import { Box, Typography } from "@mui/material";
import RegistroMultiStepForm from "./components/RegistroMultiStepForm";
import SectionTitle from "@/app/(web)/components/SectionTitle";


export default function RegistroCarreraPage() {

  return (
    <main style={{ minHeight: '85vh', paddingBottom: '10px' }}>
      <Box my={3} mx={{ xs: 1, sm: 'auto' }} maxWidth='550px'>
        <RegistroMultiStepForm />
      </Box>
    </main>
  )
}