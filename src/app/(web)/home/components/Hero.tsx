'use client'
import {
  Box, Button, FormControl,
  Grid2, InputAdornment, InputLabel, OutlinedInput,
  Paper, Stack, Tab, Tabs,
  ToggleButton, ToggleButtonGroup, Typography
} from "@mui/material"
import Image from "next/image";
import conquiKid from '../../../../public/conqui_kid.png'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ReactNode, SyntheticEvent, useCallback, useState } from "react";
import styled from "@emotion/styled";
import { TabContext, TabPanel } from "@mui/lab";
import localFont from 'next/font/local'
import DonacionForm from "@/app/(donacion)/components/DonacionForm";


const mikHaloo = localFont({
  src: '../../Mikhaloo.ttf',
  display: 'swap'
})


const HeroSection = (props: { conquiKidSrc: string }) => {
  return (
    <Grid2 component='section' container height='75vh' sx={{
      background: 'linear-gradient(145deg, rgba(136,147,228,1) 0%, rgba(136,192,228,1) 100%)',
      maxHeight: '75vh',
      px: { md: 2, xs: 0 }
    }}>
      <Grid2
        display="flex"
        justifyContent="center"
        alignItems="center"
        size={{ xs: 12, md: 7 }} sx={{ position: 'relative', height: 'inherit' }}>
        <Image
          src={props.conquiKidSrc}
          height={0}
          width={0}
          layout="fill"
          style={{ objectFit: 'cover' }}
          alt=""
        />
        <Typography
          textAlign='center'
          fontWeight={600}
          sx={{
            backgroundColor: '#fbfdfe',
            color: 'conquiDarkBlue.light',
            position: 'absolute',
            bottom: 30,
            p: 2,
            mx: 3,
            borderRadius: { xs: 5, md: 15 },
            fontSize: { xs: 30, sm: 40, lg: 50 },
          }}>Porque una <span className={mikHaloo.className} style={{ fontSize: '.7em' }}>sonrisa</span> lo puede todo</Typography>
      </Grid2>
      <Grid2
        display={{ xs: 'none', md: 'flex' }}
        justifyContent='center'
        alignItems='center'
        size={{ xs: 12, md: 5 }}
      >
        <DonacionForm />
      </Grid2>
    </Grid2>
  )
}

export default HeroSection;