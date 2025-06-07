import { Box, Card, Button, alpha, styled, } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: 16,
    height: "100%",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow:
        theme.palette.mode === "dark"
            ? `0 6px 20px ${alpha(theme.palette.common.black, 0.2)}`
            : `0 6px 20px ${alpha(theme.palette.common.black, 0.05)}`,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.05)}`,
    overflow: "hidden",
    "&:hover": {
        transform: "translateY(-5px)",
        boxShadow:
            theme.palette.mode === "dark"
                ? `0 12px 28px ${alpha(theme.palette.common.black, 0.3)}`
                : `0 12px 28px ${alpha(theme.palette.common.black, 0.1)}`,
    },
}));

export const CardHeader = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2, 3),
    background:
        theme.palette.mode === "dark"
            ? `linear-gradient(90deg, ${alpha(
                theme.palette.primary.dark,
                0.3
            )} 0%, ${alpha(theme.palette.secondary.dark, 0.3)} 100%)`
            : `linear-gradient(90deg, ${alpha(
                theme.palette.primary.light,
                0.2
            )} 0%, ${alpha(theme.palette.secondary.light, 0.2)} 100%)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

export const ActionButton = styled(Button)(({ theme }) => ({
    borderRadius: 12,
    padding: theme.spacing(1, 2),
    textTransform: "none",
    fontWeight: 600,
    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
    transition: "all 0.3s ease",
    "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
    },
}));
