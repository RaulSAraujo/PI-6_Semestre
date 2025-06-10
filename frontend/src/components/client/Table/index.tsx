import { useEffect, useState } from "react";

import { Item } from "@models/client";
import { TableCell } from "@mui/material";
import { Table as TableUi } from "@components/ui";
import { PersonOutline } from "@mui/icons-material";
import { Item as ItemProfile } from "@models/profiles";
import { ProfileService } from "@services/api/profile";

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

  const [isLoadingProfiles, setIsLoadingProfiles] = useState(false);

  const [profiles, setProfiles] = useState<ItemProfile[]>([]);

  const fetchProfiles = async () => {
    setIsLoadingProfiles(true);
    try {
      const result = await ProfileService.getAll();

      setProfiles(result.items);
    } catch (error) {
      console.error("Erro ao buscar perfis:", error);
    } finally {
      setIsLoadingProfiles(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

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
      titleEmpty="Nenhum cliente encontrado."
      subtitleEmpty="Clique em criar para adicionar um novo cliente."
      headers={
        <>
          <TableCell>Ações</TableCell>
          <TableCell>Cliente</TableCell>
          <TableCell>Perfil</TableCell>
          <TableCell>Tipo</TableCell>
        </>
      }
      renderRow={(row) => {
        return (
          <>
            <ActionRow />

            <ClientRow id={row.id} name={row.name} />

            <ProfileRow
              idProfile={row.id_profile}
              profiles={profiles}
              isLoading={isLoadingProfiles}
            />

            <TypeRow type={row.type} />
          </>
        );
      }}
    />
  );
}
