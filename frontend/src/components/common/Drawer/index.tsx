import { useState } from "react";

import { Navigate, useMatch, useNavigate, useResolvedPath } from "react-router";

import log from "/public/logo.png";
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
} from "@contexts/index";
import {
  ChevronLeft,
  ChevronRight,
  DarkMode,
  LightMode,
  Logout,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Icon,
  List,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import {
  CollapseToggle,
  DrawerFooter,
  DrawerHeader,
  LogoContainer,
  StyledAvatar,
  StyledDrawer,
  StyledListItemButton,
  StyledListItemIcon,
  StyledListItemText,
} from "./styles";

// Interfaces
interface IMenuLateral {
  children: React.ReactNode;
}

interface IListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  onClick?: () => void;
}

// Componente para itens do menu
const ListItemLink: React.FC<IListItemLinkProps> = ({
  to,
  icon,
  label,
  onClick,
}) => {
  const navigate = useNavigate();
  const resolvePath = useResolvedPath(to);
  const match = useMatch({ path: resolvePath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <Tooltip title={label} placement="right" arrow>
      <StyledListItemButton
        selected={!!match}
        sx={{ height: "4rem" }}
        onClick={handleClick}
      >
        <StyledListItemIcon>
          <Icon>{icon}</Icon>
        </StyledListItemIcon>
        <StyledListItemText primary={label} />
      </StyledListItemButton>
    </Tooltip>
  );
};

// Componente principal
export const Drawer: React.FC<IMenuLateral> = ({ children }) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const { logout } = useAuthContext();

  const [collapsed, setCollapsed] = useState(false);

  const { toggleTheme, themeName } = useAppThemeContext();

  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const { isDrawerOpen, toggleDrawerOpen, DrawerOptions } = useDrawerContext();

  const handleSignOut = () => {
    logout();

    navigate("/login", { replace: true });
  };

  return (
    <>
      <StyledDrawer
        open={isDrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
        onClose={toggleDrawerOpen}
        sx={{
          width: 50,
          "& .MuiDrawer-paper": {
            width: collapsed && !smDown ? 95 : 280,
          },
        }}
      >
        <Box height="100%" display="flex" flexDirection="column">
          <DrawerHeader>
            {!smDown && (
              <CollapseToggle
                onClick={() => setCollapsed(!collapsed)}
                size="small"
                sx={{ marginTop: "3rem", marginRight: "1rem" }}
              >
                {collapsed ? (
                  <ChevronRight fontSize="small" />
                ) : (
                  <ChevronLeft fontSize="small" />
                )}
              </CollapseToggle>
            )}

            <LogoContainer>
              <StyledAvatar src={log} alt="Logo" />
            </LogoContainer>

            {!collapsed && (
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="primary"
                align="center"
                sx={{ mt: 1 }}
              >
                Invest Ai
              </Typography>
            )}
          </DrawerHeader>

          <Box
            flex={1}
            overflow="auto"
            sx={{
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
              },
            }}
          >
            <List component="nav" sx={{ px: 1, py: 2 }}>
              {DrawerOptions.map((item) => (
                <ListItemLink
                  key={item.path}
                  to={item.path}
                  icon={item.icon}
                  label={item.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>

          <DrawerFooter sx={{ px: 1 }}>
            <List component="nav">
              <StyledListItemButton
                sx={{ height: "4rem" }}
                onClick={toggleTheme}
              >
                <StyledListItemIcon>
                  {themeName === "dark" ? <LightMode /> : <DarkMode />}
                </StyledListItemIcon>
                {!collapsed && (
                  <StyledListItemText
                    primary={
                      themeName === "dark" ? "Modo Claro" : "Modo Escuro"
                    }
                  />
                )}
              </StyledListItemButton>

              <StyledListItemButton
                sx={{ height: "4rem" }}
                onClick={handleSignOut}
              >
                <StyledListItemIcon>
                  <Logout />
                </StyledListItemIcon>
                {!collapsed && <StyledListItemText primary="Sair" />}
              </StyledListItemButton>
            </List>
          </DrawerFooter>
        </Box>
      </StyledDrawer>

      <Box
        marginLeft={smDown || collapsed ? 0 : theme.spacing(35)}
        sx={{
          transition: "margin 0.3s ease",
          marginLeft: {
            xs: 0,
            sm: collapsed ? theme.spacing(14) : theme.spacing(35),
          },
        }}
      >
        {children}
      </Box>
    </>
  );
};
