import { createContext, ReactNode, useContext, useState } from "react";

interface TableItem {
  id: string | number;
  [key: string]: any;
}

interface TableContextData<T = TableItem> {
  page: number;
  setPage: (page: number) => void;
  items: T[];
  setItems: (items: T[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
  totalItems: number;
  setTotalItems: (totalItems: number) => void;
}

const TableContext = createContext<TableContextData>({} as TableContextData);

export const useTableContext = () => {
  return useContext(TableContext);
};

interface TableProviderProps {
  children: ReactNode;
}

export function TableProvider({ children }: TableProviderProps) {
  const [page, setPage] = useState<number>(1);
  const [items, setItems] = useState<TableItem[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const contextValue: TableContextData = {
    page,
    setPage,
    items,
    setItems,
    isLoading,
    setIsLoading,
    rowsPerPage,
    setRowsPerPage,
    totalItems,
    setTotalItems,
  };

  return (
    <TableContext.Provider value={contextValue}>
      {children}
    </TableContext.Provider>
  );
}
