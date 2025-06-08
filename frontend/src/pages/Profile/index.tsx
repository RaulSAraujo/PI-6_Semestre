import { useEffect, useState } from "react";

import { Item } from "@models/profiles";
import { Toolbar } from "@components/ui";
import { Table } from "@components/profile";
import { Category } from "@mui/icons-material";
import { LayoutBaseDePagina } from "@layouts/base";
import { ProfileService } from "@services/api/profile";

export function Profile() {
  const [page, setPage] = useState(1);

  const [items, setItems] = useState<Item[]>([]);

  const [totalItems, setTotalItems] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const fetch = async () => {
    try {
      setIsLoading(true);

      const res = await ProfileService.getAll();

      setItems(res.items);

      setTotalItems(res.totalItems);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <LayoutBaseDePagina>
      <Toolbar
        buttonTitle="Novo Perfil"
        title="Perfis de Investimento"
        icon={<Category sx={{ mr: 1 }} />}
        onAdd={() => {}}
        onRefresh={fetch}
      />

      <Table
        page={page}
        items={items}
        isLoading={isLoading}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />
    </LayoutBaseDePagina>
  );
}
