'use client'

import { EventAvailable, Place } from "@mui/icons-material"
import { Box, Button, Typography, useScrollTrigger } from "@mui/material"
import { format, parse } from "date-fns";
import { useEffect, useLayoutEffect, useRef, useState } from "react";


export default function EventoDetails({ fechaInicio, horaInicio, ubicacion }: { fechaInicio: string | null, horaInicio: string | null, ubicacion: string | null }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const trigger = useScrollTrigger({ threshold: 630, disableHysteresis: true })
  const [initialPosition, setInitialPosition] = useState<null | { x: number, y: number }>(null)
  const parsedFechaInicio = fechaInicio ? new Date(fechaInicio) : null;
  const parsedHoraInicio = horaInicio ? parse(horaInicio, 'H:m:s', new Date()) : null;

  const formattedFechaInicio = parsedFechaInicio
    ? parsedFechaInicio.toLocaleDateString('es', { timeZone: 'utc', weekday: 'long', day: 'numeric', year: 'numeric', month: 'long' })
    : 'Por definir';
  const formattedHoraInicio = parsedHoraInicio
    ? format(parsedHoraInicio, 'h:mm a')
    : 'Por definir';

  useLayoutEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setInitialPosition({ x: rect.x, y: rect.y })
    }
  }, [])

  return (
    <Box
      ref={ref}
      bgcolor='conquiLightBlue.50'
      width={{ xs: 'fit-parent', md: '330px', lg: 'fit-content' }}
      borderRadius={3}
      p={3}
      {...(trigger && {
        position: { md: 'fixed' },
        top: { md: 120 },
        left: { md: initialPosition?.x }
      })}
    >
      <Box display='flex' flexDirection='row' alignItems='center' columnGap={3}>
        <EventAvailable sx={{ fontSize: 32, color: 'conquiDarkBlue.dark' }} />
        <Typography fontWeight={500}> {formattedFechaInicio} • {formattedHoraInicio}</Typography>
      </Box>
      {ubicacion && (
      <Box display='flex' flexDirection='row' alignItems='center' columnGap={3} mt={3}>
        <Place sx={{ fontSize: 32, color: 'conquiDarkBlue.dark' }} />
        <Typography fontWeight={500}>{ubicacion}</Typography>
      </Box>
      )}
    </Box>
  )
}