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
    <StyledPagination
      page={page}
      color="primary"
      shape="rounded"
      showFirstButton
      showLastButton
      onChange={(_, value) => onPageChange(value)}
      count={Math.ceil(totalCount / rowsPerPage)}
    />
  );
}
