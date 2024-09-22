import { InputAdornment, TextField, TextFieldProps, Tooltip } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"

type FormTextFieldProps = TextFieldProps & {
  name: string
  label?: string
  tooltip?: string
  type: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  enableSearchOnEnter?: boolean
  onSearch?: () => Promise<void>
}

export function FormTextField({
  name,
  label,
  tooltip,
  type,
  defaultValue,
  startIcon,
  endIcon,
  enableSearchOnEnter = false,
  onSearch,
  ...rest
}: FormTextFieldProps) {
  const { control } = useFormContext()

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (enableSearchOnEnter && event.key === "Enter" && onSearch) {
      await onSearch()
    }
  }

  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Tooltip title={tooltip ?? label} placement="top">
          <TextField
            id={`input-${name}`}
            helperText={error ? error.message : null}
            error={!!error}
            onChange={onChange}
            value={value || ""}
            type={type}
            label={label ?? ""}
            InputLabelProps={{ shrink: true }}
            size={"small"}
            fullWidth
            InputProps={{
              startAdornment: startIcon ? (
                <InputAdornment position="start">{startIcon}</InputAdornment>
              ) : (
                <></>
              ),
              endAdornment: endIcon ? (
                <InputAdornment position="end">{endIcon}</InputAdornment>
              ) : (
                <></>
              ),
            }}
            onKeyDown={handleKeyDown}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: 0.25,
              },
            }}
            {...rest}
          />
        </Tooltip>
      )}
    />
  )
}
