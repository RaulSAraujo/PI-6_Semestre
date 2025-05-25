import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
  Pagination,
  Chip,
  TextField,
  InputAdornment,
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
  Badge,
} from "@mui/material";
import {
  Search,
  Refresh,
  FilterList,
  SortByAlpha,
  Download,
  Add,
  TrendingUp,
  TrendingFlat,
  TrendingDown,
  Category,
  MoreVert,
  AccountBalance,
} from "@mui/icons-material";

import { Environment } from "../../environment";
import { LayoutBaseDePagina } from "../../layouts";
import {
  PerfilService,
  IListagemPerfil,
} from "../../services/api/perfil/perfil";
import { useDebounce } from "../../hooks/UseDebounce";

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

const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    borderRadius: 8,
    margin: theme.spacing(0, 0.5),
    transition: "all 0.2s ease",
  },
  "& .MuiPaginationItem-page.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
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

const ProfileChip = styled(Chip)(({ theme, color }) => ({
  borderRadius: 8,
  fontWeight: 500,
  backgroundColor:
    color === "conservador"
      ? alpha(theme.palette.info.main, 0.1)
      : color === "moderado"
      ? alpha(theme.palette.warning.main, 0.1)
      : alpha(theme.palette.error.main, 0.1),
  color:
    color === "conservador"
      ? theme.palette.info.main
      : color === "moderado"
      ? theme.palette.warning.main
      : theme.palette.error.main,
  border: `1px solid ${
    color === "conservador"
      ? alpha(theme.palette.info.main, 0.2)
      : color === "moderado"
      ? alpha(theme.palette.warning.main, 0.2)
      : alpha(theme.palette.error.main, 0.2)
  }`,
  "& .MuiChip-icon": {
    color:
      color === "conservador"
        ? theme.palette.info.main
        : color === "moderado"
        ? theme.palette.warning.main
        : theme.palette.error.main,
  },
}));

const TypeChip = styled(Chip)(({ theme }) => ({
  borderRadius: 8,
  fontWeight: 500,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  "& .MuiChip-icon": {
    color: theme.palette.primary.main,
  },
}));

const ProfileIcon = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  marginRight: theme.spacing(2),
}));

// Componente principal
export const Perfil: React.FC = () => {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(800, false);
  const [rows, setRows] = useState<IListagemPerfil>();
  const [totalCount, setTotalCount] = useState(rows?.total);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const filter = useMemo(() => {
    return searchParams.get("filter") || "";
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get("page") || "1");
  }, [searchParams]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    debounce(() => {
      setSearchParams({ filter: value, page: "1" }, { replace: true });
    });
  };

  const handleRefresh = () => {
    setIsLoading(true);
    PerfilService.getAll().then((result) => {
      setIsLoading(false);
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalCount(result.totalCount);
        setRows(result.data);
      }
    });
  };

  const getProfileIcon = (description: string) => {
    if (description.toLowerCase().includes("conservador")) {
      return <TrendingDown />;
    } else if (description.toLowerCase().includes("moderado")) {
      return <TrendingFlat />;
    } else if (description.toLowerCase().includes("agressivo")) {
      return <TrendingUp />;
    }
    return <AccountBalance />;
  };

  const getProfileColor = (description: string) => {
    if (description.toLowerCase().includes("conservador")) {
      return "conservador";
    } else if (description.toLowerCase().includes("moderado")) {
      return "moderado";
    } else if (description.toLowerCase().includes("agressivo")) {
      return "agressivo";
    }
    return "moderado";
  };

  useEffect(() => {
    setIsLoading(true);

    debounce(() =>
      PerfilService.getAll().then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);

          setTotalCount(result.totalCount);
          setRows(result.data);
        }
      })
    );
  }, [filter, page]);

  return (
    <LayoutBaseDePagina titulo={"Perfis de Investimento"}>
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
            <Category sx={{ mr: 1 }} />
            Perfis de Investimento
          </Typography>

          <Box display="flex" gap={2}>
            <SearchField
              size="small"
              placeholder="Buscar perfis..."
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

            <Tooltip title="Adicionar perfil">
              <ActionButton color="primary">
                <Add />
              </ActionButton>
            </Tooltip>
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
                  Lista de Perfis
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
                      label="Total de Perfis"
                      size="small"
                      sx={{
                        fontWeight: 600,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      }}
                    />
                  </Badge>

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
                    variant="circular"
                    width={40}
                    height={40}
                    sx={{ mr: 2 }}
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
              <Table sx={{ minWidth: 650 }} aria-label="tabela de perfis">
                <StyledTableHead>
                  <TableRow>
                    <TableCell>Perfil</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell align="right">Ações</TableCell>
                  </TableRow>
                </StyledTableHead>

                <TableBody>
                  {rows?.items && rows.items.length > 0 ? (
                    rows.items.map((row) => (
                      <StyledTableRow key={row.id}>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <ProfileIcon>
                              {getProfileIcon(String(row.description))}
                            </ProfileIcon>
                            <Box>
                              <Typography variant="body1" fontWeight="500">
                                {row.description}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="textSecondary"
                              >
                                ID: {row.id}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <ProfileChip
                            size="small"
                            label={String(row.type)}
                            icon={getProfileIcon(String(row.description))}
                            color={getProfileColor(String(row.description))}
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
                      <TableCell colSpan={3}>
                        <EmptyState>
                          <Category
                            sx={{ fontSize: 48, opacity: 0.5, mb: 2 }}
                          />
                          <Typography variant="subtitle1" gutterBottom>
                            {Environment.LISTAGEM_VAZIA}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Nenhum perfil de investimento encontrado
                          </Typography>
                        </EmptyState>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>

                <TableFooter>
                  {isLoading && (
                    <TableRow>
                      <TableCell colSpan={3}>
                        <LinearProgress variant="indeterminate" />
                      </TableCell>
                    </TableRow>
                  )}
                  {rows?.total && rows.total > 0 && (
                    <TableRow>
                      <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                        <StyledPagination
                          page={page}
                          count={Math.ceil(rows.total / 8)}
                          onChange={(_, value) =>
                            setSearchParams(
                              { page: value.toString(), filter },
                              { replace: true }
                            )
                          }
                          color="primary"
                          shape="rounded"
                          showFirstButton
                          showLastButton
                        />
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
