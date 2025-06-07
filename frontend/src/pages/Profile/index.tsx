import { useEffect, useMemo, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { Item } from "@models/profiles";
import { useDebounce } from "@hooks/UseDebounce";
import { LayoutBaseDePagina } from "@layouts/base";
import { Header, Table } from "@components/profile";
import { ProfileService } from "@services/api/profile";

export function Profile() {
  const { debounce } = useDebounce(800, false);

  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [items, setItems] = useState<Item[]>([]);

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
    fetch();
  };

  const fetch = async () => {
    try {
      setIsLoading(true);

      const res = await ProfileService.getAll()

      setItems(res.items);

      setTotalItems(res.totalItems);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    debounce(fetch);
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
        items={items}
        filter={filter}
        isLoading={isLoading}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />
    </LayoutBaseDePagina>
  );
}
