'use client'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { PickerValue } from "@mui/x-date-pickers/internals";
import { es } from "date-fns/locale";
import { FieldError } from "react-hook-form";



export default function DatePickerField(props: { onChange: (value: Date | null) => void, value?: Date | null, error?: FieldError }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <DatePicker
        onChange={props.onChange}
        value={props.value}
        label='Fecha de nacimiento'
        minDate={new Date(1960, 0, 1)}
        slotProps={{
          textField: {
            helperText: props.error ? props.error.message : '',
            error: !!props.error
          }
        }}
      />
    </LocalizationProvider>
  )
}