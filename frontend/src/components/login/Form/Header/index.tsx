import { Typography } from "@mui/material";

export function Header() {
  return (
    <>
      <Typography
        variant="h5"
        align="center"
        fontWeight="700"
        color="primary"
        gutterBottom
        sx={{ mb: 3 }}
      >
        Bem-vindo de volta
      </Typography>

      <Typography
        variant="body2"
        align="center"
        color="textSecondary"
        sx={{ mb: 4 }}
      >
        Faça login para acessar sua conta
      </Typography>
    </>
  );
}
