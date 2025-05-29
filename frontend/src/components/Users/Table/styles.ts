import { alpha, styled } from "@mui/material";
import { Chip, TableContainer, TableHead, TableRow } from "@mui/material";

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
  },
  "& .MuiTableCell-body": {
    padding: theme.spacing(1.5, 2),
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
  },
}));

export const UserChip = styled(Chip)(({ theme }) => ({
  borderRadius: 8,
  fontWeight: 500,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  "& .MuiChip-icon": {
    color: theme.palette.primary.main,
  },
}));
