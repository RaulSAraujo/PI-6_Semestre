import { Item } from "@models/client";
import { TableCell } from "@mui/material";
import { Table as TableUi } from "@components/ui";

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
      totalItems={totalItems}
      isLoading={isLoading}
      onPageChange={onPageChange}
      ariaLabel="Lista de clientes"
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
