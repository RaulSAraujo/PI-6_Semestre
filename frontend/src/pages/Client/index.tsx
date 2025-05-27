import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
import { Item } from "@models/Client";
import { useDebounce } from "@hooks/UseDebounce";
import { Header, Table } from "@components/Client";
import { LayoutBaseDePagina } from "@layouts/LayoutBase";
import { ClientesService } from "@services/api/cliente/clientes";

export default function Clientes() {
  const navigate = useNavigate();
  const { debounce } = useDebounce(800, false);
  const [rows, setRows] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleRefresh = () => {
    setIsLoading(true);
    ClientesService.getAll().then((result) => {
      setIsLoading(false);
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setRows(result.data);
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      ClientesService.getAll().then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows(result.data);
        }
      });
    });
  }, []);

  return (
    <LayoutBaseDePagina
      titulo="Clientes"
      barraDeFerramentas={
        <Header
          onRefresh={handleRefresh}
          onAdd={() => navigate("/novoclientes")}
        />
      }
    >
      <Box sx={{ p: 2 }}>
        <Table rows={rows} isLoading={isLoading} navigate={navigate} />
      </Box>
    </LayoutBaseDePagina>
  );
}
