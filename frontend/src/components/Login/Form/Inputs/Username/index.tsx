import { TextField } from "@components/common";

type Props = {
  username: string;
  disabled: boolean;
  usernameError: string;
  handleSubmit: () => void;
  setUsername: (username: string) => void;
  setUsernameError: (error: string) => void;
};

export function Username({
  username,
  disabled,
  setUsername,
  usernameError,
  setUsernameError,
  handleSubmit,
}: Props) {
  return (
    <TextField
      label="CPF/Email"
      value={username}
      disabled={disabled}
      error={usernameError}
      onChange={setUsername}
      setError={setUsernameError}
      handleSubmit={handleSubmit}
    />
  );
}
