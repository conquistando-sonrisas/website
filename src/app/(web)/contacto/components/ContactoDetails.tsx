'use client'

import { ExpandMore } from "@mui/icons-material";
import { Box, Button, IconButton, Link, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import HorariosSection from "./HorariosSection";
import DireccionSection from "./DireccionSection";
import { Contacto } from "../../app";
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';


export default function ContactoDetails({ detalles }: { detalles: Contacto }) {
  return (
    <Stack direction='column' rowGap={4}>
      <ContactoDetail Icon={<CallIcon />}>{detalles.telefono}</ContactoDetail>
      <ContactoDetail Icon={<EmailIcon />}><Link href={`mailto:${detalles.correo}`} target='_blank' color='conquiDarkBlue'>{detalles.correo}</Link></ContactoDetail>
      <HorariosSection horarios={detalles.horarios} />
      <DireccionSection coordenadas={detalles.coordenadas} direccion={detalles.direccion} />
    </Stack>
  )
}


export const ContactoDetail = ({ Icon, children }: { Icon: ReactNode, children: ReactNode }) => {

  return (
    <Box display='flex' color={'conquiDarkBlue.light'}>
      {Icon}
      <Typography ml={1.3} alignItems={'center'}>{children}</Typography>
    </Box>
  )
}