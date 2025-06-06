import { Email } from "@mui/icons-material";
import { TextField } from "@components/common";
import { InputAdornment, useTheme } from "@mui/material";

type Props = {
  username: string;
  setUsername: (value: string) => void;
  setUsernameError: (value: string) => void;
  usernameError: string;
  handleSubmit: () => void;
  isLoading: boolean;
};

export function UserNameInput(props: Props) {
  const {
    username,
    setUsername,
    setUsernameError,
    usernameError,
    handleSubmit,
    isLoading,
  } = props;

  const theme = useTheme();

  return (
    <TextField
      label="Email"
      value={username}
      disabled={isLoading}
      error={usernameError}
      onChange={setUsername}
      setError={setUsernameError}
      handleSubmit={handleSubmit}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Email sx={{ color: theme.palette.text.secondary }} />
          </InputAdornment>
        ),
      }}
    />
  );
}
