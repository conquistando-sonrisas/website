'use client'

import { FormControl, FormHelperText, FormLabel, Input, InputLabel, OutlinedInput, TextField } from "@mui/material"
import { forwardRef } from "react"
import { FieldError } from "react-hook-form"
import { IMaskInput } from 'react-imask'


type PhoneNumberTextFieldProps = {
  label: string,
  value: string,
  onChange: (value: string) => void,
  error?: FieldError,
  fullWidth?: boolean
}
export const PhoneNumberTextField = ({ label, value, onChange, error, fullWidth }: PhoneNumberTextFieldProps) => {

  return (
    <FormControl variant="outlined" error={!!error} fullWidth={fullWidth}>
      <InputLabel htmlFor='phone-number-text-input'>{label}</InputLabel>
      <OutlinedInput
        id='phone-number-text-input'
        label={label}
        value={value}
        placeholder="(614) 123-4567"
        name='phone-number-text-mask'
        onChange={(e) => onChange(e.target.value)}
        inputComponent={PhoneMask as any}
      />
      <FormHelperText>{error ? error.message : ''}</FormHelperText>
    </FormControl>
  )
}


const PhoneMask = forwardRef<HTMLInputElement, { name: string, onChange: (event: { target: { name: string; value: string } }) => void }>((props, ref) => {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask='(#00) 000-0000'
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  )
})