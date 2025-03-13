import { Box, Grid2 } from "@mui/material";
import TestimoniosCarousel from "./TestimoniosCarousel";
import SectionTitle from "@/app/components/SectionTitle";
import { ReactNode } from "react";


export default async function TestimoniosSection() {
  const testimoniosReq = await fetch(`${process.env.NEXT_PUBLIC_CMS_API}/testimonios?pagination[pageSize]=5&pagination[page]=1&populate=fotografia`)
  const testimonios = await testimoniosReq.json();

  return (
    <Grid2 container alignContent='stretch'  py={{ md: 2 }}>
      <Grid2 size={{ xs: 12, md: 3 }} pl={{ md: 7 }}>
        <SectionTitle sx={{ my: 8, display: { md: 'block', xs: 'none' }, lineHeight: '1.5em' }}>
          ¿Qué dicen <br /> nuestros niños de <br /><HighlightText>conquistando</HighlightText> <br />
          <HighlightText>sonrisas?</HighlightText>
        </SectionTitle>
        <SectionTitle sx={{ textAlign: 'center', display: { md: 'none', xs: 'block' }, mb: 1 }}>
          ¿Qué dicen nuestros niños de <HighlightText>conquistando</HighlightText> <HighlightText>sonrisas?</HighlightText>
        </SectionTitle>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 'grow' }}>
        <TestimoniosCarousel testimonios={testimonios.data} />
      </Grid2>
    </Grid2>
  )
}

const HighlightText = (props: { children: ReactNode }) => {
  return <Box component='span' sx={{ backgroundColor: 'conquiYellow.main', borderRadius: 10, }}>
    {props.children}
  </Box>

}