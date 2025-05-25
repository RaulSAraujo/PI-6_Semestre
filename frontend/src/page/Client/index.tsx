import { useNavigate } from "react-router-dom";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
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
  Avatar,
  Badge,
} from "@mui/material";
import {
  Add,
  Refresh,
  PersonOutline,
  FilterList,
  SortByAlpha,
  Download,
  Business,
  Person,
  TrendingUp,
  TrendingFlat,
  TrendingDown,
  MoreVert,
} from "@mui/icons-material";

import { FerramentasDaListagem } from "../../components";
import { LayoutBaseDePagina } from "../../layouts";
import { useDebounce } from "../../hooks";
import {
  ClientesService,
  IListagemCliente,
} from "../../services/api/cliente/clientes";
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
    color === "primary"
      ? alpha(theme.palette.info.main, 0.1)
      : color === "secondary"
      ? alpha(theme.palette.warning.main, 0.1)
      : alpha(theme.palette.error.main, 0.1),
  color:
    color === "primary"
      ? theme.palette.info.main
      : color === "secondary"
      ? theme.palette.warning.main
      : theme.palette.error.main,
  border: `1px solid ${
    color === "primary"
      ? alpha(theme.palette.info.main, 0.2)
      : color === "secondary"
      ? alpha(theme.palette.warning.main, 0.2)
      : alpha(theme.palette.error.main, 0.2)
  }`,
  "& .MuiChip-icon": {
    color:
      color === "primary"
        ? theme.palette.info.main
        : color === "secondary"
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

const ClientAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  fontWeight: 600,
  border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
}));

// Componente principal
export const Clientes: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { debounce } = useDebounce(800, false);
  const [rows, setRows] = useState<IListagemCliente>();
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleRefresh = () => {
    setIsLoading(true);
    ClientesService.getAll().then((result) => {
      setIsLoading(false);
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setRows(result.data);
        setTotalCount(result.totalCount);
      }
    });
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
        return "agressivo";
      default:
        return "indefinido";
    }
  };

  const getProfileLabel = (profileId: number) => {
    switch (profileId) {
      case 1:
        return "Conservador";
      case 2:
        return "Moderado";
      case 3:
        return "Agressivo";
      default:
        return "Indefinido";
    }
  };

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      ClientesService.getAll().then((result) => {
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
      titulo={"Clientes"}
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoBotaoNovo="Novo Cliente"
          aoClicarEmNovo={() => navigate("/novoclientes")}
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
            <PersonOutline sx={{ mr: 1 }} />
            Gerenciamento de Clientes
          </Typography>

          <Box display="flex" gap={2}>
            <Tooltip title="Atualizar">
              <ActionButton onClick={handleRefresh}>
                <Refresh />
              </ActionButton>
            </Tooltip>

            <AddButton
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => navigate("/novoclientes")}
            >
              Novo Cliente
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
                  Lista de Clientes
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
              <Table sx={{ minWidth: 650 }} aria-label="tabela de clientes">
                <StyledTableHead>
                  <TableRow>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Perfil</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell align="right">Ações</TableCell>
                  </TableRow>
                </StyledTableHead>

                <TableBody>
                  {rows?.items && rows.items.length > 0 ? (
                    rows.items.map(
                      (row: {
                        id:
                          | boolean
                          | ReactElement<
                              any,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | Key
                          | null
                          | undefined;
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
                        id_profile: any;
                        type:
                          | string
                          | number
                          | boolean
                          | ReactElement<
                              any,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | null
                          | undefined;
                      }) => (
                        <StyledTableRow
                          onClick={() => navigate(`/clientes/${row.id}`)}
                        >
                          <TableCell component="th" scope="row">
                            <Box display="flex" alignItems="center">
                              <ClientAvatar>
                                {String(row.name).charAt(0).toUpperCase()}
                              </ClientAvatar>
                              <Box ml={2}>
                                <Typography variant="body1" fontWeight="500">
                                  {row.name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="textSecondary"
                                >
                                  ID: {`${row.id}`}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <ProfileChip
                              size="small"
                              label={getProfileLabel(Number(row.id_profile))}
                              icon={getProfileIcon(Number(row.id_profile))}
                              color={getProfileName(Number(row.id_profile))}
                            />
                          </TableCell>
                          <TableCell>
                            <TypeChip
                              size="small"
                              label={row.type}
                              icon={
                                row.type === "Pessoa Física" ? (
                                  <Person />
                                ) : (
                                  <Business />
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
                      )
                    )
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <EmptyState>
                          <PersonOutline
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
                            Nenhum cliente cadastrado até o momento
                          </Typography>
                          <AddButton
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                            onClick={() => navigate("/novoclientes")}
                            sx={{ mt: 2 }}
                          >
                            Adicionar Cliente
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
