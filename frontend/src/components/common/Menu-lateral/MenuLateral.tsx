import { useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
  styled,
  alpha,
  Tooltip,
  IconButton,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  DarkMode,
  LightMode,
  Logout,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import log from "/public/logo.png";
import { useAppThemeContext, useDrawerContext, useAuthContext } from "@contexts/index";
import { useMatch, useNavigate, useResolvedPath } from "react-router";

// Componentes estilizados
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.background.paper, 0.95)
        : alpha(theme.palette.background.paper, 0.98),
    borderRight: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    boxShadow:
      theme.palette.mode === "dark"
        ? "4px 0 15px rgba(0, 0, 0, 0.3)"
        : "4px 0 15px rgba(0, 0, 0, 0.05)",
    width: 280,
    overflowX: "hidden",
    transition: "width 0.3s ease",
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  position: "relative",
  background:
    theme.palette.mode === "dark"
      ? `linear-gradient(180deg, ${alpha(
          theme.palette.primary.dark,
          0.3
        )} 0%, transparent 100%)`
      : `linear-gradient(180deg, ${alpha(
          theme.palette.primary.light,
          0.2
        )} 0%, transparent 100%)`,
  paddingBottom: theme.spacing(3),
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2, 0),
  transition: "all 0.3s ease",
  "& img": {
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
  border: `3px solid ${alpha(theme.palette.primary.main, 0.7)}`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 12,
  margin: theme.spacing(0.5, 1.5),
  padding: theme.spacing(1, 2),
  transition: "all 0.2s ease",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: `linear-gradient(90deg, ${alpha(
      theme.palette.primary.main,
      0
    )} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    transform: "translateX(4px)",
    "&::before": {
      opacity: 1,
    },
  },
  "&.Mui-selected": {
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
    "&::before": {
      opacity: 1,
      background: `linear-gradient(90deg, ${alpha(
        theme.palette.primary.main,
        0.1
      )} 0%, ${alpha(theme.palette.primary.main, 0.2)} 100%)`,
    },
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
    },
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
    },
    "& .MuiListItemText-primary": {
      fontWeight: 600,
      color: theme.palette.primary.main,
    },
  },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 40,
  color:
    theme.palette.mode === "dark"
      ? theme.palette.text.secondary
      : alpha(theme.palette.text.primary, 0.7),
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  "& .MuiListItemText-primary": {
    fontSize: "0.95rem",
    fontWeight: 500,
    transition: "color 0.2s ease",
  },
}));

const DrawerFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
  background:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.background.default, 0.4)
      : alpha(theme.palette.background.default, 0.4),
}));

const CollapseToggle = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: -15,
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: theme.palette.background.paper,
  boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.1)}`,
  border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
  width: 30,
  height: 30,
  zIndex: 1,
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));

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
export const MenuLateral: React.FC<IMenuLateral> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { toggleTheme, themeName } = useAppThemeContext();
  const { isDrawerOpen, toggleDrawerOpen, DrawerOptions } = useDrawerContext();
  const { logout } = useAuthContext();
  const [collapsed, setCollapsed] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState<Record<string, boolean>>({});

  const handleLogout = () => {
    logout();
  };

  const toggleCategory = (category: string) => {
    setCategoryOpen((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Agrupar opções por categoria
  const categorizedOptions = DrawerOptions.reduce((acc, option) => {
    const category = option.category || "Geral";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(option);
    return acc;
  }, {} as Record<string, typeof DrawerOptions>);

  return (
    <>
      <StyledDrawer
        open={isDrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
        onClose={toggleDrawerOpen}
        sx={{
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
              {Object.entries(categorizedOptions).map(([category, options]) => (
                <Box key={category} sx={{ mb: 1 }}>
                  {!collapsed && category !== "Geral" && (
                    <>
                      <Box
                        px={2}
                        py={1}
                        display="flex"
                        alignItems="center"
                        onClick={() => toggleCategory(category)}
                        sx={{ cursor: "pointer" }}
                      >
                        <Typography
                          variant="caption"
                          fontWeight={600}
                          color="text.secondary"
                          sx={{
                            flex: 1,
                            fontSize: "0.7rem",
                            letterSpacing: "0.5px",
                            textTransform: "uppercase",
                          }}
                        >
                          {category}
                        </Typography>
                        {categoryOpen[category] ? (
                          <KeyboardArrowUp fontSize="small" color="disabled" />
                        ) : (
                          <KeyboardArrowDown
                            fontSize="small"
                            color="disabled"
                          />
                        )}
                      </Box>
                      <Divider sx={{ mx: 2, mb: 1, opacity: 0.6 }} />
                    </>
                  )}

                  {(category === "Geral" ||
                    categoryOpen[category] ||
                    collapsed) &&
                    options.map((item) => (
                      <ListItemLink
                        key={item.path}
                        to={item.path}
                        icon={item.icon}
                        label={item.label}
                        onClick={smDown ? toggleDrawerOpen : undefined}
                      />
                    ))}
                </Box>
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
                onClick={handleLogout}
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
        height="100vh"
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
