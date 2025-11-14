import { Link as MuiLink, SxProps } from "@mui/material"
import Link from "next/link"
import { ReactNode } from "react"


export default function ConquiLink(props: { href: string, sx?: SxProps, children: ReactNode }) {
  return (
    <MuiLink
      component={Link}
      href={props.href}
      underline="none"
      pb={1}
      px={2}
      textAlign='center'
      sx={{
        display: 'block',
        color: '#0f2f43',
        ':hover': {
          borderRadius: '25px',
          color: '#4051d4'
        },
        ...props.sx
      }}>
      {props.children}
    </MuiLink>
  )
}