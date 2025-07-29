'use client'

import { PhoneNumberTextField } from "@/app/(web)/components/PhoneNumberTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid2, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material"
import { useCallback, useEffect } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form"
import { NumericFormat } from "react-number-format";
import * as yup from 'yup'
import { useMultiStepForm } from "./MultiStepContext";



export default function FormRegistro() {
  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      nombre: '',
      apellido: '',
      edad: '',
      talla: '',
      sexo: '',
      correo: '',
      telefono: ''
    },
    resolver: yupResolver(registroSchema)
  })

  const multi = useMultiStepForm()

  const onSubmit = useCallback((formData: any) => {
    if (!multi) return;

    multi.addFormData('main-form', formData)
  }, []);


  useEffect(() => {
    if (!multi) return;

    reset(multi.registro['main-form'])
  }, [])

  useEffect(() => {
    setTimeout(() => {
      console.log('scrolling')
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0)
  }, [])

  return (
    <Box component='form' id='main-form' onSubmit={handleSubmit(onSubmit)}>
      <Grid2 container rowSpacing={2}>
        <Grid2 size={12}>
          <Typography fontSize={20} fontWeight={500}>Básico</Typography>
        </Grid2>
        <Grid2 container size={12} columnSpacing={{ md: 2 }} >
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Controller
              control={control}
              name='nombre'
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextField
                  data-cy='text-nombre'
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : ''}
                  label='Nombre'
                  fullWidth
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Controller
              control={control}
              name='apellido'
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextField
                  data-cy='text-apellido'
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : ''}
                  label='Apellido'
                  fullWidth
                />
              )}
            />
          </Grid2>

        </Grid2>

        <Grid2 container size={12} columnSpacing={{ md: 2 }}>
          <Grid2 size={{ xs: 12, md: 5 }}>
            <Controller
              control={control}
              name='edad'
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <NumericFormat
                  data-cy='text-edad'
                  error={!!error}
                  helperText={error ? error.message : ''}
                  value={value}
                  valueIsNumericString
                  onValueChange={values => onChange(values.value)}
                  allowLeadingZeros={false}
                  label='Edad'
                  allowNegative={false}
                  decimalScale={0}
                  fullWidth
                  customInput={TextField}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 7 }}>
            <Controller
              control={control}
              name='talla'
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <FormControl fullWidth error={!!error}>
                  <InputLabel>Talla</InputLabel>
                  <Select
                    label='Talla'
                    value={value}
                    onChange={onChange}
                    data-cy='select-talla'
                  >
                    <MenuItem value='infantil'>Infantil</MenuItem>
                    <MenuItem value='xs'>Extra chica (XS)</MenuItem>
                    <MenuItem value='s'>Chica (S)</MenuItem>
                    <MenuItem value='m'>Mediana (M)</MenuItem>
                    <MenuItem value='g'>Grande (G)</MenuItem>
                    <MenuItem value='xg'>Extra grande (XG)</MenuItem>

                  </Select>
                  <FormHelperText error={!!error}>{error ? error.message : ''}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid2>
        </Grid2>


        <Grid2 size={{ xs: 12, md: 6 }}>
          <Controller
            control={control}
            name='sexo'
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <FormControl fullWidth error={!!error}>
                <FormLabel>Sexo</FormLabel>
                <RadioGroup data-cy='radio-sexo' row={true} value={value} onChange={onChange}>
                  <FormControlLabel value='mujer' control={<Radio />} label='Mujer' />
                  <FormControlLabel value='hombre' control={<Radio />} label='Hombre' />
                </RadioGroup>
                <FormHelperText error={!!error}>{error ? error.message : ''}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid2>


        <Grid2 size={12}>
          <Typography mt={1} fontSize={20} fontWeight={500}>Contacto</Typography>
        </Grid2>
        <Grid2 size={12} container columnSpacing={{ md: 2 }}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Controller
              control={control}
              name='correo'
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextField
                  data-cy='text-correo'
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : ''}
                  label='Correo'
                  fullWidth
                  placeholder='ejemplo@email.com'
                />
              )}
            />

          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Controller
              control={control}
              name='telefono'
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <PhoneNumberTextField
                  fullWidth
                  label="Teléfono"
                  onChange={onChange}
                  value={value}
                  error={error}
                />
              )}
            />
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  )
}



const registroSchema = yup.object({
  nombre: yup.string().required('Este campo es requerido'),
  apellido: yup.string().required('Este campo es requerido'),
  edad: yup.string().required('Este campo es requerido'),
  talla: yup.string().required('Este campo es requerido'),
  sexo: yup.string().required('Este campo es requerido'),
  correo: yup.string().email('Ingresa un correo válido').required('Este campo es requerido'),
  telefono: yup.string().required('Este campo es requerido')
})