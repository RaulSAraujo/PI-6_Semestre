import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Toolbar } from "@components/ui";
import { Table } from "@components/client";
import { LayoutBaseDePagina } from "@layouts/base";
import { PersonOutline } from "@mui/icons-material";
import { ClientesService } from "@services/api/client";
import { useTableContext } from "@contexts/TableContext";

export function Client() {
  const navigate = useNavigate();

  const { page, setIsLoading, setItems, setTotalItems } = useTableContext();

  async function fetch() {
    try {
      setIsLoading(true);

      const res = await ClientesService.get({
        page,
      });

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
  }, [page]);

  return (
    <LayoutBaseDePagina>
      <Toolbar
        onRefresh={fetch}
        buttonTitle="Novo Cliente"
        title="Gerenciamento de Clientes"
        icon={<PersonOutline sx={{ mr: 1 }} />}
        onAdd={() => navigate("/novo-cliente")}
      />

      <Table />
    </LayoutBaseDePagina>
  );
}
