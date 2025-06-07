'use client'

import { Testimonio } from "@/app/(web)/app"
import { NavigateBefore, NavigateNext } from "@mui/icons-material"
import { Box, Grid2, IconButton, Paper, Typography } from "@mui/material"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { useCallback } from "react"

export default function TestimoniosCarousel(props: { testimonios: Array<Testimonio> }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const handlePrev = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.scrollPrev();
  }, [emblaApi]);

  const handleNext = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div style={{ overflow: 'hidden' }}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container" style={{ display: 'flex', flex: 1 }}>
          {
            props.testimonios.map((testimonio) => (
              <TestimonioSlide key={testimonio.documentId} testimonio={testimonio} />
            ))
          }
        </div>
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', justifySelf: 'flex-end', my: 3 }}>
        <IconButton onClick={handlePrev} color='conquiDarkBlue' size="large">
          <NavigateBefore />
        </IconButton>
        <IconButton onClick={handleNext} color='conquiDarkBlue' size="large">
          <NavigateNext />
        </IconButton>
      </Box>
    </div>
  )
}

const TestimonioSlide = (props: { testimonio: Testimonio }) => {
  const testimonio = props.testimonio;

  return (

    <Box
      container
      component={Grid2}
      alignContent='flex-start'
      className="embla__slide"
      sx={{
        backgroundColor: '#fdfcfc',
        flex: '0 0 90%',
        minWidth: 0,
        userSelect: 'none',
        mx: 2,
        mt: { xs: 1, md: 3 },
        borderRadius: 5,
        overflow: 'hidden'
      }}>

      <Grid2 size={{ xs: 12, md: 4 }} height={{ xs: '300px', md: '100%' }} position='relative'>
        <Image
          src={`${process.env.NEXT_PUBLIC_STATIC_CONTENT}${testimonio.fotografia.url}`}
          fill
          style={{ objectFit: 'cover', }}
          alt='' />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 8 }} >
        <Box mx={{ xs: 1, md: 2 }} my={{ xs: 2, md: 4 }} overflow='scroll' minHeight='300px'>
          <Typography>{testimonio.mensaje}</Typography>
          <Typography mt={2} fontWeight={600} color='conquiDarkBlue'>{testimonio.beneficiarioNombre}</Typography>
        </Box>
      </Grid2>
    </Box>
  );
}