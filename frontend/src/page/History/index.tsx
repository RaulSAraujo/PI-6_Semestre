import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Typography,
  LinearProgress,
  Chip,
  IconButton,
  Tooltip,
  alpha,
  styled,
  useTheme,
  Skeleton,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
  TextField,
  InputAdornment,
  Badge,
  Grid,
} from "@mui/material";
import {
  Add,
  Refresh,
  FilterList,
  SortByAlpha,
  Download,
  MoreVert,
  Search,
  History,
  TrendingUp,
  TrendingDown,
  ShowChart,
  BarChart,
  Timeline,
  ArrowUpward,
  ArrowDownward,
  DateRange,
} from "@mui/icons-material";

import { FerramentasDaListagem } from "../../components";
import { LayoutBaseDePagina } from "../../layouts";
import { useDebounce } from "../../hooks";
import {
  HistoricoService,
  IListagemHistorico,
} from "../../services/api/historico/historico";
import { Environment } from "../../environment";

// Componentes estilizados
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  overflow: "hidden",
  boxShadow:
    theme.palette.mode === "dark"
      ? `0 6px 20px ${alpha(theme.palette.common.black, 0.2)}`
      : `0 6px 20px ${alpha(theme.palette.common.black, 0.05)}`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.05)}`,
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  background:
    theme.palette.mode === "dark"
      ? `linear-gradient(90deg, ${alpha(
          theme.palette.primary.dark,
          0.3
        )} 0%, ${alpha(theme.palette.secondary.dark, 0.3)} 100%)`
      : `linear-gradient(90deg, ${alpha(
          theme.palette.primary.light,
          0.2
        )} 0%, ${alpha(theme.palette.secondary.light, 0.2)} 100%)`,
  padding: theme.spacing(2, 3),
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 0,
  boxShadow: "none",
  border: "none",
  "&::-webkit-scrollbar": {
    height: "8px",
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  "& .MuiTableCell-head": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.background.paper, 0.5)
        : alpha(theme.palette.background.default, 0.5),
    fontWeight: 600,
    color: theme.palette.text.primary,
    borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    padding: theme.spacing(1.5, 2),
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "background-color 0.2s ease",
  "&:nth-of-type(odd)": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.background.default, 0.05)
        : alpha(theme.palette.background.default, 0.2),
  },
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.primary.main, 0.1)
        : alpha(theme.palette.primary.main, 0.05),
    cursor: "pointer",
  },
  "& .MuiTableCell-body": {
    padding: theme.spacing(1.5, 2),
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.background.paper, 0.5)
      : alpha(theme.palette.background.paper, 0.8),
  border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
  borderRadius: 12,
  padding: theme.spacing(1),
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    transform: "translateY(-2px)",
  },
}));

const AddButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(1, 2),
  textTransform: "none",
  fontWeight: 600,
  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
  },
}));

const SearchField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.background.paper, 0.5)
        : alpha(theme.palette.background.paper, 0.8),
    transition: "all 0.3s ease",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const EmptyState = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
}));

const ValueChip = styled(Chip)(({ theme, color }) => ({
  borderRadius: 8,
  fontWeight: 600,
  backgroundColor:
    color === "positive"
      ? alpha(theme.palette.success.main, 0.1)
      : color === "negative"
      ? alpha(theme.palette.error.main, 0.1)
      : alpha(theme.palette.primary.main, 0.1),
  color:
    color === "positive"
      ? theme.palette.success.main
      : color === "negative"
      ? theme.palette.error.main
      : theme.palette.primary.main,
  border: `1px solid ${
    color === "positive"
      ? alpha(theme.palette.success.main, 0.2)
      : color === "negative"
      ? alpha(theme.palette.error.main, 0.2)
      : alpha(theme.palette.primary.main, 0.2)
  }`,
  "& .MuiChip-icon": {
    color:
      color === "positive"
        ? theme.palette.success.main
        : color === "negative"
        ? theme.palette.error.main
        : theme.palette.primary.main,
  },
}));

const VolumeChip = styled(Chip)(({ theme }) => ({
  borderRadius: 8,
  fontWeight: 600,
  backgroundColor: alpha(theme.palette.secondary.main, 0.1),
  color: theme.palette.secondary.main,
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
  "& .MuiChip-icon": {
    color: theme.palette.secondary.main,
  },
}));

const PercentageChip = styled(Chip)(({ theme, value }) => {
  const numValue =
    typeof value === "number"
      ? value
      : parseFloat(String(value).replace(/[^\d.-]/g, ""));

  const isPositive = !isNaN(numValue) && numValue > 0;
  const isNegative = !isNaN(numValue) && numValue < 0;
  const color = isPositive
    ? theme.palette.success.main
    : isNegative
    ? theme.palette.error.main
    : theme.palette.grey[500];

  return {
    borderRadius: 8,
    fontWeight: 700,
    backgroundColor: alpha(color, 0.1),
    color: color,
    border: `1px solid ${alpha(color, 0.2)}`,
    "& .MuiChip-icon": {
      color: color,
    },
  };
});

const StatCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(2),
  height: "100%",
  boxShadow:
    theme.palette.mode === "dark"
      ? `0 4px 14px ${alpha(theme.palette.common.black, 0.2)}`
      : `0 4px 14px ${alpha(theme.palette.common.black, 0.05)}`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.05)}`,
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const IconContainer = styled(Box)(({ theme, color }) => ({
  width: 48,
  height: 48,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: alpha(theme.palette[color || "primary"].main, 0.1),
  color: theme.palette[color || "primary"].main,
  marginBottom: theme.spacing(1),
}));

// Componente principal
export const Historico: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { debounce } = useDebounce(800, false);
  const [rows, setRows] = useState<IListagemHistorico>();
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleRefresh = () => {
    setIsLoading(true);
    HistoricoService.getAll().then((result) => {
      setIsLoading(false);
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setRows(result.data);
        setTotalCount(result.totalCount);
      }
    });
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    debounce(() => {
      // Aqui você implementaria a busca real
      handleRefresh();
    });
  };

  // Calcular estatísticas do histórico
  const calculateStats = () => {
    if (!rows?.items || rows.items.length === 0) {
      return {
        avgVolume: 0,
        maxHigh: 0,
        minLow: 0,
        avgChange: 0,
      };
    }

    let totalVolume = 0;
    let maxHigh = -Infinity;
    let minLow = Infinity;
    let totalChange = 0;
    let count = 0;

    rows.items.forEach((item) => {
      // Volume de negociação
      const volume =
        typeof item.trade_volume === "number"
          ? item.trade_volume
          : parseFloat(String(item.trade_volume).replace(/[^\d.-]/g, ""));

      if (!isNaN(volume)) {
        totalVolume += volume;
      }

      // Valor máximo
      const high =
        typeof item.high === "number"
          ? item.high
          : parseFloat(String(item.high).replace(/[^\d.-]/g, ""));

      if (!isNaN(high) && high > maxHigh) {
        maxHigh = high;
      }

      // Valor mínimo
      const low =
        typeof item.low === "number"
          ? item.low
          : parseFloat(String(item.low).replace(/[^\d.-]/g, ""));

      if (!isNaN(low) && low < minLow) {
        minLow = low;
      }

      // Alteração percentual
      const change =
        typeof item.percentage_change === "number"
          ? item.percentage_change
          : parseFloat(String(item.percentage_change).replace(/[^\d.-]/g, ""));

      if (!isNaN(change)) {
        totalChange += change;
        count++;
      }
    });

    return {
      avgVolume: totalVolume / rows.items.length,
      maxHigh: maxHigh === -Infinity ? 0 : maxHigh,
      minLow: minLow === Infinity ? 0 : minLow,
      avgChange: count > 0 ? totalChange / count : 0,
    };
  };

  const stats = calculateStats();

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      HistoricoService.getAll().then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows(result.data);
          setTotalCount(result.totalCount);
        }
      });
    });
  }, []);

  const formatCurrency = (
    value:
      | number
      | string
      | boolean
      | ReactElement<any, string | JSXElementConstructor<any>>
      | ReactFragment
      | ReactPortal
      | null
      | undefined
  ) => {
    if (value === null || value === undefined) return "R$ 0,00";

    const numValue =
      typeof value === "number"
        ? value
        : parseFloat(String(value).replace(/[^\d.-]/g, ""));

    if (isNaN(numValue)) return "R$ 0,00";

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numValue);
  };

  const formatPercentage = (
    value:
      | number
      | string
      | boolean
      | ReactElement<any, string | JSXElementConstructor<any>>
      | ReactFragment
      | ReactPortal
      | null
      | undefined
  ) => {
    if (value === null || value === undefined) return "0,00%";

    const numValue =
      typeof value === "number"
        ? value
        : parseFloat(String(value).replace(/[^\d.-]/g, ""));

    if (isNaN(numValue)) return "0,00%";

    return new Intl.NumberFormat("pt-BR", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numValue / 100);
  };

  const formatVolume = (
    value:
      | number
      | string
      | boolean
      | ReactElement<any, string | JSXElementConstructor<any>>
      | ReactFragment
      | ReactPortal
      | null
      | undefined
  ) => {
    if (value === null || value === undefined) return "0";

    const numValue =
      typeof value === "number"
        ? value
        : parseFloat(String(value).replace(/[^\d.-]/g, ""));

    if (isNaN(numValue)) return "0";

    return new Intl.NumberFormat("pt-BR").format(numValue);
  };

  return (
    <LayoutBaseDePagina
      titulo={"Histórico da Ação"}
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoBotaoNovo="Novo histórico"
          aoClicarEmNovo={() => navigate("/Novohistorico")}
        />
      }
    >
      <Box sx={{ p: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
          mb={3}
        >
          <Typography
            variant="h5"
            component="h2"
            color="primary"
            fontWeight="700"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <History sx={{ mr: 1 }} />
            Histórico de Cotações
          </Typography>

          <Box display="flex" gap={2}>
            <SearchField
              size="small"
              placeholder="Buscar por data..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <Tooltip title="Atualizar">
              <ActionButton onClick={handleRefresh}>
                <Refresh />
              </ActionButton>
            </Tooltip>

            <AddButton
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => navigate("/Novohistorico")}
            >
              Novo Histórico
            </AddButton>
          </Box>
        </Box>

        {/* Dashboard Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
              >
                <IconContainer color="primary">
                  <ShowChart />
                </IconContainer>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  Maior Alta
                </Typography>
                <Typography variant="h5" color="primary" fontWeight="700">
                  {formatCurrency(stats.maxHigh)}
                </Typography>
              </Box>
            </StatCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
              >
                <IconContainer color="error">
                  <TrendingDown />
                </IconContainer>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  Menor Baixa
                </Typography>
                <Typography variant="h5" color="error" fontWeight="700">
                  {formatCurrency(stats.minLow)}
                </Typography>
              </Box>
            </StatCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
              >
                <IconContainer color="secondary">
                  <BarChart />
                </IconContainer>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  Volume Médio
                </Typography>
                <Typography variant="h5" color="secondary" fontWeight="700">
                  {formatVolume(stats.avgVolume)}
                </Typography>
              </Box>
            </StatCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
              >
                <IconContainer
                  color={stats.avgChange > 0 ? "success" : "error"}
                >
                  {stats.avgChange > 0 ? <ArrowUpward /> : <ArrowDownward />}
                </IconContainer>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  Variação Média
                </Typography>
                <Typography
                  variant="h5"
                  color={stats.avgChange > 0 ? "success.main" : "error.main"}
                  fontWeight="700"
                >
                  {formatPercentage(stats.avgChange)}
                </Typography>
              </Box>
            </StatCard>
          </Grid>
        </Grid>

        <StyledCard>
          <StyledCardHeader
            title={
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1" fontWeight="600">
                  Histórico de Cotações
                </Typography>

                <Box display="flex" gap={1}>
                  <Badge
                    badgeContent={rows?.total || 0}
                    color="primary"
                    sx={{
                      "& .MuiBadge-badge": {
                        borderRadius: 8,
                        fontWeight: 600,
                      },
                    }}
                  >
                    <Chip
                      label="Total de Registros"
                      size="small"
                      sx={{
                        fontWeight: 600,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      }}
                    />
                  </Badge>

                  <Tooltip title="Filtrar por Data">
                    <IconButton size="small">
                      <DateRange fontSize="small" />
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
            }
          />

          <Divider />

          {isLoading && (
            <Box sx={{ p: 2 }}>
              <LinearProgress
                variant="indeterminate"
                sx={{
                  height: 6,
                  borderRadius: 3,
                  mb: 2,
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                }}
              />
              {[1, 2, 3, 4].map((item) => (
                <Box key={item} sx={{ display: "flex", mb: 2 }}>
                  <Skeleton
                    variant="rectangular"
                    width={80}
                    height={32}
                    sx={{ mr: 2, borderRadius: 1 }}
                  />
                  <Box width="100%">
                    <Skeleton variant="text" width="40%" height={24} />
                    <Skeleton variant="text" width="60%" height={20} />
                  </Box>
                </Box>
              ))}
            </Box>
          )}

          {!isLoading && (
            <StyledTableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="tabela de histórico">
                <StyledTableHead>
                  <TableRow>
                    <TableCell>Último Valor</TableCell>
                    <TableCell>Abertura</TableCell>
                    <TableCell>Máxima</TableCell>
                    <TableCell>Mínima</TableCell>
                    <TableCell>Volume</TableCell>
                    <TableCell>Variação</TableCell>
                    <TableCell align="right">Ações</TableCell>
                  </TableRow>
                </StyledTableHead>

                <TableBody>
                  {rows?.items && rows.items.length > 0 ? (
                    rows.items.map((row) => {
                      // Converter string para número para comparação
                      const percentChange =
                        typeof row.percentage_change === "number"
                          ? row.percentage_change
                          : parseFloat(
                              String(row.percentage_change).replace(
                                /[^\d.-]/g,
                                ""
                              )
                            );

                      const isPositive =
                        !isNaN(percentChange) && percentChange > 0;
                      const isNegative =
                        !isNaN(percentChange) && percentChange < 0;

                      return (
                        <StyledTableRow
                          key={row.id}
                          onClick={() => navigate(`/historico/${row.id}`)}
                        >
                          <TableCell>
                            <ValueChip
                              size="small"
                              label={formatCurrency(row.last_value)}
                              color="neutral"
                              icon={<ShowChart />}
                            />
                          </TableCell>
                          <TableCell>
                            <ValueChip
                              size="small"
                              label={formatCurrency(row.opening)}
                              color="neutral"
                            />
                          </TableCell>
                          <TableCell>
                            <ValueChip
                              size="small"
                              label={formatCurrency(row.high)}
                              color="positive"
                              icon={<ArrowUpward />}
                            />
                          </TableCell>
                          <TableCell>
                            <ValueChip
                              size="small"
                              label={formatCurrency(row.low)}
                              color="negative"
                              icon={<ArrowDownward />}
                            />
                          </TableCell>
                          <TableCell>
                            <VolumeChip
                              size="small"
                              label={formatVolume(row.trade_volume)}
                              icon={<BarChart />}
                            />
                          </TableCell>
                          <TableCell>
                            <PercentageChip
                              size="small"
                              label={formatPercentage(row.percentage_change)}
                              value={percentChange}
                              icon={
                                isPositive ? (
                                  <ArrowUpward />
                                ) : isNegative ? (
                                  <ArrowDownward />
                                ) : (
                                  <TrendingDown />
                                )
                              }
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip title="Mais opções">
                              <IconButton size="small">
                                <MoreVert fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </StyledTableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7}>
                        <EmptyState>
                          <History sx={{ fontSize: 48, opacity: 0.5, mb: 2 }} />
                          <Typography variant="subtitle1" gutterBottom>
                            {Environment.LISTAGEM_VAZIA}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                          >
                            Nenhum histórico de cotação encontrado
                          </Typography>
                          <AddButton
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                            onClick={() => navigate("/Novohistorico")}
                            sx={{ mt: 2 }}
                          >
                            Adicionar Histórico
                          </AddButton>
                        </EmptyState>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>

                <TableFooter>
                  {isLoading && (
                    <TableRow>
                      <TableCell colSpan={7}>
                        <LinearProgress variant="indeterminate" />
                      </TableCell>
                    </TableRow>
                  )}
                </TableFooter>
              </Table>
            </StyledTableContainer>
          )}
        </StyledCard>
      </Box>
    </LayoutBaseDePagina>
  );
};
