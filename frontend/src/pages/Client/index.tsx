import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Item } from "@models/client";
import { Toolbar } from "@components/ui";
import { Table } from "@components/client";
import { LayoutBaseDePagina } from "@layouts/base";
import { ClientesService } from "@services/api/client";
import { PersonOutline } from "@mui/icons-material";

export function Client() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const [items, setItems] = useState<Item[]>([]);

  const [totalItems, setTotalItems] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  async function fetch() {
    try {
      setIsLoading(true);

      const res = await ClientesService.get();

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
  }, []);

  return (
    <LayoutBaseDePagina>
      <Toolbar
        onRefresh={fetch}
        buttonTitle="Novo Cliente"
        title="Gerenciamento de Clientes"
        icon={<PersonOutline sx={{ mr: 1 }} />}
        onAdd={() => navigate("/novo-cliente")}
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
