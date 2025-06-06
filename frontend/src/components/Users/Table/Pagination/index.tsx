import { TableCell, TableRow } from "@mui/material";

import { StyledPagination } from "./styles";

interface Props {
  page: number;
  totalCount: number;
  rowsPerPage?: number;
  onPageChange: (page: number) => void;
}

export function Pagination(props: Props) {
  const { page, totalCount, onPageChange, rowsPerPage = 8 } = props;

  return (
    <TableRow>
      <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
        <StyledPagination
          page={page}
          count={Math.ceil(totalCount / rowsPerPage)}
          onChange={(_, value) => onPageChange(value)}
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </TableCell>
    </TableRow>
  );
}
