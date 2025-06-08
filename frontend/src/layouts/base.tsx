import { ReactNode } from "react";

import { Box } from "@mui/system";

interface Props {
  children: ReactNode;
}

export function LayoutBaseDePagina({ children }: Props) {
  return (
    <Box
      sx={{
        paddingTop: 5,
        paddingRight: 5,
        paddingLeft: 5,
        backgroundColor: "background.default",
      }}
    >
      {children}
    </Box>
  );
}
