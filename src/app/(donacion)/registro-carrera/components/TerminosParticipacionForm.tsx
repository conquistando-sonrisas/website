'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Typography } from "@mui/material"
import { Children, ReactNode, useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import * as yup from 'yup'
import { useMultiStepForm } from "./MultiStepContext";


export default function TerminosParticipacionForm() {
  const multi = useMultiStepForm();
  const methods = useForm({
    defaultValues: {
      aceptadoTerminos: false
    },
    resolver: yupResolver(yup.object({ aceptadoTerminos: yup.bool().required('Debes aceptar los términos de participación para continuar').oneOf([true], 'Debes aceptar los términos de participación para continuar') }))
  });

  const onSubmit = (formData: any) => {
    if (!multi) return;
    multi.addFormData('terminos-form', formData)
  }

  useEffect(() => {
    if (!multi) return;

    console.log(multi.registro['terminos-form'])
    methods.reset(multi.registro['terminos-form'])
  }, [])

  useEffect(() => {
    setTimeout(() => {
      console.log('scrolling')
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0)
  }, [])

  return (
    <Box component='form' id="terminos-form" onSubmit={methods.handleSubmit(onSubmit)}>
      <Typography fontSize={20} fontWeight={500}>Declaración de responsabilidad</Typography>
      <Typography my={1}>
        Al continuar con el registro en la <Bold>XI EDICIÓN CORRIENDO POR MIL SONRISAS 2025</Bold>, declaro que acepto voluntaria y expresamente todos los riesgos y peligros asociados a la participación en este evento. Reconozco que soy el único responsable de mi salud y acepto cualquier consecuencia, accidente, perjuicio o afectación que pueda alterar mi bienestar físico o mental, incluyendo riesgos graves o incluso la muerte.
      </Typography>
      <Typography mb={1}>
        Por lo tanto, libero de cualquier responsabilidad al
        <Bold> Comité Organizador del evento</Bold>, a la
        <Bold> Asociación de Atletismo del Estado de Chihuahua</Bold>,
        a las <Bold> empresas patrocinadoras</Bold>,
        a los <Bold> representantes del municipio</Bold>,
        al <Bold> Gobierno del Estado de Chihuahua</Bold>,
        al <Bold> ICHD</Bold> y a cualquier otra autoridad
        u organización vinculada a la carrera.
        Renuncio a cualquier derecho, demanda o indemnización relacionada con mi participación.
      </Typography>
      <Typography mb={1}>
        Declaro conocer y aceptar los reglamentos de la <Bold> Federación Mexicana de Asociaciones</Bold>, los riesgos inherentes a este deporte y participar de manera completamente voluntaria, incluyendo entrenamientos y actividades previas, durante y posteriores al evento.
      </Typography>
      <Typography mb={1}>
        Asimismo, manifiesto que no padezco enfermedades, condiciones físicas, mentales o legales que impidan o desaconsejen mi participación en esta carrera. Confirmo haber leído y comprendido las condiciones generales y normas obligatorias del evento.
      </Typography>
      <Typography mb={1}>
        <Bold>En caso de registrar a otros participantes, declaro que cuento con la autorización expresa de cada una de las personas inscritas (o de sus padres o tutores legales, en el caso de menores de edad) y que ellos también aceptan los términos aquí establecidos. </Bold>
        Me comprometo a compartirles esta información y asegurarme de que comprendan su contenido.
      </Typography>
      <Typography mb={1}>
        Al seleccionar la casilla de aceptación a continuación, manifiesto mi consentimiento libre y voluntario, y reconozco que esta acción será registrada electrónicamente como constancia de aceptación.
      </Typography>
      <Controller
        control={methods.control}
        name='aceptadoTerminos'
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <FormControl error={!!error}>
            <FormGroup >
              <FormControlLabel
                onChange={onChange}
                value={value}
                checked={value}
                control={<Checkbox />}
                label={
                  'He leído y acepto los términos de participación'
                }
              />
            </FormGroup>
            <FormHelperText>{error ? error.message : ''}</FormHelperText>
          </FormControl>
        )}
      />
    </Box>
  )
}

const Bold = (props: { children: ReactNode }) => {
  return (
    <Typography fontWeight={600} component='span'>
      {props.children}
    </Typography>
  )
}