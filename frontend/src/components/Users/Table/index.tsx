import { Item } from "@types/user";
import { PersonOutline } from "@mui/icons-material";
import {
  alpha,
  Box,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
  Table as TB,
  useTheme,
} from "@mui/material";

import { Skeleton } from "./Skeleton";
import { Pagination } from "./Pagination";
import { EmptyState } from "./EmptyState";
import {
  StyledTableContainer,
  StyledTableHead,
  StyledTableRow,
  UserChip,
} from "./styles";

interface Props {
  page: number;
  items?: Item[];
  filter: string;
  isLoading: boolean;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export function Table(props: Props) {
  const { page, items, isLoading, totalItems, onPageChange } = props;

  const theme = useTheme();

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <StyledTableContainer>
      <TB sx={{ minWidth: 650 }} aria-label="tabela de usuários">
        <StyledTableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>CPF</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </StyledTableHead>

        <TableBody>
          {items && items.length > 0 ? (
            items.map((row) => (
              <StyledTableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <Box
                      sx={{
                        mr: 2,
                        width: 36,
                        height: 36,
                        display: "flex",
                        fontWeight: "bold",
                        borderRadius: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                        color: theme.palette.primary.main,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      }}
                    >
                      {row.name.charAt(0).toUpperCase()}
                    </Box>

                    {row.name}
                  </Box>
                </TableCell>
                <TableCell>{row.cpf}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.is_admin ? "Sim" : "Não"}</TableCell>
                <TableCell align="right">
                  <UserChip
                    size="small"
                    label="Ativo"
                    icon={<PersonOutline />}
                  />
                </TableCell>
              </StyledTableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>
                <EmptyState />
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <Pagination
            page={page}
            totalCount={totalItems}
            onPageChange={onPageChange}
          />
        </TableFooter>
      </TB>
    </StyledTableContainer>
  );
}
