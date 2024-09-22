import { MenuItem, TextField, TextFieldProps, Tooltip } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"
import {EnumData} from "@/app/interfaces/EnumData";

type FormDropdown = TextFieldProps & {
  name: string
  label: string
  tooltip?: string
  options: EnumData[]
  defaultValue?: string | number
}

export function FormDropdown({
  label,
  tooltip,
  name,
  options = [],
  defaultValue,
  ...rest
}: FormDropdown) {
  const { control } = useFormContext()

  function renderOptions() {
    return options.map((option) => {
      return (
        <MenuItem
          id={`option-${name}-${option.value}`}
          key={option.value}
          value={option.value}
        >
          {option.label}
        </MenuItem>
      )
    })
  }

  return (
    <Controller
      defaultValue={defaultValue ?? ""}
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Tooltip title={tooltip ?? label} placement="top">
          <TextField
            select
            id={`input-${name}`}
            helperText={error ? error.message : null}
            error={!!error}
            onChange={onChange}
            value={options.length !== 0 ? value : ""}
            label={label}
            InputLabelProps={{ shrink: true }}
            size="small"
            fullWidth
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: 0.25,
              },
            }}
            {...rest}
          >
            {renderOptions()}
          </TextField>
        </Tooltip>
      )}
    />
  )
}
