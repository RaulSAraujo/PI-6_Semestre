import { Item } from "@models/profiles";
import { TableCell } from "@mui/material";
import { Category } from "@mui/icons-material";
import { Table as TableUi } from "@components/ui";
import { useTableContext } from "@contexts/TableContext";

import { ProfileRow, TypeRow } from "./Rows";

export function Table() {
  const { page, items, isLoading, totalItems, setPage } = useTableContext();

  return (
    <TableUi
      page={page}
      isLoading={isLoading}
      emptyStateColSpan={2}
      items={items as Item[]}
      totalItems={totalItems}
      ariaLabel="Lista de perfis"
      onPageChange={(page: number) => setPage(page)}
      iconEmpty={<Category sx={{ fontSize: 48, opacity: 0.5, mb: 2 }} />}
      headers={
        <>
          <TableCell>Perfil</TableCell>

          <TableCell>Tipo</TableCell>
        </>
      }
      renderRow={(row) => {
        return (
          <>
            <ProfileRow
              id={row.id}
              description={row.description?.toLowerCase()}
            />

            <TypeRow
              type={row.type}
              description={row.description?.toLowerCase()}
            />
          </>
        );
      }}
    />
  );
}
