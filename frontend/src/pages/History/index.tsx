import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Toolbar } from "@components/ui";
import { LayoutBaseDePagina } from "@layouts/base";
import { PersonOutline } from "@mui/icons-material";
import { Item } from "@models/listed-share-history";
import { Dashboard, Table } from "@components/history";
import { HistoricoService } from "@services/api/history";

export function HistoryScreen() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const [items, setItems] = useState<Item[]>([]);

  const [totalItems, setTotalItems] = useState(0);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const fetch = async () => {
    try {
      setIsLoading(true);

      const res = await HistoricoService.getAll();

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
        title="Histórico de Cotações"
        buttonTitle="Novo histórico"
        icon={<PersonOutline sx={{ mr: 1 }} />}
        onRefresh={fetch}
        onAdd={() => navigate("/novo-historico")}
      />

      <Dashboard items={items} />

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
