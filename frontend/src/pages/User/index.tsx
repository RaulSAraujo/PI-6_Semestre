import { useEffect, useMemo, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { Box, Divider } from "@mui/material";
import { useDebounce } from "@hooks/UseDebounce";
import { UserTable } from "@components/Users/Table";
import { UserHeader } from "@components/Users/Header";
import { LayoutBaseDePagina } from "@layouts/LayoutBase";
import { UserTableHeader } from "@components/Users/TableHeader";
import { UserTableSkeleton } from "@components/Users/TableSkeleton";
import { IListagemUser, UserService } from "@services/api/usuarios/usuarios";

import { StyledCard, StyledCardHeader } from "./styles";

export const UserScreen: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(800, false);
  const [userData, setUserData] = useState<IListagemUser>();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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
    setIsLoading(true);

    fetchUsers();
  };

  const fetchUsers = () => {
    UserService.getAll().then((result) => {
      setIsLoading(false);
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setUserData(result.data);
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    debounce(fetchUsers);
  }, [filter, page]);

  return (
    <LayoutBaseDePagina titulo={"Usuários"}>
      <Box sx={{ p: 2 }}>
        <UserHeader
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
          onRefresh={handleRefresh}
        />

        <StyledCard>
          <StyledCardHeader
            title={<UserTableHeader totalCount={userData?.total} />}
          />
          <Divider />

          {isLoading ? (
            <UserTableSkeleton />
          ) : (
            <UserTable
              data={userData}
              isLoading={isLoading}
              page={page}
              filter={filter}
              onPageChange={handlePageChange}
            />
          )}
        </StyledCard>
      </Box>
    </LayoutBaseDePagina>
  );
};
