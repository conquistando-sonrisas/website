import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";


export default function Hero(props: { title: string, desc?: string }) {

  return (
    <Box height='45vh' sx={{
      background: 'linear-gradient(145deg, rgba(136,147,228,1) 0%, rgba(136,192,228,1) 100%)',
      px: { md: 4, xs: 2 },
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <Typography fontSize='3em' maxWidth='500px' fontWeight={600}>{props.title}</Typography>
      {props.desc && (
        <Typography>{props.desc}</Typography>
      )}
    </Box>
  )
}