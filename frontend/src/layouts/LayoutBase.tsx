import { FC, ReactNode } from "react";
import { Box } from "@mui/system";
interface ILayoutBaseDePaginaProps {
  titulo?: string;
  barraDeFerramentas?: ReactNode;
  children: ReactNode;
}

export const LayoutBaseDePagina: FC<ILayoutBaseDePaginaProps> = ({
  children,
  barraDeFerramentas,
}) => {
  return (
    <Box height="100%" sx={{ paddingTop: 5, paddingRight: 5, paddingLeft: 5 }}>
      {barraDeFerramentas && <Box>{barraDeFerramentas}</Box>}

      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};
