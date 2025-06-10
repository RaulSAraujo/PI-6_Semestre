import {
  FilledInputProps,
  InputProps,
  OutlinedInputProps,
} from "@mui/material";
import { StyledTextField } from "./styles";

type Props = {
  value: any;
  rows?: number;
  label: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  handleSubmit: () => void;
  type?: "text" | "password";
  onChange: (value: any) => void;
  setError: (error: string) => void;
  InputProps?:
    | Partial<FilledInputProps>
    | Partial<OutlinedInputProps>
    | Partial<InputProps>
    | undefined;
};

export function TextField(props: Props) {
  const {
    value,
    type,
    label,
    error,
    setError,
    onChange,
    rows = 1,
    InputProps,
    handleSubmit,
    multiline = false,
    required = false,
    disabled = false,
  } = props;

  return (
    <StyledTextField
      fullWidth
      type={type}
      rows={rows}
      multiline={multiline}
      label={label}
      value={value}
      error={!!error}
      variant="outlined"
      helperText={error}
      required={required}
      disabled={disabled}
      InputProps={InputProps}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (error) {
          setError("");
        }

        if (e.key === "Enter") handleSubmit();
      }}
    />
  );
}
