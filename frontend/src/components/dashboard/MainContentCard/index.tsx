import { Box } from "@mui/system";
import { CardContent, Divider, Grid, Typography } from "@mui/material";
import {
  ArrowForward,
  BarChart,
  Insights,
  PieChart,
  ShowChart,
} from "@mui/icons-material";

import { InfoFeatureCard } from "../InfoFeatureCard";
import { ActionButton, CardHeader, StyledCard } from "./styles";

export function MainContentCard() {
  return (
    <StyledCard>
      <CardHeader>
        <Box display="flex" alignItems="center">
          <Insights
            sx={{ color: (theme) => theme.palette.primary.main, mr: 1 }}
          />
          <Typography variant="h6" fontWeight="600">
            Sobre Gestão de Investimentos
          </Typography>
        </Box>
        <ActionButton
          variant="contained"
          color="primary"
          size="small"
          endIcon={<ArrowForward />}
        >
          Saiba mais
        </ActionButton>
      </CardHeader>

      <CardContent>
        <Typography
          variant="body1"
          paragraph
          sx={{
            lineHeight: 1.7,
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          A gestão de investimentos é uma área dedicada ao estudo e
          administração de recursos financeiros, com o objetivo de maximizar o
          retorno e minimizar os riscos para os investidores. Os gestores de
          investimentos são responsáveis por analisar, planejar e implementar
          estratégias financeiras que abrangem uma ampla variedade de ativos,
          desde ações e títulos até imóveis e fundos mútuos.
        </Typography>

        <Typography
          variant="body1"
          paragraph
          sx={{
            lineHeight: 1.7,
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          A gestão de investimentos é um campo em constante evolução, com novas
          técnicas e tecnologias emergindo que permitem análises mais precisas e
          decisões mais informadas. Além disso, a gestão de investimentos é
          também uma arte, que exige habilidades analíticas e a capacidade de se
          comunicar de forma clara e eficaz com os clientes.
        </Typography>

        <Divider sx={{ my: 2, opacity: 0.6 }} />

        <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <InfoFeatureCard
              icon={ShowChart}
              title="Análise de Mercado"
              description="Avaliação contínua das tendências e oportunidades de mercado"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InfoFeatureCard
              icon={PieChart}
              title="Diversificação"
              description="Distribuição estratégica de recursos em diferentes classes de ativos"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InfoFeatureCard
              icon={BarChart}
              title="Gestão de Riscos"
              description="Identificação e mitigação de riscos para proteger seu patrimônio"
            />
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
}
