import { ReactNode } from "react";

import { Box } from "@mui/system";

import { Drawer } from "@components/common";

interface Props {
  children: ReactNode;
}

export function LayoutBaseDePagina({ children }: Props) {
  return (
    <Box
      sx={{
        padding: 5,
        backgroundColor: "background.default",
      }}
    >
      <Drawer>{children}</Drawer>
    </Box>
  );
}
