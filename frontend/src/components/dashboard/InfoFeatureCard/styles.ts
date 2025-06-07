import { Paper, alpha, styled, } from "@mui/material";

export const InfoCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: 16,
    height: "100%",
    background:
        theme.palette.mode === "dark"
            ? alpha(theme.palette.background.paper, 0.6)
            : alpha(theme.palette.background.paper, 0.8),
    backdropFilter: "blur(10px)",
    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
}));