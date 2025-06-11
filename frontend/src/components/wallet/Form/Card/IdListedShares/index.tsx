import { useEffect, useState } from "react";

import { Item } from "@models/listed-shares";
import { ShowChart } from "@mui/icons-material";
import { ActionB3Service } from "@services/api/action";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import { TickerChip } from "./styles";

type Props = {
  idClient: string;
  idListedShares: string;
  onChange: (id: string) => void;
};

export function IdListedShares({ idListedShares, idClient, onChange }: Props) {
  const [loading, setLoading] = useState(true);

  const [listShare, setListShare] = useState<Item[]>([]);

  const [recommendation, setRecommendation] = useState<Item[]>([]);

  const fetch = async () => {
    setLoading(true);

    try {
      const response = await ActionB3Service.get({});

      setListShare(response.items);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (idClient) {
      const filtered = listShare.filter(
        (e) => e.id_profile === parseInt(idClient)
      );

      setRecommendation(filtered);
    }
  }, [idClient]);

  return (
    <FormControl fullWidth>
      <InputLabel id="shares-select-label">Ações</InputLabel>

      <Select
        required
        label="Ações"
        value={idListedShares}
        disabled={loading}
        labelId="shares-select-label"
        onChange={(e) => onChange(e.target.value)}
      >
        {Array.isArray(recommendation) && recommendation.length > 0 && (
          <>
            <MenuItem key="no-actions" value="nones" disabled>
              Recomendações
            </MenuItem>

            {recommendation.map((a) => (
              <MenuItem key={a.name} value={a.id}>
                <Box display="flex" alignItems="center">
                  <TickerChip
                    size="small"
                    label={a.ticker}
                    icon={<ShowChart />}
                    sx={{ mr: 1 }}
                  />

                  <Typography>{a.name}</Typography>
                </Box>
              </MenuItem>
            ))}
          </>
        )}

        <MenuItem value="" disabled>
          Todas as ações
        </MenuItem>

        {Array.isArray(listShare) && listShare.length > 0 ? (
          listShare.map((a) => (
            <MenuItem key={a.name} value={a.id}>
              <Box display="flex" alignItems="center">
                <TickerChip
                  size="small"
                  label={a.ticker}
                  icon={<ShowChart />}
                  sx={{ mr: 1 }}
                />

                <Typography>{a.name}</Typography>
              </Box>
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>
            Nenhuma ação disponível para este perfil
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
}
