import { SxProps, Theme, Typography } from "@mui/material";
import { ReactNode } from "react";

export default function SectionTitle(props: { children: ReactNode, sx?: SxProps }) {
  return (<Typography
    my={2}
    variant="h5"
    fontSize={32}
    color="conquiDarkBlue.light"
    fontWeight={700}
    sx={{
      overflowWrap: 'break-word',
      ...props.sx
    }}
  >
    {props.children}
  </Typography>)
}