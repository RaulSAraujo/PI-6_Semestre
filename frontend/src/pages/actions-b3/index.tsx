import { useEffect } from "react";

import { Toolbar } from "@components/ui";
import { Table } from "@components/actionsB3";
import { ShowChart } from "@mui/icons-material";
import { LayoutBaseDePagina } from "@layouts/base";
import { ActionB3Service } from "@services/api/action";
import { useTableContext } from "@contexts/TableContext";

export function ActionsB3() {
  const { setItems, setIsLoading, setTotalItems, page, setPage } =
    useTableContext();

  async function fetch() {
    try {
      setIsLoading(true);

      const res = await ActionB3Service.get({
        page,
      });

      setItems(res.items);

      setTotalItems(res.totalItems);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

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
        title="Ações Listadas na B3"
        buttonTitle="Adicionar nova ação"
        icon={<ShowChart sx={{ mr: 1 }} />}
        onRefresh={fetch}
        hiddenAdd
      />

      <Table />
    </LayoutBaseDePagina>
  );
}
