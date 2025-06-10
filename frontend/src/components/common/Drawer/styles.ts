import {
  Avatar,
  Box,
  Drawer,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  alpha,
  IconButton,
} from "@mui/material";

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
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

export const DrawerHeader = styled(Box)(({ theme }) => ({
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

export const LogoContainer = styled(Box)(({ theme }) => ({
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

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
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

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
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

export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 40,
  color:
    theme.palette.mode === "dark"
      ? theme.palette.text.secondary
      : alpha(theme.palette.text.primary, 0.7),
}));

export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  "& .MuiListItemText-primary": {
    fontSize: "0.95rem",
    fontWeight: 500,
    transition: "color 0.2s ease",
  },
}));

export const DrawerFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
  background:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.background.default, 0.4)
      : alpha(theme.palette.background.default, 0.4),
}));

export const CollapseToggle = styled(IconButton)(({ theme }) => ({
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
