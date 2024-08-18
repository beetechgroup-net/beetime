import { InputAdornment, TextField, TextFieldProps, Tooltip } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"

type FormTextFieldProps = TextFieldProps & {
  name: string
  label: string
  type: string
}

export function FormTextField({
  name,
  label,
  tooltip,
  type,
  defaultValue,
  startIcon,
  endIcon,
  ...rest
}: FormTextFieldProps) {
  const { control } = useFormContext()

  return (
    <Controller
      defaultValue={defaultValue || ""}
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            helperText={error ? error.message : null}
            error={!!error}
            onChange={onChange}
            value={value || ""}
            type={type}
            label={label}
            fullWidth
            {...rest}
          />
      )}
    />
  )
}
