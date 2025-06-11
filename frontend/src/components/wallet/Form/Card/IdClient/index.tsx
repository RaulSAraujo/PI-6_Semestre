import { useEffect, useState } from "react";

import { Item } from "@models/client";
import { ClientesService } from "@services/api/client";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type Props = {
  idClient: string;
  onChange: (id: string) => void;
};

export function IdClient({ idClient, onChange }: Props) {
  const [loading, setLoading] = useState(true);

  const [listClient, setListClient] = useState<Item[]>([]);

  const fetchCliente = async () => {
    setLoading(true);

    try {
      const response = await ClientesService.get({});

      setListClient(response.items);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCliente();
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel id="client-select-label">Cliente</InputLabel>

      <Select
        required
        label="Cliente"
        value={idClient}
        disabled={loading}
        labelId="client-select-label"
        onChange={(e) => onChange(e.target.value)}
      >
        {listClient.length > 0 ? (
          listClient.map((client) => (
            <MenuItem key={client.id} value={client.id}>
              {client.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>
            {loading ? "Carregando clientes..." : "Nenhum cliente encontrado"}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
}
