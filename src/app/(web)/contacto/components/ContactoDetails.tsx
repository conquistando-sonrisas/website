'use client'

import { ExpandMore } from "@mui/icons-material";
import { Box, Button, IconButton, Link, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import HorariosSection from "./HorariosSection";
import DireccionSection from "./DireccionSection";
import { Contacto } from "../../app";


export default function ContactoDetails({ detalles }: { detalles: Contacto }) {

  return (
    <Stack direction='column' rowGap={4}>
      <ContactoDetail icon='call'>{detalles.telefono}</ContactoDetail>
      <ContactoDetail icon='mail'><Link href={`mailto:${detalles.correo}`} target='_blank' color='conquiDarkBlue'>{detalles.correo}</Link></ContactoDetail>
      <HorariosSection horarios={detalles.horarios} />
      <DireccionSection coordenadas={detalles.coordenadas} direccion={detalles.direccion} />
    </Stack>
  )
}


export const ContactoDetail = ({ icon, children }: { icon: string, children: ReactNode }) => {

  return (
    <Box display='flex'>
      <Box
        component='span'
        sx={{
          fontSize: 30,
          color: 'conquiDarkBlue.dark',
          userSelect: 'none',
          mr: 2
        }}
        className='material-symbols-outlined'>{icon}</Box>
      <Typography alignItems={'center'}>{children}</Typography>
    </Box>
  )
}