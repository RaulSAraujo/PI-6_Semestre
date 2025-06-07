import { useEffect, useMemo, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { Item } from "@models/user";
import { useDebounce } from "@hooks/UseDebounce";
import { Header, Table } from "@components/users";
import { LayoutBaseDePagina } from "@layouts/base";
import { UserService } from "@services/api/usuarios/usuarios";

export const UserScreen: React.FC = () => {
  const { debounce } = useDebounce(800, false);

  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [userData, setUserData] = useState<Item[]>([]);

  const [totalItems, setTotalItems] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const filter = useMemo(() => {
    return searchParams.get("filter") || "";
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get("page") || "1");
  }, [searchParams]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);

    debounce(() => {
      setSearchParams({ filter: value, page: "1" }, { replace: true });
    });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), filter }, { replace: true });
  };

  const handleRefresh = () => {
    fetchUsers();
  };

  const fetchUsers = async () => {
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
    debounce(fetchUsers);
  }, [filter, page]);

  return (
    <LayoutBaseDePagina>
      <Header
        searchTerm={searchTerm}
        onRefresh={handleRefresh}
        onSearchChange={handleSearch}
      />

      <Table
        page={page}
        filter={filter}
        items={userData}
        isLoading={isLoading}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />
    </LayoutBaseDePagina>
  );
};
