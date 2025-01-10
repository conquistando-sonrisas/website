import { Box, Button, Typography } from "@mui/material";
import { Pacifico } from "next/font/google";

const cursive = Pacifico({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})

export default function BecomeAVoluntario() {

    return (
        <Box
            height='350px'
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            sx={{ backgroundColor: 'conquiLightBlue.main' }}>
            <Typography
                textAlign='center'
                color="conquiLightBlue.contrastText"
                fontWeight={600}
                lineHeight={1}
                m={0}
                fontSize={30}>Quiero ser</Typography>
            <span className={cursive.className} style={{ fontSize: '5em', margin: 0 }}>
                Voluntario
            </span>
            <Button color="conquiDarkBlue" variant="contained" sx={{ mt: 2 }}>Registrarme</Button>
        </Box>
    )
}