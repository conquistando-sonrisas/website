'use client'
import { ConquiImageLink, GoToTopButton } from "@/app/(web)/components/Navbar"
import { AppBar, Toolbar, Typography, useScrollTrigger } from "@mui/material"


export const Navbar = () => {
  const trigger = useScrollTrigger({ threshold: 100, disableHysteresis: true })

  return (
    <>
      <AppBar elevation={trigger ? 2 : 0} component='nav' sx={{ py: 1, backgroundColor: '#eef6fb', color: '#0b2332' }}>
        <Toolbar sx={{ alignItems: 'center' }}>
          <ConquiImageLink />
          <Typography ml={2} variant="h1" fontSize={28} fontWeight={600} color='conquiDarkBlue.light'>Conquistando Sonrisas A.C.</Typography>
        </Toolbar>
      </AppBar>
      <div style={{ minHeight: '98px' }} />
      <GoToTopButton in={trigger} />
    </>
  )
}