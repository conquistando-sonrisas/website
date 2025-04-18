import { Box, Link } from "@mui/material";
import { ContactoDetail } from "./ContactoDetails";


export default function DireccionSection() {

  return (
    <Box>
      <ContactoDetail icon='pin_drop'><Link href='#' target='_blank' color="conquiDarkBlue">Mezcaleros 4305, Burócrata Estatal, 31210 Chihuahua, Chih.</Link></ContactoDetail>
      <Box height='250px' bgcolor={'GrayText'} mt={2} ml={6} borderRadius={5}>

      </Box>
    </Box>
  )
}