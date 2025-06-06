import { useEffect } from "react";

import { Route, Routes } from "react-router-dom";

import {
  Action,
  Client,
  Dashboard,
  Profile,
  Wallet,
  UserScreen,
  HistoryScreen,
  CreationClient,
  CreationAction,
  CreationWallet,
  CreationHistory,
} from "@pages/index";

import { useDrawerContext } from "@contexts/index";
import { MenuLateral } from "../components/common";

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
      <Route
        path="/novo-historico"
        element={
          <MenuLateral>
            <CreationHistory />
          </MenuLateral>
        }
      />
      <Route
        path="/nova-carteira"
        element={
          <MenuLateral>
            <CreationWallet />
          </MenuLateral>
        }
      />
      <Route
        path="/nova-acao"
        element={
          <MenuLateral>
            <CreationAction />
          </MenuLateral>
        }
      />

      <Route
        path="/novo-cliente"
        element={
          <MenuLateral>
            <CreationClient />
          </MenuLateral>
        }
      />
      <Route
        path="/pagina-inicial"
        element={
          <MenuLateral>
            <Dashboard />
          </MenuLateral>
        }
      />

      <Route
        path="/clientes"
        element={
          <MenuLateral>
            <Client />
          </MenuLateral>
        }
      />

      <Route
        path="/usuarios"
        element={
          <MenuLateral>
            <UserScreen />
          </MenuLateral>
        }
      />

      <Route
        path="/perfil"
        element={
          <MenuLateral>
            <Profile />
          </MenuLateral>
        }
      />

      {
        <>
          <Route
            path="/acoes-listadas"
            element={
              <MenuLateral>
                <Action />
              </MenuLateral>
            }
          />

          <Route
            path="/carteira"
            element={
              <MenuLateral>
                <Wallet />
              </MenuLateral>
            }
          />
        </>
      }

      <Route
        path="/historico"
        element={
          <MenuLateral>
            <HistoryScreen />
          </MenuLateral>
        }
      />
    </Routes>
  );
};
