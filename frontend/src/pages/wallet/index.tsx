import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Toolbar } from "@components/ui";
import { LayoutBaseDePagina } from "@layouts/base";
import { Item } from "@models/investment-portfolio";
import { PersonOutline } from "@mui/icons-material";
import { WalletService } from "@services/api/wallet";
import { Dashboard, Table } from "@components/wallet";
import { useTableContext } from "@contexts/TableContext";

export function Wallet() {
  const navigate = useNavigate();

  const { setItems, setIsLoading, items, setTotalItems, page, setPage } =
    useTableContext();

  const fetch = async () => {
    try {
      setIsLoading(true);

      const res = await WalletService.get({
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
        title="Carteira de Investimentos"
        buttonTitle="Novo Investimento"
        icon={<PersonOutline sx={{ mr: 1 }} />}
        onRefresh={fetch}
        onAdd={() => navigate("/nova-carteira")}
      />

      <Dashboard items={items as Item[]} />

      <Table />
    </LayoutBaseDePagina>
  );
}
