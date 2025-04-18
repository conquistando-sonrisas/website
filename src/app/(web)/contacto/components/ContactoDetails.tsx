'use client'

import { ExpandMore } from "@mui/icons-material";
import { Box, Button, IconButton, Link, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import HorariosSection from "./HorariosSection";
import DireccionSection from "./DireccionSection";


export default function ContactoDetails() {

  return (
    <Stack direction='column' rowGap={4}>
      <ContactoDetail icon='call'>614 197 5785</ContactoDetail>
      <ContactoDetail icon='mail'><Link href='/' target='_blank' color='conquiDarkBlue'>operaciones@conquistandosonrisas.org</Link></ContactoDetail>
      <HorariosSection />
      <DireccionSection />
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