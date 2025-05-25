import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
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
  Divider,
} from "@mui/material";
import {
  Search,
  Refresh,
  PersonOutline,
  FilterList,
  SortByAlpha,
  Download,
  Add,
} from "@mui/icons-material";

import { Environment } from "../../shared/environment";
import { LayoutBaseDePagina } from "../../shared/layouts";
import {
  UserService,
  IListagemUser,
} from "../../shared/services/api/usuarios/usuarios";
import { useDebounce } from "../../shared/hooks/UseDebounce";

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

const UserChip = styled(Chip)(({ theme }) => ({
  borderRadius: 8,
  fontWeight: 500,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  "& .MuiChip-icon": {
    color: theme.palette.primary.main,
  },
}));

// Componente principal
export const Usuarios: React.FC = () => {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(800, false);
  const [rows, setRows] = useState<IListagemUser>();
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
    UserService.getAll().then((result) => {
      setIsLoading(false);
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalCount(result.totalCount);
        setRows(result.data);
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);

    debounce(() =>
      UserService.getAll().then((result) => {
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
    <LayoutBaseDePagina titulo={"Usuários"}>
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
            <PersonOutline sx={{ mr: 1 }} />
            Gerenciamento de Usuários
          </Typography>

          <Box display="flex" gap={2}>
            <SearchField
              size="small"
              placeholder="Buscar usuários..."
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

            <Tooltip title="Adicionar usuário">
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
                  Lista de Usuários
                </Typography>

                <Box display="flex" gap={1}>
                  <Chip
                    label={`Total: ${rows?.total || 0}`}
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
              <Table sx={{ minWidth: 650 }} aria-label="tabela de usuários">
                <StyledTableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </StyledTableHead>

                <TableBody>
                  {rows?.items && rows.items.length > 0 ? (
                    rows.items.map(
                      (row: {
                        id: Key | null | undefined;
                        name:
                          | string
                          | number
                          | boolean
                          | ReactElement<
                              any,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | ReactPortal
                          | null
                          | undefined;
                        email:
                          | string
                          | number
                          | boolean
                          | ReactElement<
                              any,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | ReactPortal
                          | null
                          | undefined;
                      }) => (
                        <StyledTableRow key={row.id}>
                          <TableCell component="th" scope="row">
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
                                {String(row.name).charAt(0).toUpperCase()}
                              </Box>
                              <Typography variant="body1" fontWeight="500">
                                {row.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell align="right">
                            <UserChip
                              size="small"
                              label="Ativo"
                              icon={<PersonOutline />}
                            />
                          </TableCell>
                        </StyledTableRow>
                      )
                    )
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3}>
                        <EmptyState>
                          <PersonOutline
                            sx={{ fontSize: 48, opacity: 0.5, mb: 2 }}
                          />
                          <Typography variant="subtitle1" gutterBottom>
                            {Environment.LISTAGEM_VAZIA}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Tente ajustar os filtros ou adicionar novos usuários
                          </Typography>
                        </EmptyState>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>

                <TableFooter>
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
