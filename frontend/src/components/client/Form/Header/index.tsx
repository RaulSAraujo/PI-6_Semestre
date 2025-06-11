import { Box, Typography } from "@mui/material";

import { BackButton } from "./BackButton";
import { Add } from "@mui/icons-material";

export function Header() {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
    >
      <Box display="flex" alignItems="center">
        <BackButton />

        <Typography
          variant="h5"
          component="h2"
          color="primary"
          fontWeight="700"
          sx={{ ml: 2, display: "flex", alignItems: "center" }}
        >
          <Add sx={{ mr: 1 }} />
          Cadastrar novo cliente
        </Typography>
      </Box>
    </Box>
  );
}
