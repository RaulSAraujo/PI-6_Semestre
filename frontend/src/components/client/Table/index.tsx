import { useEffect, useState } from "react";
import { Item } from "@models/client";
import { TableCell } from "@mui/material";
import { Table as TableUi } from "@components/ui";
import { useTableContext } from "@contexts/index";
import { PersonOutline } from "@mui/icons-material";
import { Item as ItemProfile } from "@models/profiles";
import { ProfileService } from "@services/api/profile";

import { ActionRow, ClientRow, ProfileRow, TypeRow, DocumentRow } from "./Rows"

export function Table() {
  const { page, items, isLoading, totalItems, setPage } = useTableContext();

  const [isLoadingProfiles, setIsLoadingProfiles] = useState(false);

  const [profiles, setProfiles] = useState<ItemProfile[]>([]);

  const fetchProfiles = async () => {
    setIsLoadingProfiles(true);

    try {
      const result = await ProfileService.get({});

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
      isLoading={isLoading}
      emptyStateColSpan={4}
      items={items as Item[]}
      totalItems={totalItems}
      ariaLabel="Lista de clientes"
      onPageChange={(page: number) => setPage(page)}
      titleEmpty="Nenhum cliente encontrado."
      iconEmpty={<PersonOutline sx={{ fontSize: 48, opacity: 0.5, mb: 2 }} />}
      subtitleEmpty="Clique em criar para adicionar um novo cliente."
      headers={
        <>
          <TableCell>Ações</TableCell>
          <TableCell>Cliente</TableCell>
          <TableCell>Documento</TableCell>
          <TableCell>Perfil</TableCell>
          <TableCell>Tipo</TableCell>
        </>
      }
      renderRow={(row) => {
        return (
          <>
            <ActionRow row={row} />

            <ClientRow id={row.id} name={row.name} />

            <DocumentRow document={row.document} />

            <ProfileRow
              profiles={profiles}
              idProfile={row.id_profile}
              isLoading={isLoadingProfiles}
            />

            <TypeRow type={row.type} />
          </>
        );
      }}
    />
  );
}
