import { useEffect, useState } from "react";

import { Item } from "@models/profiles";
import { ProfileService } from "@services/api/profile";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type Props = {
  value: string;
  isLoading: boolean;
  onChange: (value: string) => void;
};

export function Profile({ value, isLoading, onChange }: Props) {
  const [profiles, setProfiles] = useState<Item[]>([]);

  const fetchProfiles = async () => {
    try {
      const result = await ProfileService.get({});

      setProfiles(result.items);
    } catch (error) {
      console.error("Erro ao buscar perfis:", error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel id="profile-select-label">Perfil</InputLabel>

      <Select
        required
        value={value}
        label="Perfil"
        disabled={isLoading}
        labelId="profile-select-label"
        onChange={(e) => onChange(e.target.value)}
      >
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <MenuItem key={profile.id} value={profile.id}>
              {profile.description}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>
            {isLoading ? "Carregando perfis..." : "Nenhum perfil encontrado"}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
}
