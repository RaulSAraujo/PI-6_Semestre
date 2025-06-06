import {
  FilledInputProps,
  InputProps,
  OutlinedInputProps,
} from "@mui/material";
import { StyledTextField } from "./styles";

type Props = {
  value: any;
  label: string;
  type?: "text" | "password";
  error?: string;
  disabled?: boolean;
  handleSubmit: () => void;
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
    label,
    type,
    error,
    setError,
    onChange,
    InputProps,
    handleSubmit,
    disabled = false,
  } = props;

  return (
    <StyledTextField
      fullWidth
      type={type}
      label={label}
      value={value}
      error={!!error}
      variant="outlined"
      helperText={error}
      disabled={disabled}
      InputProps={InputProps}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        setError("");

        if (e.key === "Enter") handleSubmit();
      }}
    />
  );
}
