import { Box, Container, Typography } from "@mui/material";


export default function Hero(props: { title: string, desc?: string }) {

  return (
    <Box height='45vh' sx={{
      background: 'linear-gradient(145deg, rgba(136,147,228,1) 0%, rgba(136,192,228,1) 100%)',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      position: 'relative'
    }}>
      <Container maxWidth='xl'>
        <Typography fontSize='3em' maxWidth='500px' fontWeight={600} zIndex={2}>{props.title}</Typography>
        {props.desc && (
          <Typography zIndex={2}>{props.desc}</Typography>
        )}
      </Container>
    </Box>
  )
}