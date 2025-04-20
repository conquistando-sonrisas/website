'use client'

import { Alert, AlertTitle, Box, Button, Collapse, Fade, Slide, Stack, TextField, Typography } from "@mui/material"
import { forwardRef, useCallback, useState } from "react";
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';


export default function ContactForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      nombre: '',
      correo: '',
      celular: '',
      mensaje: ''
    },
    resolver: yupResolver(contactoFormSchema)
  });

  const onSubmit = useCallback(async (data: any) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_CMS_API}/mensajes`, {
        method: 'POST',
        body: JSON.stringify({ data }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      reset();
      setShowSuccessMessage(true);
    } catch (err) {
      console.log(err)
      setErrorMessage((err as Error).message)
    }
  }, [])

  const handleTryAgain = useCallback(() => {
    setErrorMessage('')
    setShowSuccessMessage(false)
  }, [])

  if (errorMessage) {
    return (
      <Alert severity="error">
        <AlertTitle color="inherit">Hubo un error al enviar tu mensaje</AlertTitle>
        {errorMessage} <br />
        <Button variant="outlined" onClick={handleTryAgain}
          color="inherit"
          sx={{ mt: 1, textTransform: 'none' }}>Intentar de nuevo</Button>
      </Alert>
    )
  }

  return (
    <>
      {
        showSuccessMessage ? (
          <SuccessSubmitMessage handleClick={handleTryAgain} />
        ) : (
          <Stack
            onSubmit={handleSubmit(onSubmit)}
            component='form'
            direction='column'
            rowGap={3}
            alignSelf='center'
          >
            <Controller
              control={control}
              name='nombre'
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  color="conquiDarkBlue"
                  label='Nombre'
                  helperText={error ? error.message : ""}
                  error={!!error}
                />
              )}
            />

            <Controller
              control={control}
              name='correo'
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextField
                  color="conquiDarkBlue"
                  label='Correo'
                  value={value}
                  onChange={onChange}
                  helperText={error ? error.message : ""}
                  error={!!error}
                />
              )}
            />

            <Controller
              control={control}
              name='celular'
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextField
                  color="conquiDarkBlue"
                  label='Celular'
                  value={value}
                  onChange={onChange}
                  helperText={error ? error.message : ""}
                  error={!!error}
                />
              )}
            />

            <Controller
              control={control}
              name='mensaje'
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextField
                  color="conquiDarkBlue"
                  multiline
                  rows={4}
                  label='Mensaje'
                  value={value}
                  onChange={onChange}
                  helperText={error ? error.message : ""}
                  error={!!error}
                />
              )}
            />

            <Button type="submit" color="conquiDarkBlue" variant="contained" size="large" sx={{ mx: 'auto', maxWidth: 'fit-content' }}>Enviar mensaje</Button>
          </Stack>
        )
      }
    </>
  )
}

import * as yup from 'yup';

const contactoFormSchema = yup.object({
  nombre: yup.string().required('Este campo es requerido'),
  correo: yup.string().email('Debe ser una dirección de correo valido').required('Este campo es requerido'),
  celular: yup.string().required('Este campo es requerido'),
  mensaje: yup.string().required().max(300, 'Solo puedes usar 300 carácteres')
})


const SuccessSubmitMessage = forwardRef<HTMLDivElement, { handleClick: () => void }>((props, ref) => {
  return (
    <Alert severity="success" ref={ref}>
      <AlertTitle color="inherit">¡Gracias por escribirnos!</AlertTitle>
      Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto. <br />
      <Button
        onClick={props.handleClick}
        variant="outlined"
        color='inherit'
        sx={{ textTransform: 'none', mt: 1 }}>
        Enviar otro mensaje
      </Button>
    </Alert>
  )
})