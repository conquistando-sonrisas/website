import { Box, Link as MuiLink, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { ReactNode } from "react";
import Link from "next/link";


export default function Navbar() {
  return (<Stack
    component='nav'
    direction='row'
    pt={2}
    px={4}
    height='5rem'
    columnGap={3}
    position='sticky'
    sx={{ backgroundColor: 'white' }}
  >
    <Link href='/'>
      <Image src='conqui.svg' alt='Conquistando Sonrisas logo' width={100} height={100} />
    </Link>
    <ol style={{
      display: 'flex',
      justifyContent: 'flex-start',
      columnGap: '3rem',
      listStyle: 'none',
      flex: 1,
      marginTop: '1em'
    }}>
      <li><NavBarLink href="/nosotros">Nosotros</NavBarLink></li>
      <li><NavBarLink href="#">Transparencia</NavBarLink></li>
      <li><NavBarLink href="#">Eventos</NavBarLink></li>
      <li><NavBarLink href="#">Contacto</NavBarLink></li>
      <li><NavBarLink href="#">Voluntariado</NavBarLink></li>
      <li><NavBarLink href="#">Noticias</NavBarLink></li>
    </ol>
  </Stack>)
}


type NavBarLinkProps = { href: string, children: ReactNode }
const NavBarLink = (props: NavBarLinkProps) => {
  return (
    <MuiLink
      component={Link}
      href={props.href}
      underline="none"
      textTransform='uppercase'
      fontWeight={600}
      color="#151633"
      variant="body1"
      p={1.3}
      borderRadius={5}
      sx={{
        ':hover': {
          backgroundColor: 'conquiLightBlue.light'
        }
      }}>
      {props.children}
    </MuiLink>
  )
}