'use client'

import { StrapiSingleResponse } from "@/app/(web)/app"
import { PhoneNumberTextField } from "@/app/(web)/components/PhoneNumberTextField"
import { yupResolver } from "@hookform/resolvers/yup"
import { Alert, AlertTitle, Autocomplete, Backdrop, Box, Button, CircularProgress, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, Skeleton, Stack, TextField } from "@mui/material"
import { format, subYears } from "date-fns"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useCallback, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import * as yup from 'yup'
const DatePickerField = dynamic(() => import('./DatePicker'), { ssr: false, loading: () => <Skeleton variant="rounded" width={'auto'} height={56} /> })


export const VoluntarioForm = () => {
  const { control, handleSubmit, reset } = useForm<VoluntarioFormType>({
    defaultValues: {
      nombre: '',
      correo: '',
      celular: '',
      fechaNacimiento: null,
      actividad: null,
      fortalezas: [],
      motivo: ''
    },
    resolver: yupResolver(voluntarioSchema)
  })
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTryAgain = () => {
    setErrorMessage('')
    setShowSuccessMessage(false);
  }

  const onSubmit = useCallback(async (data: VoluntarioFormType) => {
    const { fechaNacimiento, fortalezas, ...voluntario } = data;
    try {
      setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_CMS_API}/voluntarios`, {
        method: 'POST',
        body: JSON.stringify({
          data: {
            ...voluntario,
            fortalezas: fortalezas.join(',\n'),
            ...(fechaNacimiento && {
              fechaNacimiento: format(fechaNacimiento, 'yyyy-MM-dd')
            })
          }
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      reset();
      setShowSuccessMessage(true);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } catch (err) {
      setErrorMessage((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  if (errorMessage) {
    return (
      <Alert severity="error" sx={{ maxWidth: '450px', mx: 'auto' }}>
        <AlertTitle color="inherit">Hubo un error al enviar el mensaje</AlertTitle>
        {errorMessage} <br />
        <Button variant="outlined" onClick={handleTryAgain}
          color="inherit"
          sx={{ mt: 1, textTransform: 'none' }}>Intentar de nuevo</Button>
      </Alert>
    )
  }

  return (
    <>
      <Backdrop open={loading} sx={theme => ({
        color: 'whitesmoke',
        zIndex: theme.zIndex.drawer + 1
      })}>
        <CircularProgress color='inherit' />
      </Backdrop>
      {
        showSuccessMessage ? (
          <Alert severity="success" sx={{ maxWidth: '450px', mx: 'auto' }}>
            <AlertTitle color="inherit">¡Gracias por escribirnos!</AlertTitle>
            Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto. <br />
            <Button
              LinkComponent={Link}
              href='/'
              variant="outlined"
              color='inherit'
              sx={{ mt: 1 }}>
              Ir a inicio
            </Button>
          </Alert>
        ) : (
          <Box
            component='form'
            px={1}
            py={2}
            maxWidth={'450px'}
            mx='auto'
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack rowGap={2} mb={3}>
              <Controller
                control={control}
                name='nombre'
                render={
                  ({ field: { value, onChange }, fieldState: { error } }) => (
                    <TextField
                      fullWidth
                      label='Nombre completo'
                      onChange={onChange}
                      value={value}
                      error={!!error}
                      helperText={error ? error.message : ''}
                    />
                  )}
              />
              <Controller
                control={control}
                name='correo'
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    label='Correo'
                    onChange={onChange}
                    value={value}
                    error={!!error}
                    helperText={error ? error.message : ''}
                  />
                )}
              />
              <Controller
                control={control}
                name='celular'
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <PhoneNumberTextField
                    label="Celular"
                    onChange={onChange}
                    value={value}
                    error={error}
                  />
                )}
              />
              <Controller
                control={control}
                name='fechaNacimiento'
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <DatePickerField
                    value={value}
                    onChange={onChange}
                    error={error}
                  />
                )}
              />
              <Controller
                control={control}
                name='actividad'
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <FormControl
                    error={!!error}
                  >
                    <FormLabel id='label-for-actividades'>¿Qué actividades realizas?</FormLabel>
                    <RadioGroup
                      onChange={onChange}
                      value={value}
                      aria-labelledby='label-for-actividades'
                      name="radio-buttons-actividades"
                    >
                      <FormControlLabel
                        value='Estudio'
                        control={<Radio />}
                        label='Estudio'
                      />
                      <FormControlLabel
                        value='Trabajo'
                        control={<Radio />}
                        label='Trabajo'
                      />
                      <FormControlLabel
                        value='EstudioYTrabajo'
                        control={<Radio />}
                        label='Ambas'
                      />
                    </RadioGroup>
                    <FormHelperText>{error ? error.message : ''}</FormHelperText>
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name={'fortalezas'}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <Autocomplete
                    value={value}
                    onChange={(e, val) => onChange(val)}
                    disableCloseOnSelect
                    multiple
                    options={characterStrengths}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Selecciona 5 fortalezas que te describan'
                        placeholder="Fortalezas"
                        helperText={error ? error.message : ''}
                        error={!!error}
                      />
                    )}
                  />
                )}
              />
              <Controller
                control={control}
                name='motivo'
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    multiline
                    rows={3}
                    label='¿Por qué quieres ser voluntario en Conqui?'
                    helperText={error ? error.message : ''}
                  />
                )}
              />
            </Stack >
            <Button
              disabled={loading}
              type="submit"
              sx={{ mx: 'auto' }}
              size="large"
              color="conquiDarkBlue"
              variant="contained">Enviar</Button>
          </Box >

        )}
    </>
  )
}

const characterStrengths = [
  'Creatividad',
  'Curiosidad',
  'Juicio',
  'Amor por el aprendizaje',
  'Perspectiva',
  'Valentía',
  'Perseverancia',
  'Honestidad',
  'Entusiasmo',
  'Amor',
  'Bondad',
  'Inteligencia social',
  'Trabajo en equipo',
  'Justicia',
  'Equidad',
  'Autocontrol',
  'Prudencia',
  'Humildad',
  'Perdón',
  'Espiritualidad',
  'Gratitud',
  'Esperanza',
  'Humor',
  'Apreciación a la Belleza',
]

const voluntarioSchema: yup.ObjectSchema<VoluntarioFormType> = yup.object({
  nombre: yup
    .string()
    .required('Este campo es requerido'),
  correo: yup
    .string()
    .email('Ingresa una cuenta de correo válido')
    .required('Este campo es requerido'),
  celular: yup
    .string()
    .required('Este campo es requerido'),
  fechaNacimiento: yup
    .date()
    .nullable()
    .required('Este campo es requerido')
    .min(new Date(1950, 0, 1), 'Valor tiene que ser mayor a 1950')
    .max(subYears(new Date(), 15), 'Tienes que ser mayor de 15 años'),
  actividad: yup
    .string()
    .nullable()
    .required('Este campo es requerido'),
  fortalezas: yup
    .array()
    .of(yup
      .string()
      .required())
    .min(5, 'Selecciona 5 fortalezas')
    .max(5, 'Selecciona 5 fortalezas')
    .required('Este campo es requerido'),
  motivo: yup
    .string()
    .required('Este campo es requerido')
})

type VoluntarioFormType = {
  nombre: string;
  correo: string;
  celular: string;
  fechaNacimiento: null | Date;
  actividad: null | string;
  fortalezas: string[],
  motivo: string;
}


