import { useEffect, useMemo, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { Item } from "@models/user";
import { useDebounce } from "@hooks/UseDebounce";
import { Table } from "@components/users";
import { LayoutBaseDePagina } from "@layouts/base";
import { UserService } from "@services/api/user";
import { Toolbar } from "@components/ui";
import { PersonOutline } from "@mui/icons-material";

export const UserScreen: React.FC = () => {
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const [userData, setUserData] = useState<Item[]>([]);

  const [totalItems, setTotalItems] = useState(0);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const fetch = async () => {
    try {
      setIsLoading(true);

      const res = await UserService.getAll();

      setUserData(res.items);

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
        title="Gerenciamento de Usuários"
        buttonTitle="Adicionar usuário"
        icon={<PersonOutline sx={{ mr: 1 }} />}
        onRefresh={fetch}
        onAdd={() => {}}
      />

      <Table
        page={page}
        items={userData}
        isLoading={isLoading}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />
    </LayoutBaseDePagina>
  );
};
