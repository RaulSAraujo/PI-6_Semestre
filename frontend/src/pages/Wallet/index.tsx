import { useEffect, useState } from "react";

import { Toolbar } from "@components/ui";
import { LayoutBaseDePagina } from "@layouts/base";
import { PersonOutline } from "@mui/icons-material";
import { Item } from "@models/investment-portfolio";
import { Dashboard, Table } from "@components/wallet";
import { CarteiraService } from "@services/api/wallet";
import { useNavigate } from "react-router-dom";

// Componente principal
export function Wallet() {
  const navigate = useNavigate();
  
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const [items, setItems] = useState<Item[]>([]);

  const [totalItems, setTotalItems] = useState(0);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const fetch = async () => {
    try {
      setIsLoading(true);

      const res = await CarteiraService.getAll();

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

  return (
    <LayoutBaseDePagina>
      <Toolbar
        title="Carteira de Investimentos"
        buttonTitle="Novo Investimento"
        icon={<PersonOutline sx={{ mr: 1 }} />}
        onRefresh={fetch}
        onAdd={() => navigate("/nova-carteira")}
      />

      <Dashboard items={items} />

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
