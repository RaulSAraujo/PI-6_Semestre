import { useEffect } from "react";

import { Toolbar } from "@components/ui";
import { LayoutBaseDePagina } from "@layouts/base";
import { PersonOutline } from "@mui/icons-material";
import { Dashboard, Table } from "@components/history";
import { HistoryService } from "@services/api/history";
import { useTableContext } from "@contexts/TableContext";
import { Item } from "@models/listed-share-history";

export function HistoryScreen() {
  const { setItems, setIsLoading, setTotalItems, page, setPage, items } =
    useTableContext();

  const fetch = async () => {
    try {
      setIsLoading(true);

      const res = await HistoryService.get({
        page,
      });

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
  }, [page]);

  useEffect(() => {
    return () => {
      setPage(1);
      setItems([]);
      setTotalItems(0);
    };
  }, []);

  return (
    <LayoutBaseDePagina>
      <Toolbar
        title="Histórico de Ações"
        buttonTitle="Novo histórico"
        icon={<PersonOutline sx={{ mr: 1 }} />}
        onRefresh={fetch}
        hiddenAdd
      />

      <Dashboard items={items as Item[]} />

      <Table />
    </LayoutBaseDePagina>
  );
}
