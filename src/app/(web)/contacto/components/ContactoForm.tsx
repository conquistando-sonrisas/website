'use client'

import { Box, Button, Stack, TextField } from "@mui/material"


export default function ContactForm() {

  return (
    <Stack component='form' direction='column' rowGap={3} alignSelf='center' maxWidth='500px'>
      {/* not emtpy  */}
      <TextField color="conquiDarkBlue" label='Nombre' />

      {/* not empty, valid email */}
      <TextField color="conquiDarkBlue" label='Celular' />

      {/* not empty */}
      <TextField color="conquiDarkBlue" multiline rows={4} label='Mensaje' />
      <Button type="submit" color="conquiDarkBlue" variant="contained" size="large" sx={{ mx: 'auto', maxWidth: 'fit-content' }}>Enviar mensaje</Button>

    </Stack>
  )
}

