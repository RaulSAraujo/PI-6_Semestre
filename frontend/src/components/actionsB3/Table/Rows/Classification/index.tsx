import { Category } from "@mui/icons-material";
import { alpha, TableCell, Tooltip, useTheme } from "@mui/material";

import { SectorChip } from "./styles";

type Props = {
  classification: string;
};

export function ClassificationRow({ classification }: Props) {
  const theme = useTheme();

  const getSectorColor = (sector: string) => {
    const sectors: Record<string, string> = {
      Financeiro: "#1E88E5",
      Tecnologia: "#7B1FA2",
      Consumo: "#43A047",
      Energia: "#F57C00",
      Saúde: "#E53935",
      Industrial: "#546E7A",
      Materiais: "#8D6E63",
      Telecomunicações: "#00ACC1",
      Utilidades: "#3949AB",
      Imobiliário: "#D81B60",
    };

    // Procura por palavras-chave no setor para determinar a cor
    for (const [key, value] of Object.entries(sectors)) {
      if (sector.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }

    // Cor padrão se nenhuma correspondência for encontrada
    return theme.palette.secondary.main;
  };

  return (
    <TableCell>
      <Tooltip title={classification}>
        <SectorChip
          size="small"
          label={classification.substring(0, 30)}
          icon={<Category />}
          sx={{
            backgroundColor: alpha(getSectorColor(classification), 0.1),
            color: getSectorColor(classification),
            borderColor: alpha(getSectorColor(classification), 0.2),
            "& .MuiChip-icon": {
              color: getSectorColor(classification),
            },
          }}
        />
      </Tooltip>
    </TableCell>
  );
}
