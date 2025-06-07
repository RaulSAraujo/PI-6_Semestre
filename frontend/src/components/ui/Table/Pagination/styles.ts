import { styled } from "@mui/material";
import { Pagination } from "@mui/material";

export const StyledPagination = styled(Pagination)(({ theme }) => ({
  padding: 20,
  "& .MuiPaginationItem-root": {
    borderRadius: 8,
    margin: theme.spacing(0, 0.5),
    transition: "all 0.2s ease",
  },
  "& .MuiPaginationItem-page.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));
