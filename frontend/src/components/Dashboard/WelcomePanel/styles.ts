import { Paper, alpha, styled, } from "@mui/material";

export const WelcomeSection = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: 16,
    background:
        theme.palette.mode === "dark"
            ? `linear-gradient(135deg, ${alpha(
                theme.palette.primary.dark,
                0.2
            )} 0%, ${alpha(theme.palette.secondary.dark, 0.2)} 100%)`
            : `linear-gradient(135deg, ${alpha(
                theme.palette.primary.light,
                0.15
            )} 0%, ${alpha(theme.palette.secondary.light, 0.15)} 100%)`,
    boxShadow:
        theme.palette.mode === "dark"
            ? `0 8px 32px ${alpha(theme.palette.common.black, 0.2)}`
            : `0 8px 32px ${alpha(theme.palette.common.black, 0.05)}`,
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
    marginBottom: theme.spacing(4),
    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
}));

