import { useEffect, useMemo, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import { Item } from "@models/client";
import { useDebounce } from "@hooks/UseDebounce";
import { Header, Table } from "@components/client";
import { LayoutBaseDePagina } from "@layouts/base";
import { ClientesService } from "@services/api/cliente/clientes";

export function Client() {
  const navigate = useNavigate();
  const { debounce } = useDebounce(800, false);

  const [items, setItems] = useState<Item[]>([]);

  const [totalItems, setTotalItems] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const [isLoading, setIsLoading] = useState(true);

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
    fetchClient();
  };

  async function fetchClient() {
    try {
      setIsLoading(true);

      const res = await ClientesService.getAll();

      setItems(res.items);

      setTotalItems(res.totalItems);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    debounce(fetchClient);
  }, []);

  return (
    <LayoutBaseDePagina>
      <Header
        onRefresh={handleRefresh}
        onAdd={() => navigate("/novoclientes")}
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
