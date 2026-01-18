'use client'

import { PhoneNumberTextField } from "@/app/(web)/components/PhoneNumberTextField"
import { Autocomplete, Checkbox, Collapse, FormControlLabel, Grid2, TextField } from "@mui/material"
import { Controller, FormProvider, useForm, useFormContext, useWatch } from "react-hook-form"


export default function DonadorForm() {
  const methods = useForm({
    defaultValues: {
      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      requiresFactura: false,
      rfc: '',
      domicilio: '',
      regimenFiscal: null,
      usoCfdi: null
    }
  })

  const { control } = methods;

  const requiresFactura = useWatch({ name: 'requiresFactura', control })

  return (
    <Grid2 container columnSpacing={2} rowSpacing={2.5} my={3}>
      <FormProvider {...methods}>
        <Grid2 size={{ xs: 6 }}>
          <Controller
            control={control}
            name='nombre'
            render={({ field, fieldState }) => (
              <TextField
                value={field.value}
                onChange={field.onChange}
                helperText={fieldState.error ? fieldState.error.message : ''}
                error={!!fieldState.error}
                label='Nombre (s)'
                fullWidth
              />
            )}
          />
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          <Controller
            control={control}
            name='apellido'
            render={({ field, fieldState }) => (
              <TextField
                value={field.value}
                onChange={field.onChange}
                helperText={fieldState.error ? fieldState.error.message : ''}
                error={!!fieldState.error}
                label='Apellidos'
                fullWidth
              />
            )}
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <Controller
            control={control}
            name='correo'
            render={({ field, fieldState }) => (
              <TextField
                value={field.value}
                onChange={field.onChange}
                helperText={fieldState.error ? fieldState.error.message : ''}
                error={!!fieldState.error}
                label='Correo'
                fullWidth
              />
            )}
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <Controller
            control={control}
            name='telefono'
            render={({ field, fieldState }) => (
              <PhoneNumberTextField
                onChange={field.onChange}
                value={field.value}
                error={fieldState.error}
                label="Teléfono"
                helperText="Opcional"
                fullWidth={true}

              />
            )}
          />
        </Grid2>

        <Grid2 size={{ xs: 12 }}>
          <Controller
            control={control}
            name='requiresFactura'
            render={({ field, fieldState }) => (
              <FormControlLabel
                value={field.value}
                onChange={field.onChange}
                control={<Checkbox />}
                label='¿Necesitas factura?'
              />
            )}
          />
        </Grid2>
        <Collapse in={requiresFactura} sx={{ width: '100%' }}>
          <FacturacionForm />
        </Collapse>
      </FormProvider>
    </Grid2>
  )
}



const FacturacionForm = () => {
  const { control, setValue } = useFormContext();

  const regimenesFiscales = [{
    codigo: '605',
    regimen: 'Sueldos y Salarios e Ingresos Asimilados a Salarios',
    usosCfdi: [{
      codigo: 'D01',
      uso: 'Honorarios médicos, dentales y gastos hospitalarios'
    }, {
      codigo: 'D02',
      uso: 'Gastos médicos por incapacidad o discapacidad'
    }]
  }]

  const selectedRegimen = useWatch({ name: 'regimen', control })
  const usosCfdi = regimenesFiscales.find(regimen => {
    if (!selectedRegimen) return false;
    return regimen.codigo === selectedRegimen.codigo
  })?.usosCfdi || []

  return (
    <Grid2 container columnSpacing={2} rowSpacing={2.5}>
      <Grid2 size={{ xs: 12 }}>
        <Controller
          control={control}
          name='rfc'
          render={({ field, fieldState }) => (
            <TextField
              value={field.value}
              onChange={field.onChange}
              helperText={fieldState.error ? fieldState.error.message : ''}
              error={!!fieldState.error}
              label='RFC'
              fullWidth
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <Controller
          control={control}
          name='domicilio'
          render={({ field, fieldState }) => (
            <TextField
              value={field.value}
              onChange={field.onChange}
              helperText={fieldState.error ? fieldState.error.message : ''}
              error={!!fieldState.error}
              label='Domicilio fiscal'
              fullWidth
              placeholder="Calle, número, colonia, ciudad, estado, código postal"
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 6 }}>
        <Controller
          control={control}
          name='regimen'
          defaultValue={null}
          render={({ field, fieldState }) => (
            <Autocomplete
              value={field.value}
              onChange={(_, value) => {
                if (!value) {
                  setValue('usoCfdi', null)
                  return field.onChange(null)
                }

                field.onChange({ codigo: value.codigo, regimen: value.regimen })
              }}
              options={regimenesFiscales}
              getOptionLabel={option => `(${option.codigo}) ${option.regimen}`}
              isOptionEqualToValue={(option, value) => option.codigo === value.codigo}
              renderInput={params => (
                <TextField
                  {...params}
                  label='Régimen fiscal'
                  fullWidth />
              )}
            />
          )}
        />

      </Grid2>
      <Grid2 size={{ xs: 6 }}>
        <Controller
          control={control}
          name='usoCfdi'
          defaultValue={null}
          render={({ field, fieldState }) => (
            <Autocomplete
              value={field.value}
              onChange={(_, value) => field.onChange(value)}
              getOptionLabel={option => `(${option.codigo}) ${option.uso}`}
              options={usosCfdi}
              noOptionsText='Selecciona un régimen fiscal'
              renderInput={params => (
                <TextField
                  {...params}
                  label='Uso de CFDI'
                  fullWidth
                />
              )}
            />
          )}
        />

      </Grid2>
    </Grid2>
  )
}