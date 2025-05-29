import { Item } from "@models/Client";
import {
  Add,
  Business,
  MoreVert,
  Person,
  PersonOutline,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  LinearProgress,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  AddButton,
  ClientAvatar,
  EmptyState,
  ProfileChip,
  StyledTableContainer,
  StyledTableHead,
  StyledTableRow,
  TypeChip,
} from "./styles";

type Props = {
  rows: Item[];
  isLoading: boolean;
  navigate: (path: string) => void;
};

export function Table({ rows, isLoading, navigate }: Props) {
  const getProfileLabel = (id: number) => {
    switch (id) {
      case 1:
        return "Administrador";
      case 2:
        return "Gerente";
      case 3:
        return "Usuário";
      default:
        return "Desconhecido";
    }
  };

  const getProfileIcon = (id: number) => {
    switch (id) {
      case 1:
        return <Person />;
      case 2:
        return <Business />;
      case 3:
        return <PersonOutline />;
      default:
        return <PersonOutline />;
    }
  };

  const getProfileColor = (id: number) => {
    switch (id) {
      case 1:
        return "primary";
      case 2:
        return "secondary";
      case 3:
        return "default";
      default:
        return "default";
    }
  };

  if (!rows || !Array.isArray(rows.items)) {
    return (
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
              rows.items.map((row) => (
                <StyledTableRow
                  key={row.id}
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
                        <Typography variant="caption" color="textSecondary">
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
                      color={getProfileColor(Number(row.id_profile))}
                    />
                  </TableCell>
                  <TableCell>
                    <TypeChip
                      size="small"
                      label={row.type}
                      icon={
                        row.type === "Pessoa Física" ? <Person /> : <Business />
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>
                  <EmptyState>
                    <PersonOutline sx={{ fontSize: 48, opacity: 0.5, mb: 2 }} />
                    <Typography variant="subtitle1" gutterBottom>
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
    );
  }
}
