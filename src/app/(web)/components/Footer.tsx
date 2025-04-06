import { Box, Typography, Stack, Container, IconButton, Link as MuiLink, Divider } from "@mui/material";
import Image from "next/image";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Link from "next/link";
import { ReactNode } from "react";


export default function Footer() {
  return (
    <Box component='footer' sx={{ backgroundColor: 'conquiDarkBlue.main', color: '#eef6fbd9', pt: 6 }}>
      <Container>
        <Stack
          divider={<Divider
            sx={{
              display: { xs: 'none', md: 'block' },
              height: 60,
              width: 2,
              alignSelf: 'center',
              backgroundColor: '#eef6fb80'
            }}
            orientation='vertical'
            aria-hidden='true'
            flexItem
            variant='middle' />}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent='space-between'
          alignItems={{ xs: 'center', md: 'flex-start' }}
          textAlign={{ xs: 'center', md: 'left' }}
          rowGap={2}
        >
          <Box alignSelf='center'>
            <Image
              src='/conqui.svg'
              height={150}
              width={150}
              alt='Conquistando Sonrisas logo'
              style={{
                userSelect: 'none',
              }}
            />
          </Box>
          <LinksSection
            titleSection='Acerca de'
            links={[{
              label: 'Contacto',
              href: '/contacto',
            },
            {
              label: 'Preguntas frecuentes',
              href: '/preguntas-frecuentes'
            },
            {
              label: 'Novedades',
              href: '/novedades',
            }
            ]}
          />
          <LinksSection
            titleSection='Legal'
            links={[
              {
                label: 'Aviso de privacidad',
                href: '/aviso-privacidad'
              }, {
                label: 'Términos y condiciones',
                href: '/terminos-condiciones'
              },
            ]}
          />
          <Box>
            <Typography fontWeight={600} fontSize='1.2rem' my={.5} color="#eef6fbd9">Social</Typography>
            <Stack direction='row' columnGap={2} >
              <SocialIconLink
                href='https://www.facebook.com/ConquistandoSonrisasAc'
                icon={<FacebookIcon fontSize='large' />}
              />
              <SocialIconLink
                href='https://www.instagram.com/Conquistandosonrisascuu'
                icon={<InstagramIcon fontSize='large' />
                }
              />
              <SocialIconLink
                href='https://www.tiktok.com/@conquistandosonrisas'
                icon={<TikTokIcon />}
              />
              <SocialIconLink
                href='https://wa.me/6141975785'
                icon={<WhatsAppIcon fontSize='large' />
                }
              />
            </Stack>
          </Box>
        </Stack>
      </Container>
      <Typography
        textAlign='center'
        variant='body2'
        sx={{
          color: 'inherit',
          pt: 1,
          pb: 3
        }}
      >
        &copy; {(new Date()).getFullYear()} Conquistando Sonrisas A.C.
      </Typography>
    </Box>
  )
}

type SocialIconLinkProps = {
  href: string,
  icon: ReactNode,
}

const SocialIconLink = (props: SocialIconLinkProps) => {
  return (
    <MuiLink sx={{ color: 'inherit' }} href={props.href} target='_blank'>{props.icon}</MuiLink>
  )
}


type LinksSectionProps = {
  titleSection: string,
  links: Array<{
    label: string,
    href: string
  }>
}

const LinksSection = (props: LinksSectionProps) => {
  return (
    <Box>
      <Typography color='#eef6fbd9' fontWeight={600} fontSize='1.2rem' my={.5}>{props.titleSection}</Typography>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, }}>
        {
          props.links.map(({ href, label }, idx) => (
            <li key={idx}>
              <MuiLink variant='body1' sx={{
                color: '#eef6fbd9',
                textDecoration: 'none',
                ':hover': {
                  color: '#eef6fb',
                  textShadow: '0px 0px 1px #eef6fb'
                }
              }} component={Link} href={href}>{label}</MuiLink>
            </li>
          ))
        }
      </ul>
    </Box>
  )
}


const TikTokIcon = ({ color = "#eef6fbd9" }) => {
  return (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="35px"
      height="35px"
    >
      <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
    </svg>
  );
};