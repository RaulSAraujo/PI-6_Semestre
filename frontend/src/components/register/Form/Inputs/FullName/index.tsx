import { TextField } from "@components/ui";
import { Person } from "@mui/icons-material";
import { InputAdornment, useTheme } from "@mui/material";

type Props = {
  fullName: string;
  setFullName: (value: string) => void;
  setFullNameError: (value: string) => void;
  fullNameError: string;
  handleSubmit: () => void;
  isLoading: boolean;
};

export function FullNameInput(props: Props) {
  const {
    fullName,
    setFullName,
    setFullNameError,
    fullNameError,
    handleSubmit,
    isLoading,
  } = props;

  const theme = useTheme();

  return (
    <TextField
      label="Nome completo"
      value={fullName}
      disabled={isLoading}
      error={fullNameError}
      onChange={setFullName}
      setError={setFullNameError}
      handleSubmit={handleSubmit}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Person sx={{ color: theme.palette.text.secondary }} />
          </InputAdornment>
        ),
      }}
    />
  );
}
