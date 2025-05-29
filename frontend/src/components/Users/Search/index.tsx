import { InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import { SearchField } from "./styles";

interface UserSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const UserSearch: React.FC<UserSearchProps> = ({ value, onChange }) => {
  return (
    <SearchField
      size="small"
      placeholder="Buscar usuários..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search color="action" />
          </InputAdornment>
        ),
      }}
    />
  );
};
