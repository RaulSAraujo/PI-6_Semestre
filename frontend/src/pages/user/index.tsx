import { useEffect } from "react";

import { Toolbar } from "@components/ui";
import { Table } from "@components/users";
import { UserService } from "@services/api/user";
import { LayoutBaseDePagina } from "@layouts/base";
import { PersonOutline } from "@mui/icons-material";
import { useTableContext } from "@contexts/TableContext";

export const UserScreen: React.FC = () => {
  const { setItems, setIsLoading, setTotalItems, page, setPage } = useTableContext();

  const fetch = async () => {
    try {
      setIsLoading(true);

      const res = await UserService.get({
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
        hiddenAdd
        onRefresh={fetch}
        buttonTitle="Adicionar usuário"
        title="Gerenciamento de Usuários"
        icon={<PersonOutline sx={{ mr: 1 }} />}
      />

      <Table />
    </LayoutBaseDePagina>
  );
};
