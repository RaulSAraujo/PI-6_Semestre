import { ReactNode } from "react";

import { Box } from "@mui/system";

interface Props {
  toolbar?: ReactNode;
  children: ReactNode;
}

export function LayoutBaseDePagina({ children, toolbar }: Props) {
  return (
    <Box height="100%" sx={{ paddingTop: 5, paddingRight: 5, paddingLeft: 5 }}>
      {toolbar && <Box>{toolbar}</Box>}

      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
}
