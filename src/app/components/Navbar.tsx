'use client'
import { AppBar, Box, Button, Drawer, Fade, IconButton, List, ListItem, ListItemText, Link as MuiLink, Toolbar, useScrollTrigger } from "@mui/material";
import Image from "next/image";
import { ReactNode, useCallback, useRef, useState } from "react";
import Link from "next/link";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


export default function Navbar() {
  const trigger = useScrollTrigger({ threshold: 100, disableHysteresis: true })
  const [openDrawer, setOpenDrawer] = useState(false);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  };
  return (
    <>
      <AppBar elevation={trigger ? 2 : 0} component='nav' sx={{ py: 1, backgroundColor: '#eef6fb', color: '#0b2332' }}>
        <Toolbar sx={{ alignItems: 'center' }}>
          <ConquiImageLink />
          <Box sx={{ ml: 2, display: { xs: 'none', md: 'block' } }}>
            {
              navItems.map((item, idx) => <NavBarLink key={idx} href={item.href}>{item.label}</NavBarLink>)
            }
          </Box>
          <DonateButton />
          <IconButton disableRipple sx={{ display: { xs: 'flex', md: 'none' }, ml: 2 }} onClick={() => setOpenDrawer(true)}>
            <MenuIcon sx={{ fontSize: 40 }} />
          </IconButton>

        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          anchor='right'
          open={openDrawer}
          PaperProps={{
            sx: {
              backgroundColor: '#eef6fb'
            }
          }}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: {
              xs: 'block',
              md: 'none'
            }
          }}
          onClose={() => setOpenDrawer(false)}>
          <Box sx={{ width: 250, p: 1, }}>
            <Box display='flex'>
              <IconButton disableRipple onClick={() => setOpenDrawer(false)} sx={{ ml: 'auto' }}>
                <CloseIcon sx={{ fontSize: 40 }} />
              </IconButton>

            </Box>
            <List>
              {
                navItems.map((item, idx) => (
                  <ListItem key={idx} component='a' href={item.href}>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: 600,
                        color: '#0f2f43'
                      }}
                    />
                  </ListItem>
                ))
              }
            </List>
          </Box >
        </Drawer >
      </nav >
      <div style={{ minHeight: '98px' }} />
      <Fade in={trigger} onClick={goToTop}>
        <IconButton
          sx={{
            color: 'whitesmoke',
            backgroundColor: '#485889',
            position: 'fixed',
            bottom: 10,
            right: 10,
            zIndex: 5,
            ':hover': {
              backgroundColor: '#485889'
            }
          }}>
          <KeyboardArrowUpIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Fade>
    </>
  )
}

const ConquiImageLink = () => {
  return (<Link href='/'>
    <Image
      src='conqui.svg' alt='Logo de Conquistando Sonrisas' width={75} height={75}
      style={{
        userSelect: 'none',
      }} />
  </Link>);
}


const DonateButton = () => {
  return (
    <Button
      size="large"
      variant="contained"
      startIcon={<FavoriteIcon />}
      sx={{
        backgroundColor: '#f2c736',
        color: '#210439',
        fontSize: 18,
        borderRadius: 10,
        marginLeft: 'auto',
        ':hover': {
          backgroundColor: '#e8b419'
        }
      }}>Donar</Button>

  )
}



const navItems = [{
  label: 'Nosotros',
  href: '/nosotros'
}, {
  label: '¿Qué hacemos?',
  href: '/que-hacemos'
}, {
  label: 'Eventos',
  href: '/eventos',
}, {
  label: 'Voluntariado',
  href: '/voluntariado'
}, {
  label: 'Transparencia',
  href: '/transparencia'
}]

type NavBarLinkProps = { href: string, children: ReactNode }
const NavBarLink = (props: NavBarLinkProps) => {
  return (
    <MuiLink
      component={Link}
      href={props.href}
      underline="none"
      fontWeight={600}
      variant="body1"
      pb={1}
      px={2}
      textAlign='center'
      sx={{
        position: 'relative',
        color: '#0f2f43',
        mx: .5,
        py: 1,
        px: 2,
        ':hover': {
          borderRadius: '25px',
          color: '#4051d4'
        },
      }}>
      {props.children}
    </MuiLink>
  )
}