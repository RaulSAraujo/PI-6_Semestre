// src/pages/dashboard/components/WelcomePanel.jsx
import { Grid, Box, Typography } from "@mui/material";

import { WelcomeSection } from "./styles";

type Props = {
  status: {
    totalInvestments: string;
    returns: string;
    growth: string;
  };
};

export function WelcomePanel({ status }: Props) {
  return (
    <WelcomeSection elevation={0}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={8} md={9}>
          <Box>
            <Typography
              variant="h4"
              fontWeight="700"
              color="primary"
              gutterBottom
              sx={{
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                mb: 1,
              }}
            >
              Bem-vindo ao seu Sistema de Investimentos
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              sx={{ mb: 2 }}
            >
              Acompanhe seus investimentos, analise tendências e maximize seus
              retornos
            </Typography>
            <Box display="flex" gap={3} flexWrap="wrap" sx={{ mt: 2 }}>
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Investimentos Totais
                </Typography>
                <Typography variant="h6" fontWeight="700" color="primary">
                  {status.totalInvestments}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Retorno Anual
                </Typography>
                <Typography variant="h6" fontWeight="700" color="primary">
                  {status.returns}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Crescimento
                </Typography>
                <Typography variant="h6" fontWeight="700" color="primary">
                  {status.growth}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </WelcomeSection>
  );
}
