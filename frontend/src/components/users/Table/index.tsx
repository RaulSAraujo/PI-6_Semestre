import { Item } from "@models/user";
import { TableCell } from "@mui/material";
import { Table as TableUi } from "@components/ui";
import { PersonOutline } from "@mui/icons-material";

import { AdminRow, CpfRow, EmailRow, NameRow, StatusRow } from "./Rows";

interface Props {
  page: number;
  items: Item[];
  isLoading: boolean;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export function Table(props: Props) {
  const { page, items, isLoading, totalItems, onPageChange } = props;

  return (
    <TableUi
      page={page}
      items={items}
      isLoading={isLoading}
      emptyStateColSpan={5}
      totalItems={totalItems}
      onPageChange={onPageChange}
      ariaLabel="Lista de usuários"
      iconEmpty={<PersonOutline sx={{ fontSize: 48, opacity: 0.5, mb: 2 }} />}
      headers={
        <>
          <TableCell>Nome</TableCell>

          <TableCell>CPF</TableCell>

          <TableCell>Email</TableCell>

          <TableCell>Admin</TableCell>

          <TableCell align="right">Status</TableCell>
        </>
      }
      renderRow={(row) => {
        return (
          <>
            <NameRow name={row.name} />

            <CpfRow cpf={row.cpf} />

            <EmailRow email={row.email} />

            <AdminRow isAdmin={row.is_admin} />

            <StatusRow active={row.active} />
          </>
        );
      }}
    />
  );
}
