import {
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  JSXElementConstructor,
} from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { IListagemUser } from "@services/api/usuarios/usuarios";
import {
  StyledTableContainer,
  StyledTableHead,
  StyledTableRow,
  UserChip,
} from "./styles";
import { PersonOutline } from "@mui/icons-material";
import { UserEmptyState } from "../EmptyState";
import { UserPagination } from "../Pagination";

interface UserTableProps {
  data?: IListagemUser;
  isLoading: boolean;
  page: number;
  filter: string;
  onPageChange: (page: number) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  data,
  isLoading,
  page,
  filter,
  onPageChange,
}) => {
  const theme = useTheme();

  if (isLoading) {
    return null;
  }

  return (
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
          {data?.items && data.items.length > 0 ? (
            data.items.map(
              (row: {
                id: Key | null | undefined;
                name:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | null
                  | undefined;
                email:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
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
                <UserEmptyState />
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          {data?.total && data.total > 0 && (
            <UserPagination
              page={page}
              totalCount={data.total}
              onPageChange={onPageChange}
            />
          )}
        </TableFooter>
      </Table>
    </StyledTableContainer>
  );
};
