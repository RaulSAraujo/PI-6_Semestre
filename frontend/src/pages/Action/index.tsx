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
} from "@mui/material";
import {
  Add,
  Refresh,
  FilterList,
  SortByAlpha,
  Download,
  MoreVert,
  Search,
  ShowChart,
  TrendingUp,
  Business,
  Category,
} from "@mui/icons-material";

import { FerramentasDaListagem } from "../../components";
import { LayoutBaseDePagina } from "@layouts/LayoutBase";
import { useDebounce } from "@hooks/UseDebounce";
import {
  IListagemlistedshares,
  listedsharesService,
} from "../../services/api/acoes_listadas/acoes_listadas";
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

const TickerChip = styled(Chip)(({ theme }) => ({
  borderRadius: 8,
  fontWeight: 700,
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  color: theme.palette.primary.main,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  "& .MuiChip-icon": {
    color: theme.palette.primary.main,
  },
}));

const SectorChip = styled(Chip)(({ theme }) => ({
  borderRadius: 8,
  fontWeight: 500,
  backgroundColor: alpha(theme.palette.secondary.main, 0.1),
  color: theme.palette.secondary.main,
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
  "& .MuiChip-icon": {
    color: theme.palette.secondary.main,
  },
}));

// Componente principal
export const AcoesListadas: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { debounce } = useDebounce(800, false);
  const [rows, setRows] = useState<IListagemlistedshares>();
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleRefresh = () => {
    setIsLoading(true);
    listedsharesService.getAll().then((result) => {
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

  // Função para obter uma cor baseada no setor
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

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      listedsharesService.getAll().then((result) => {
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

  return (
    <LayoutBaseDePagina
      titulo={"Ações Listadas"}
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoBotaoNovo="Nova ação"
          aoClicarEmNovo={() => navigate("/NovaAcao")}
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
            <ShowChart sx={{ mr: 1 }} />
            Ações Listadas na B3
          </Typography>

          <Box display="flex" gap={2}>
            <SearchField
              size="small"
              placeholder="Buscar ações..."
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
              onClick={() => navigate("/NovaAcao")}
            >
              Nova Ação
            </AddButton>
          </Box>
        </Box>

        <StyledCard>
          <StyledCardHeader
            title={
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1" fontWeight="600">
                  Ações Disponíveis para Investimento
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
                      label="Total de Ações"
                      size="small"
                      sx={{
                        fontWeight: 600,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      }}
                    />
                  </Badge>

                  <Tooltip title="Filtrar por Setor">
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
              <Table
                sx={{ minWidth: 650 }}
                aria-label="tabela de ações listadas"
              >
                <StyledTableHead>
                  <TableRow>
                    <TableCell>Ticker</TableCell>
                    <TableCell>Nome da Empresa</TableCell>
                    <TableCell>Setor B3</TableCell>
                    <TableCell align="right">Ações</TableCell>
                  </TableRow>
                </StyledTableHead>

                <TableBody>
                  {rows?.items && rows.items.length > 0 ? (
                    rows.items.map((row) => (
                      <StyledTableRow
                        key={row.id}
                        onClick={() => navigate(`/acoes/${row.id}`)}
                      >
                        <TableCell>
                          <TickerChip
                            size="small"
                            label={row.ticker}
                            icon={<TrendingUp />}
                          />
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Box
                              sx={{
                                width: 36,
                                height: 36,
                                borderRadius: "50%",
                                backgroundColor: alpha(
                                  theme.palette.primary.main,
                                  0.1
                                ),
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mr: 2,
                                color: theme.palette.primary.main,
                                fontWeight: "bold",
                              }}
                            >
                              <Business />
                            </Box>
                            <Typography variant="body1" fontWeight="500">
                              {row.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <SectorChip
                            size="small"
                            label={String(row.b3_sector_classification)}
                            icon={<Category />}
                            sx={{
                              backgroundColor: alpha(
                                getSectorColor(
                                  String(row.b3_sector_classification)
                                ),
                                0.1
                              ),
                              color: getSectorColor(
                                String(row.b3_sector_classification)
                              ),
                              borderColor: alpha(
                                getSectorColor(
                                  String(row.b3_sector_classification)
                                ),
                                0.2
                              ),
                              "& .MuiChip-icon": {
                                color: getSectorColor(
                                  String(row.b3_sector_classification)
                                ),
                              },
                            }}
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
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <EmptyState>
                          <ShowChart
                            sx={{ fontSize: 48, opacity: 0.5, mb: 2 }}
                          />
                          <Typography variant="subtitle1" gutterBottom>
                            {Environment.LISTAGEM_VAZIA}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                          >
                            Nenhuma ação listada encontrada
                          </Typography>
                          <AddButton
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                            onClick={() => navigate("/NovaAcao")}
                            sx={{ mt: 2 }}
                          >
                            Adicionar Ação
                          </AddButton>
                        </EmptyState>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>

                <TableFooter>
                  {isLoading && (
                    <TableRow>
                      <TableCell colSpan={4}>
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
