import { Box, Container, Grid2, Typography } from "@mui/material";
import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import Image from "next/image";
import { NosotrosPage } from "../app";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function Nosotros() {
    const req = await fetch(`${process.env.NEXT_PUBLIC_CMS_API}/nosotros`);
    const res = await req.json();
    const nosotros = res.data as NosotrosPage;

    return (
        <main style={{ minHeight: '100vh' }}>
            <Hero
                title='¡Porque una sonrisa lo puede todo!'
                desc={nosotros.descripcion} />
            <Container>

                <SectionTitle sx={{ mt: 5, textTransform: 'uppercase' }}>filosofia</SectionTitle>
                <Box sx={{ backgroundColor: 'conquiLightBlue.main', py: 4, px: { xs: 4, md: 8 }, borderRadius: 12, mt: 3, mb: 6 }}>
                    <Typography textAlign='center' fontSize='1.1rem'>
                        {nosotros.filosofia}
                    </Typography>
                </Box>
            </Container>
            <Box sx={{ backgroundColor: 'conquiDarkBlue.main', height: { md: '1100px', xs: '1500px' }, position: 'relative' }}>
                <Image src='/Asset-14.png' height={900} width={800} alt='' style={{ objectFit: 'fill', objectPosition: 'bottom', position: 'absolute', left: 0, bottom: 0 }} />
                <Box display={{ xs: 'none', md: 'block' }}>
                    <Image src='/flores_azul_claro.png' height={400} width={175} alt='' style={{ objectFit: 'fill', position: 'absolute', bottom: 0, right: 0 }} />
                </Box>
                <Container sx={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
                    <Grid2 container zIndex={10} p={3} spacing={3} >
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <NosotrosCardSection
                                titleBackgroundColor="conquiYellow.light"
                                cardBackgroundColor="white"
                                title="Misión"
                                content={nosotros.mision}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <NosotrosCardSection
                                titleBackgroundColor="conquiLightBlue.main"
                                cardBackgroundColor="conquiYellow.light"
                                title='Visión'
                                content={nosotros.vision}
                            />
                        </Grid2>
                        <Grid2 container size={12} display='flex' justifyContent='center'>
                            <Grid2 size={{ md: 6, xs: 12 }} >
                                <NosotrosCardSection
                                    title='valores'
                                    titleBackgroundColor="white"
                                    cardBackgroundColor="conquiLightBlue.main"
                                    isMarkdown={true}
                                    height="fit-content"
                                    content={nosotros.valores} />
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Container>
            </Box>
        </main >
    )
}


const NosotrosCardSection = (props: { title: string, content: string, cardBackgroundColor: string, titleBackgroundColor: string, isMarkdown?: boolean, height?: string }) => {
    return (
        <Box display='flex' flexDirection='column' alignItems='flex-end'>
            <Typography
                fontWeight={600}
                sx={{
                    backgroundColor: props.titleBackgroundColor,
                    maxWidth: 'fit-content',
                    p: 2,
                    borderRadius: 10,
                    mb: -3,
                    mr: 4,
                    zIndex: 10,
                    textAlign: 'center'
                }}
                textTransform='uppercase'>{props.title}
            </Typography>
            <Box sx={{
                backgroundColor: props.cardBackgroundColor,
                height: props?.height || '250px',
                p: { md: 7, xs: 3 },
                display: 'flex',
                alignItems: 'center',
                borderRadius: 12,
            }} >
                {
                    props.isMarkdown ? (
                        <MDXRemote source={props.content} />
                    ) : (

                        <Typography textAlign='center'>
                            {props.content}
                        </Typography>
                    )
                }
            </Box>
        </Box>
    )
}