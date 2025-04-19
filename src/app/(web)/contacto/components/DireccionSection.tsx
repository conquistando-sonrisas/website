'use client'

import { Box, CircularProgress, Link } from "@mui/material";
import { ContactoDetail } from "./ContactoDetails";
import dynamic from "next/dynamic";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const LazyMap = dynamic(() => import('../../components/MapWithMarker'), {
  ssr: false,
  loading: () => <CircularProgress />
})


export default function DireccionSection({ direccion, coordenadas }: { direccion: string, coordenadas: { longitud: number, latitud: number } }) {
  const { longitud, latitud } = coordenadas;

  return (
    <Box>
      <ContactoDetail icon='pin_drop'>{direccion}</ContactoDetail>
      {/* https://developers.google.com/maps/documentation/urls/get-started#directions-action */}
      <Link display='flex' alignItems='center' ml={6} href={`https://www.google.com/maps/dir/?api=1&destination=${latitud}%2c${longitud}`} target='_blank' color="conquiDarkBlue">
        Cómo llegar <OpenInNewIcon sx={{ ml: .5 }} fontSize="small" />
      </Link>
      <Box mt={2} position='relative' height='300px' overflow='hidden' borderRadius={3} ml={5}>
        <LazyMap latitud={latitud} longitud={longitud} popupMessage="Oficinas Conquistando Sonrisas A.C." />
      </Box>
    </Box>
  )
}