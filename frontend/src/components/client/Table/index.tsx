import { Item } from "@models/client";
import { TableCell } from "@mui/material";
import { Table as TableUi } from "@components/ui";
import { PersonOutline } from "@mui/icons-material";

import { ActionRow, ClientRow, ProfileRow, TypeRow } from "./Rows";

type Props = {
  page: number;
  items: Item[];
  totalItems: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
};

export function Table(props: Props) {
  const { items, isLoading, page, totalItems, onPageChange } = props;

  return (
    <TableUi
      page={page}
      items={items}
      isLoading={isLoading}
      emptyStateColSpan={4}
      totalItems={totalItems}
      onPageChange={onPageChange}
      ariaLabel="Lista de clientes"
      iconEmpty={<PersonOutline sx={{ fontSize: 48, opacity: 0.5, mb: 2 }} />}
      headers={
        <>
          <TableCell>Cliente</TableCell>
          <TableCell>Perfil</TableCell>
          <TableCell>Tipo</TableCell>
          <TableCell align="right">Ações</TableCell>
        </>
      }
      renderRow={(row) => {
        return (
          <>
            <ClientRow id={row.id} name={row.name} />

            <ProfileRow idProfile={row.id_profile} />

            <TypeRow type={row.type} />

            <ActionRow />
          </>
        );
      }}
    />
  );
}
