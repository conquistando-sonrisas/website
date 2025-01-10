'use client'
import { Box, Button, Typography } from "@mui/material";
import { Pacifico } from "next/font/google";
import Image from "next/image";

const cursive = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})


export default function UpcomingEvent() {
  return (
    <Box display='flex' flexDirection='row' columnGap={3}>
      <Image
        src='https://scontent.fcuu4-1.fna.fbcdn.net/v/t39.30808-6/412915442_757930306379660_6780855251590418783_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeGMpbwHyFh07S8QGwrprPDMYDt_egfHCW1gO396B8cJbdaFDVyGT1peaBEI44JJovlxCsR17SL9PSolCtiXsuBj&_nc_ohc=exhCsrFo0xYQ7kNvgGeBZSh&_nc_zt=23&_nc_ht=scontent.fcuu4-1.fna&_nc_gid=Amx7Up_MXz_o3__up8Dp5-Z&oh=00_AYDSbAU7mXAjpWVMt_TeM42OIMnVeYztn8Qm_hcFHvaMkg&oe=675AF254'
        loader={({ src }) => src}
        width={450}
        height={300}
        objectFit='cover'
        objectPosition="center"
        alt="santa"
        style={{ borderRadius: 5 }}
      />
      <div>
        <span
          className={cursive.className} style={{ fontSize: '3em', margin: 0, color: '#24376f' }}>
          Posada Infantil
        </span> <br />
        <Typography variant="caption" fontSize={18}>22 diciembre</Typography>
        <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sapiente ab, numquam officia ipsum quibusdam optio quod nulla doloremque similique. Pariatur, commodi at illo id atque illum. Reiciendis, quaerat laudantium!</Typography>
        <Button variant="contained" color="conquiLightBlue">Cómo puedo ayudar</Button>
      </div>
    </Box>
  )
}