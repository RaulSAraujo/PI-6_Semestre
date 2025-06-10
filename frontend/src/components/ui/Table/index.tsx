import {
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
  Table as MuiTable,
} from "@mui/material";
import { ReactNode, useMemo, useCallback } from "react";

import { Card } from "./Card";
import { Skeleton } from "./Skeleton";
import { Pagination } from "./Pagination";
import { EmptyState } from "./EmptyState";
import {
  StyledTableContainer,
  StyledTableHead,
  StyledTableRow,
} from "./styles";

interface TableItem {
  id: string | number;
  [key: string]: any;
}

interface TableProps<T extends TableItem> {
  items: T[];
  page: number;
  minWidth?: number;
  totalItems: number;
  ariaLabel?: string;
  headers: ReactNode;
  titleEmpty?: string;
  isLoading?: boolean;
  rowsPerPage?: number;
  subtitleEmpty?: string;
  emptyStateColSpan?: number;
  iconEmpty?: React.ReactElement;
  onPageChange: (page: number) => void;
  renderRow: (item: T, index: number) => ReactNode;
}

export function Table<T extends TableItem>(props: TableProps<T>) {
  const {
    page,
    items,
    headers,
    renderRow,
    iconEmpty,
    totalItems,
    onPageChange,
    minWidth = 650,
    rowsPerPage = 8,
    isLoading = false,
    emptyStateColSpan = 3,
    ariaLabel = "tabela de dados",
    titleEmpty = "Nenhum registro encontrado.",
    subtitleEmpty = "Nenhum item encontrado na lista.",
  } = props;

  const tableBody = useMemo(() => {
    if (!items || items.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={emptyStateColSpan}>
            <EmptyState
              titleEmpty={titleEmpty}
              subtitleEmpty={subtitleEmpty}
              iconEmpty={iconEmpty}
            />
          </TableCell>
        </TableRow>
      );
    }

    return items.map((item, index) => (
      <StyledTableRow key={item.id || index}>
        {renderRow(item, index)}
      </StyledTableRow>
    ));
  }, [items, renderRow, emptyStateColSpan]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      onPageChange(newPage);
    },
    [onPageChange]
  );

  return (
    <StyledTableContainer>
      <Card title={ariaLabel} totalItems={totalItems}>
        {isLoading && <Skeleton />}

        {!isLoading && (
          <>
            <MuiTable sx={{ minWidth }} aria-label={ariaLabel}>
              <StyledTableHead>
                <TableRow>{headers}</TableRow>
              </StyledTableHead>

              <TableBody>{tableBody}</TableBody>
            </MuiTable>

            {totalItems > 0 && (
              <TableFooter>
                <TableRow>
                  <Pagination
                    page={page}
                    totalCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                  />
                </TableRow>
              </TableFooter>
            )}
          </>
        )}
      </Card>
    </StyledTableContainer>
  );
}
