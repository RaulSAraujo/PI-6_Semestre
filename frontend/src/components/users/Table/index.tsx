import { Item } from "@models/user";
import { TableCell } from "@mui/material";
import { Table as TableUi } from "@components/ui";
import { PersonOutline } from "@mui/icons-material";
import { useTableContext } from "@contexts/TableContext";

import { AdminRow, CpfRow, EmailRow, NameRow, StatusRow } from "./Rows";

export function Table() {
  const { page, items, isLoading, totalItems, setPage } = useTableContext();

  return (
    <TableUi
      page={page}
      isLoading={isLoading}
      emptyStateColSpan={5}
      items={items as Item[]}
      totalItems={totalItems}
      ariaLabel="Lista de corretores"
      onPageChange={(page: number) => setPage(page)}
      iconEmpty={<PersonOutline sx={{ fontSize: 48, opacity: 0.5, mb: 2 }} />}
      headers={
        <>
          <TableCell>Nome</TableCell>

          <TableCell>CPF</TableCell>

          <TableCell>Email</TableCell>

          <TableCell>Status</TableCell>

          <TableCell align="center">Admin</TableCell>
        </>
      }
      renderRow={(row) => {
        return (
          <>
            <NameRow name={row.name} />

            <CpfRow cpf={row.cpf} />

            <EmailRow email={row.email} />

            <StatusRow active={row.active} />

            <AdminRow isAdmin={row.is_admin} />
          </>
        );
      }}
    />
  );
}
