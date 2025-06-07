import { Item } from "@models/profiles";
import { TableCell } from "@mui/material";
import { Category } from "@mui/icons-material";
import { Table as TableUi } from "@components/ui";

import { ActionRow, ProfileRow, TypeRow } from "./Rows";

interface Props {
  page: number;
  items: Item[];
  filter: string;
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
      emptyStateColSpan={3}
      totalItems={totalItems}
      onPageChange={onPageChange}
      ariaLabel="Lista de perfis"
      iconEmpty={<Category sx={{ fontSize: 48, opacity: 0.5, mb: 2 }} />}
      headers={
        <>
          <TableCell>Ações</TableCell>
          <TableCell>Perfil</TableCell>
          <TableCell>Tipo</TableCell>
        </>
      }
      renderRow={(row) => {
        return (
          <>
            <ActionRow />
            <ProfileRow id={row.id} description={row.description} />
            <TypeRow type={row.type} description={row.description} />
          </>
        );
      }}
    />
  );
}
