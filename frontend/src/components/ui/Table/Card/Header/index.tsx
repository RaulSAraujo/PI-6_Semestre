import {
  Box,
  Chip,
  IconButton,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { FilterList, SortByAlpha, Download } from "@mui/icons-material";

interface Props {
  title: string;
  totalItems?: number;
}

export function Header({ title, totalItems }: Props) {
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography variant="subtitle1" fontWeight="600">
        {title}
      </Typography>

      <Box display="flex" gap={1}>
        <Chip
          label={`Total: ${totalItems}`}
          size="small"
          sx={{
            fontWeight: 600,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
          }}
        />

        <Tooltip title="Filtrar">
          <IconButton size="small">
            <FilterList fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Ordenar">
          <IconButton size="small">
            <SortByAlpha fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Exportar">
          <IconButton size="small">
            <Download fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
