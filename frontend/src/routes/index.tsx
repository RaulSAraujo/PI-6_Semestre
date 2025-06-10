import { useEffect } from "react";

import { Route, Routes } from "react-router-dom";

import {
  Client,
  Profile,
  Wallet,
  Dashboard,
  ActionsB3,
  UserScreen,
  HistoryScreen,
  CreationClient,
  CreationAction,
  CreationWallet,
  CreationHistory,
} from "@pages/index";

import { useDrawerContext } from "@contexts/index";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        label: "Pagina Inicial",
        path: "/pagina-inicial",
      },
      {
        icon: "account_circleIcon",
        label: "Usuario",
        path: "/usuarios",
      },
      {
        icon: "groupIcon",
        label: "Clientes",
        path: "/clientes",
      },
      {
        icon: "faceIcon",
        label: "Perfil",
        path: "/perfil",
      },
      {
        icon: "view_listIcon",
        label: "Ações listadas",
        path: "/acoes-listadas",
      },
      {
        icon: "trending_upIcon",
        label: "Carteira de investimeto",
        path: "/carteira",
      },
      {
        icon: "timelineIcon",
        label: "Histórico da ação",
        path: "/historico",
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/novo-historico" element={<CreationHistory />} />
      <Route path="/nova-carteira" element={<CreationWallet />} />
      <Route path="/nova-acao" element={<CreationAction />} />
      <Route path="/novo-cliente" element={<CreationClient />} />
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/clientes" element={<Client />} />
      <Route path="/usuarios" element={<UserScreen />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/acoes-listadas" element={<ActionsB3 />} />
      <Route path="/carteira" element={<Wallet />} />
      <Route path="/historico" element={<HistoryScreen />} />
    </Routes>
  );
};
