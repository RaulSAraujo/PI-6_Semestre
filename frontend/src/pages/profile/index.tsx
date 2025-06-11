import { useEffect } from "react";

import { Toolbar } from "@components/ui";
import { Table } from "@components/profile";
import { Category } from "@mui/icons-material";
import { LayoutBaseDePagina } from "@layouts/base";
import { ProfileService } from "@services/api/profile";
import { useTableContext } from "@contexts/TableContext";

export function Profile() {
  const { setItems, setIsLoading, setTotalItems, setPage, page } =
    useTableContext();

  const fetch = async () => {
    try {
      setIsLoading(true);

      const res = await ProfileService.get({
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
  }, []);

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
        buttonTitle="Novo Perfil"
        title="Perfis de Investimento"
        icon={<Category sx={{ mr: 1 }} />}
        onRefresh={fetch}
        hiddenAdd
      />

      <Table />
    </LayoutBaseDePagina>
  );
}
