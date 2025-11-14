'use client'
import { Box, Button, Typography } from "@mui/material";
import { Pacifico } from "next/font/google";

export default function UpcomingEvent() {
  return (
    <Box display='flex' flexDirection='row' columnGap={3}>
      <div>
        <Typography style={{ fontSize: '3em', margin: 0, color: '#24376f' }}>
          Posada Infantil
        </Typography> <br />
        <Typography variant="caption" fontSize={18}>22 diciembre</Typography>
        <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sapiente ab, numquam officia ipsum quibusdam optio quod nulla doloremque similique. Pariatur, commodi at illo id atque illum. Reiciendis, quaerat laudantium!</Typography>
        <Button variant="contained" color="conquiLightBlue">Cómo puedo ayudar</Button>
      </div>
    </Box>
  )
}