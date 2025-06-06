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
        sx={{ mb: 2 }}
      >
        Crie sua conta
      </Typography>

      <Typography
        variant="body2"
        align="center"
        color="textSecondary"
        sx={{ mb: 3 }}
      >
        Preencha os campos abaixo para se cadastrar
      </Typography>
    </>
  );
}
