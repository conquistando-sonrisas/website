'use client'

import { Clear, Delete, Remove } from "@mui/icons-material";
import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Grid2, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material"
import { Controller, useFieldArray, useForm, useFormContext } from "react-hook-form"
import { NumericFormat } from "react-number-format";
import * as yup from 'yup'
import { useMultiStepForm } from "./MultiStepContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";


export default function FormRegistroExtra() {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      people: []
    },
    resolver: yupResolver(registroExtraSchema)
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'people' })
  const multi = useMultiStepForm()

  const onSubmit = (formData: any) => {
    if (!multi) return;

    multi.addFormData('extra-form', formData)
  }

  useEffect(() => {
    if (!multi) return;

    reset(multi.registro['extra-form'])
  }, [])

  return (
    <Box component='form' id='extra-form' onSubmit={handleSubmit(onSubmit)}>
      <Typography my={1} fontSize={20} fontWeight={500}>
        ¿Te gustaría registrar a algún familiar, amigo u otra persona?
      </Typography>
      {

        fields.map((item, index) => (
          <Grid2 container key={item.id} rowSpacing={2} mt={3}>
            <Grid2 size={12}>
              <Button color='error' onClick={() => remove(index)} variant="outlined" sx={{ textTransform: 'none' }} startIcon={<Delete />}>Eliminar #{index + 1}</Button>
            </Grid2>

            <Grid2 size={12}>
              <Controller
                control={control}
                name={`people.${index}.nombre`}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <TextField
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

            <Grid2 container size={12} columnSpacing={{ md: 2 }}>
              <Grid2 size={{ xs: 12, md: 5 }}>
                <Controller
                  control={control}
                  name={`people.${index}.edad`}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <NumericFormat
                      error={!!error}
                      helperText={error ? error.message : ''}
                      value={value}
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
                  name={`people.${index}.talla`}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <FormControl fullWidth>
                      <InputLabel>Talla</InputLabel>
                      <Select
                        label='Talla'
                        value={value}
                        onChange={onChange}
                      >
                        <MenuItem value='infantil'>Infantil</MenuItem>
                        <MenuItem value='xs'>Extra chica (XS)</MenuItem>
                        <MenuItem value='s'>Chica (S)</MenuItem>
                        <MenuItem value='m'>Mediana (M)</MenuItem>
                        <MenuItem value='g'>Grande (G)</MenuItem>
                        <MenuItem value='xg'>Extra grande (XG)</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid2>
            </Grid2>


            <Grid2 size={{ xs: 12, md: 6 }}>
              <Controller
                control={control}
                name={`people.${index}.sexo`}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <FormControl fullWidth>
                    <FormLabel>Sexo</FormLabel>
                    <RadioGroup row={true} value={value} onChange={onChange}>
                      <FormControlLabel value='mujer' control={<Radio />} label='Mujer' />
                      <FormControlLabel value='hombre' control={<Radio />} label='Hombre' />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Grid2>
            {fields.length > 0 && index < fields.length - 1 && (
              <Grid2 size={12}>
                <Divider orientation="horizontal" />
              </Grid2>
            )}
          </Grid2>
        ))
      }
      <Button sx={{ textTransform: 'none', mt: 2 }} fullWidth variant='outlined' onClick={() => append({ nombre: '', edad: null, talla: '', sexo: null })}>¡Agregar!</Button>
    </Box>
  )
}


const registroExtraSchema = yup.object({
  people: yup.array().of(yup.object({
    nombre: yup.string().required(),
    edad: yup.number().required().nullable(),
    talla: yup.string().required(),
    sexo: yup.string().required().nullable()
  }))
})