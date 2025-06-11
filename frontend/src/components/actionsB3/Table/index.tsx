import { useEffect, useState } from "react";

import { TableCell } from "@mui/material";
import { Item } from "@models/listed-shares";
import { ShowChart } from "@mui/icons-material";
import { Table as TableUi } from "@components/ui";
import { Item as ItemProfile } from "@models/profiles";
import { ProfileService } from "@services/api/profile";
import { useTableContext } from "@contexts/TableContext";

import { BusinessRow, ClassificationRow, ProfileRow, TickerRow } from "./Rows";

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
      emptyStateColSpan={3}
      totalItems={totalItems}
      items={items as Item[]}
      ariaLabel="Lista de ações"
      onPageChange={(page: number) => setPage(page)}
      iconEmpty={<ShowChart sx={{ fontSize: 48, opacity: 0.5, mb: 2 }} />}
      headers={
        <>
          <TableCell>Ticker</TableCell>
          <TableCell>Nome da Empresa</TableCell>
          <TableCell>Setor B3</TableCell>
          <TableCell>Perfil</TableCell>
        </>
      }
      renderRow={(row) => {
        return (
          <>
            <TickerRow ticker={row.ticker} />

            <BusinessRow name={row.name} />

            <ClassificationRow classification={row.b3_sector_classification} />

            <ProfileRow
              idProfile={row.id_profile}
              profiles={profiles}
              isLoading={isLoadingProfiles}
            />
          </>
        );
      }}
    />
  );
}
