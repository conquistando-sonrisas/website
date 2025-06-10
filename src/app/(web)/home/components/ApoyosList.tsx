'use client'

import { useCallback, useState } from "react";
import { Apoyo } from "./ApoyosSection";
import { Box, IconButton, Typography } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import Image from "next/image";


export default function ApoyosList(props: { apoyos: Array<Apoyo> }) {
  const { apoyos } = props;
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = useCallback(() => {
    setActiveStep(prev => {
      if (prev === apoyos.length - 1) {
        return 0;
      }
      return prev + 1;
    })
  }, [])

  const handlePrev = useCallback(() => {
    setActiveStep(prev => {
      if (prev === 0) {
        return apoyos.length - 1;
      }
      return prev - 1;
    })
  }, []);

  const apoyo = apoyos.length > 0 ? apoyos[activeStep] : null;

  return (
    <Box display='flex' flexDirection='column' height='100%' position='relative'>
      {apoyo && (
        <Box overflow='scroll' flex={1}>
          <Image
            src={`${process.env.NEXT_PUBLIC_STATIC_CONTENT}${apoyo.icon.url}`}
            width={100}
            height={100}
            alt=''
          />
          <Typography style={{ lineClamp: 3 }} fontSize={26} color='conquiDarkBlue.dark' height='fit-content' fontWeight={600} mt={1}>{apoyo.nombre}</Typography>
          <Typography height='100px' maxHeight='100px' maxWidth='700px' overflow='scroll'>{apoyo.descripcion}</Typography>
        </Box>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', justifySelf: 'flex-end', position: 'absolute', top: 5, right: 5 }}>
        <IconButton onClick={handlePrev} color='conquiDarkBlue' size="large" disabled={apoyos.length == 0}>
          <NavigateBefore />
        </IconButton>
        <IconButton onClick={handleNext} color='conquiDarkBlue' size="large" disabled={apoyos.length == 0}>
          <NavigateNext />
        </IconButton>
      </div>
      {/* <Typography ml={'auto'}>{activeStep + 1}/{apoyos.length}</Typography> */}
    </Box>
  )
}