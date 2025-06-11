import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type Props = {
  value: string;
  isLoading: boolean;
  onChange: (value: string) => void;
};

export function Type({ value, isLoading, onChange }: Props) {
  return (
    <FormControl fullWidth>
      <InputLabel id="type-select-label">Tipo</InputLabel>

      <Select
        required
        name="type"
        label="Tipo"
        value={value}
        id="simple-select"
        disabled={isLoading}
        labelId="type-select-label"
        onChange={(e) => onChange(e.target.value)}
      >
        <MenuItem value="F">Física</MenuItem>
        <MenuItem value="J">Jurídica</MenuItem>
      </Select>
    </FormControl>
  );
}
