import {
    Box,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    alpha,
    styled,
    Button,
    Avatar,
} from "@mui/material";


export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    borderRadius: 0,
    boxShadow: "none",
    border: "none",
    "&::-webkit-scrollbar": {
        height: "8px",
        width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: alpha(theme.palette.primary.main, 0.2),
        borderRadius: "4px",
    },
    "&::-webkit-scrollbar-track": {
        backgroundColor: "transparent",
    },
}));

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
    "& .MuiTableCell-head": {
        backgroundColor:
            theme.palette.mode === "dark"
                ? alpha(theme.palette.background.paper, 0.5)
                : alpha(theme.palette.background.default, 0.5),
        fontWeight: 600,
        color: theme.palette.text.primary,
        borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        padding: theme.spacing(1.5, 2),
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    transition: "background-color 0.2s ease",
    "&:nth-of-type(odd)": {
        backgroundColor:
            theme.palette.mode === "dark"
                ? alpha(theme.palette.background.default, 0.05)
                : alpha(theme.palette.background.default, 0.2),
    },
    "&:hover": {
        backgroundColor:
            theme.palette.mode === "dark"
                ? alpha(theme.palette.primary.main, 0.1)
                : alpha(theme.palette.primary.main, 0.05),
        cursor: "pointer",
    },
    "& .MuiTableCell-body": {
        padding: theme.spacing(1.5, 2),
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
    },
}));

export const AddButton = styled(Button)(({ theme }) => ({
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

export const EmptyState = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.text.secondary,
}));

export const ProfileChip = styled(Chip)(({ theme, color }) => ({
    borderRadius: 8,
    fontWeight: 500,
    backgroundColor:
        color === "primary"
            ? alpha(theme.palette.info.main, 0.1)
            : color === "secondary"
                ? alpha(theme.palette.warning.main, 0.1)
                : alpha(theme.palette.error.main, 0.1),
    color:
        color === "primary"
            ? theme.palette.info.main
            : color === "secondary"
                ? theme.palette.warning.main
                : theme.palette.error.main,
    border: `1px solid ${color === "primary"
        ? alpha(theme.palette.info.main, 0.2)
        : color === "secondary"
            ? alpha(theme.palette.warning.main, 0.2)
            : alpha(theme.palette.error.main, 0.2)
        }`,
    "& .MuiChip-icon": {
        color:
            color === "primary"
                ? theme.palette.info.main
                : color === "secondary"
                    ? theme.palette.warning.main
                    : theme.palette.error.main,
    },
}));

export const TypeChip = styled(Chip)(({ theme }) => ({
    borderRadius: 8,
    fontWeight: 500,
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    "& .MuiChip-icon": {
        color: theme.palette.primary.main,
    },
}));

export const ClientAvatar = styled(Avatar)(({ theme }) => ({
    width: 40,
    height: 40,
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
    fontWeight: 600,
    border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
}));