import { useEffect, useState } from "react";

import { Person } from "@mui/icons-material";
import { Item } from "@models/investment-portfolio";
import { WalletService } from "@services/api/wallet";
import {
  Box,
  CircularProgress,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";

import { ProfileChip, StyledFormControl, StyledSelect } from "./styles";

export function Client() {
  const [loadingClientes, setLoadingClientes] = useState(true);

  const [listClient, setListClient] = useState<Item[]>([]);

  const fetchCliente = async () => {
    setLoadingClientes(true);
    try {
      const response = await WalletService.get({});

      setListClient(response.items);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    } finally {
      setLoadingClientes(false);
    }
  };

  const getProfileLabel = (profileId: number) => {
    switch (profileId) {
      case 1:
        return "Conservador";
      case 2:
        return "Moderado";
      case 3:
        return "Arrojado";
      default:
        return "Indefinido";
    }
  };

  const getProfileIcon = (profileId: number) => {
    switch (profileId) {
      case 1:
        return <TrendingDown />;
      case 2:
        return <TrendingFlat />;
      case 3:
        return <TrendingUp />;
      default:
        return <TrendingFlat />;
    }
  };

  const getProfileName = (profileId: number) => {
    switch (profileId) {
      case 1:
        return "conservador";
      case 2:
        return "moderado";
      case 3:
        return "arrojado";
      default:
        return "indefinido";
    }
  };

  useEffect(() => {
    fetchCliente();
  }, []);

  return (
    <StyledFormControl fullWidth error={!!errors.id_client}>
      <InputLabel id="cliente-select-label">Cliente</InputLabel>

      <StyledSelect
        label="Cliente"
        labelId="cliente-select-label"
        value={formData.id_client}
        onChange={handleClienteChange}
        startAdornment={
          <InputAdornment position="start">
            <Person />
          </InputAdornment>
        }
        disabled={loadingClientes}
        endAdornment={
          loadingClientes ? (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ) : null
        }
      >
        {loadingClientes ? (
          <MenuItem value="" disabled>
            Carregando clientes...
          </MenuItem>
        ) : Array.isArray(listClient) && listClient.length > 0 ? (
          listClient.map((c) => (
            <MenuItem key={c.id.toString()} value={c.id}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Typography>{c.name}</Typography>

                <ProfileChip
                  size="small"
                  label={getProfileLabel(Number(c.id_profile))}
                  icon={getProfileIcon(Number(c.id_profile))}
                  color={getProfileName(Number(c.id_profile))}
                />
              </Box>
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>
            Nenhum cliente disponível
          </MenuItem>
        )}
      </StyledSelect>

      {errors.id_client && (
        <FormHelperText error>{errors.id_client}</FormHelperText>
      )}
    </StyledFormControl>
  );
}
