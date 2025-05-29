import { TableCell, TableRow } from "@mui/material";

import { StyledPagination } from "./styles";

interface UserPaginationProps {
  page: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  rowsPerPage?: number;
}

export const UserPagination: React.FC<UserPaginationProps> = ({
  page,
  totalCount,
  onPageChange,
  rowsPerPage = 8,
}) => {
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
};
