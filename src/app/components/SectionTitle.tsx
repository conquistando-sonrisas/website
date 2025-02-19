import { SxProps, Theme, Typography } from "@mui/material";
import { ReactNode } from "react";

export default function SectionTitle(props: { children: ReactNode }) {
  return (<Typography
    my={2}
    variant="h5"
    fontSize={32}
    color="conquiDarkBlue.main"
    fontWeight={700}
  >
    {props.children}
  </Typography>)
}