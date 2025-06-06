import { Badge } from "@mui/icons-material";
import { TextField } from "@components/common";
import { InputAdornment, useTheme } from "@mui/material";

type Props = {
  cpf: string;
  setCpf: (value: string) => void;
  setCpfError: (value: string) => void;
  cpfError: string;
  handleSubmit: () => void;
  isLoading: boolean;
};

export function CpfInput(props: Props) {
  const { cpf, setCpf, setCpfError, cpfError, handleSubmit, isLoading } = props;

  const theme = useTheme();

  return (
    <TextField
      label="CPF"
      value={cpf}
      disabled={isLoading}
      error={cpfError}
      onChange={setCpf}
      setError={setCpfError}
      handleSubmit={handleSubmit}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Badge sx={{ color: theme.palette.text.secondary }} />
          </InputAdornment>
        ),
      }}
    />
  );
}
