import { Box, Typography } from "@mui/material";

import { BackButton } from "./BackButton";
import { Add } from "@mui/icons-material";

type Props = {
  method: "POST" | "PUT";
};

export function Header({ method }: Props) {
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
          {method === "POST" ? "Adicionar novo" : "Atualizar"} investimento
        </Typography>
      </Box>
    </Box>
  );
}
