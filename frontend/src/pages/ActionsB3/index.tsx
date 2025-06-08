import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Toolbar } from "@components/ui";
import { Item } from "@models/listed-shares";
import { Table } from "@components/actionsB3";
import { ShowChart } from "@mui/icons-material";
import { LayoutBaseDePagina } from "@layouts/base";
import { ActionB3Service } from "@services/api/action";

export function ActionsB3() {
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

      const res = await ActionB3Service.getAll();

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
        title="Ações Listadas na B3"
        buttonTitle="Adicionar nova ação"
        icon={<ShowChart sx={{ mr: 1 }} />}
        onRefresh={fetch}
        onAdd={() => navigate("/nova-acao")}
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
