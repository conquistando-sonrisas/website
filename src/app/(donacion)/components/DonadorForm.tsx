'use client'

import { PhoneNumberTextField } from "@/app/(web)/components/PhoneNumberTextField"
import { yupResolver } from "@hookform/resolvers/yup"
import { Autocomplete, Box, Checkbox, Collapse, FormControlLabel, Grid2, TextField } from "@mui/material"
import { useCallback, useEffect } from "react"
import { Controller, FormProvider, useForm, useFormContext, useWatch } from "react-hook-form"
import { boolean, object, string } from "yup"
import { useStepper } from "./StepperFormContext"
import { useDonacionContext } from "./DonacionContext"

export type DonadorFormType = {
  nombre: string,
  apellido: string,
  correo: string,
  telefono: string,
  requiresFactura: boolean,
  rfc: string,
  domicilio: string,
  regimenFiscal: { codigo: string, regimen: string } | null;
  usoCfdi: { codigo: string, uso: string } | null
}

export default function DonadorForm() {
  const stepper = useStepper();
  const donacionMethods = useDonacionContext();

  const methods = useForm<DonadorFormType>({
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
    },
    resolver: yupResolver(donadorSchema)
  })

  if (!stepper) {
    throw new Error('Use Stepper Context Provider');
  }

  if (!donacionMethods) {
    throw new Error('Use Donacion Context Provider');
  }

  const { control } = methods;

  const requiresFactura = useWatch({ name: 'requiresFactura', control })

  const toContext = useCallback((data: DonadorFormType) => {
    donacionMethods.saveDonador(data)
    stepper.handleNext()
  }, [])

  useEffect(() => {
    if (!donacionMethods) return;

    const { donador } = donacionMethods;
    if (!donador) return;

    methods.reset(donador)
  }, [])

  return (
    <FormProvider {...methods}>
      <Grid2
        id='formulario-donador'
        component='form'
        onSubmit={methods.handleSubmit(toContext)}
        container
        columnSpacing={2}
        rowSpacing={2.5}
        mt={2}
        height={'334px'}
      >
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
                value={field.value || ''}
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
            defaultValue={false}
            render={({ field, fieldState }) => (
              <FormControlLabel
                value={field.value}
                checked={!!field.value}
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
      </Grid2>
    </FormProvider>
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

  const selectedRegimen = useWatch({ name: 'regimenFiscal', control })
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
          defaultValue={''}
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
          name='regimenFiscal'
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
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : ''}
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
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : ''}
                />
              )}
            />
          )}
        />

      </Grid2>
    </Grid2>
  )
}

const donadorSchema = object({
  nombre: string().required('Ingresa tu nombre, por favor'),
  apellido: string().required('Ingresa tus apellidos, por favor'),
  correo: string().email('Ingresa un correo válido, por favor').required('Ingresa tu correo, por favor'),
  telefono: string().optional().default('').defined(),
  requiresFactura: boolean().default(false).defined(),
  rfc: string().default('').defined().when('requiresFactura', {
    is: true,
    then: schema => schema.required('Ingresa un valor válido, por favor')
  }),
  domicilio: string().default('').defined().when('requiresFactura', {
    is: true,
    then: schema => schema.required('Ingresa un valor válido, por favor')
  }),
  regimenFiscal: object({
    codigo: string().default('').defined(),
    regimen: string().default('').defined()
  }).nullable().when('requiresFactura', {
    is: true,
    then: schema => schema.required('Selecciona un opción, por favor')
  }),
  usoCfdi: object({
    codigo: string().default('').defined(),
    uso: string().default('').defined()
  }).nullable().when('requiresFactura', {
    is: true,
    then: schema => schema.required('Selecciona un opción, por favor')
  })
})