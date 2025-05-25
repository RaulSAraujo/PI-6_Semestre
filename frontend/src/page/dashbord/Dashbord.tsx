import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
  alpha,
  styled,
} from "@mui/material";
import {
  TrendingUp,
  ArrowForward,
  Insights,
  ShowChart,
  PieChart,
  BarChart,
} from "@mui/icons-material";

import { LayoutBaseDePagina } from "../../shared/layouts";
import { Lottie } from "../../shared/components";
import animationData from "../../assets/LottieJson/Animation1.json";
import animation from "../../assets/LottieJson/Animation2.json";

// Componentes estilizados
const WelcomeSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  background:
    theme.palette.mode === "dark"
      ? `linear-gradient(135deg, ${alpha(
          theme.palette.primary.dark,
          0.2
        )} 0%, ${alpha(theme.palette.secondary.dark, 0.2)} 100%)`
      : `linear-gradient(135deg, ${alpha(
          theme.palette.primary.light,
          0.15
        )} 0%, ${alpha(theme.palette.secondary.light, 0.15)} 100%)`,
  boxShadow:
    theme.palette.mode === "dark"
      ? `0 8px 32px ${alpha(theme.palette.common.black, 0.2)}`
      : `0 8px 32px ${alpha(theme.palette.common.black, 0.05)}`,
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  position: "relative",
  marginBottom: theme.spacing(4),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
}));

const AnimationContainer = styled(Box)(({ theme }) => ({
  width: "35%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    width: "25%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
}));

const ContentSection = styled(Box)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  height: "100%",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  boxShadow:
    theme.palette.mode === "dark"
      ? `0 6px 20px ${alpha(theme.palette.common.black, 0.2)}`
      : `0 6px 20px ${alpha(theme.palette.common.black, 0.05)}`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.05)}`,
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow:
      theme.palette.mode === "dark"
        ? `0 12px 28px ${alpha(theme.palette.common.black, 0.3)}`
        : `0 12px 28px ${alpha(theme.palette.common.black, 0.1)}`,
  },
}));

const CardHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  background:
    theme.palette.mode === "dark"
      ? `linear-gradient(90deg, ${alpha(
          theme.palette.primary.dark,
          0.3
        )} 0%, ${alpha(theme.palette.secondary.dark, 0.3)} 100%)`
      : `linear-gradient(90deg, ${alpha(
          theme.palette.primary.light,
          0.2
        )} 0%, ${alpha(theme.palette.secondary.light, 0.2)} 100%)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(1, 2),
  textTransform: "none",
  fontWeight: 600,
  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
  },
}));

const InfoCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 16,
  height: "100%",
  background:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.background.paper, 0.6)
      : alpha(theme.palette.background.paper, 0.8),
  backdropFilter: "blur(10px)",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
}));

const LottieWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: 16,
  height: "100%",
  minHeight: 250,
  background:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.background.paper, 0.4)
      : alpha(theme.palette.background.paper, 0.6),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

// Componente principal
export const Dashboard = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Simulação de dados de estatísticas
  const [stats, setStats] = useState({
    totalInvestments: "R$ 0",
    returns: "0%",
    growth: "0%",
  });

  // Efeito para simular carregamento de dados
  useEffect(() => {
    // Simulando uma chamada API
    setTimeout(() => {
      setStats({
        totalInvestments: "R$ 157.350,00",
        returns: "12,7%",
        growth: "8,3%",
      });
    }, 1000);
  }, []);

  return (
    <LayoutBaseDePagina>
      <WelcomeSection elevation={0}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4} md={3}>
            <AnimationContainer>
              <Lottie animationData={animationData} />
            </AnimationContainer>
          </Grid>
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
                    {stats.totalInvestments}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Retorno Anual
                  </Typography>
                  <Typography variant="h6" fontWeight="700" color="primary">
                    {stats.returns}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Crescimento
                  </Typography>
                  <Typography variant="h6" fontWeight="700" color="primary">
                    {stats.growth}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </WelcomeSection>

      <ContentSection>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <StyledCard>
              <CardHeader>
                <Box display="flex" alignItems="center">
                  <Insights sx={{ color: theme.palette.primary.main, mr: 1 }} />
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
                    color: theme.palette.text.secondary,
                  }}
                >
                  A gestão de investimentos é uma área dedicada ao estudo e
                  administração de recursos financeiros, com o objetivo de
                  maximizar o retorno e minimizar os riscos para os
                  investidores. Os gestores de investimentos são responsáveis
                  por analisar, planejar e implementar estratégias financeiras
                  que abrangem uma ampla variedade de ativos, desde ações e
                  títulos até imóveis e fundos mútuos.
                </Typography>

                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    lineHeight: 1.7,
                    color: theme.palette.text.secondary,
                  }}
                >
                  A gestão de investimentos é um campo em constante evolução,
                  com novas técnicas e tecnologias emergindo que permitem
                  análises mais precisas e decisões mais informadas. Além disso,
                  a gestão de investimentos é também uma arte, que exige
                  habilidades analíticas e a capacidade de se comunicar de forma
                  clara e eficaz com os clientes.
                </Typography>

                <Divider sx={{ my: 2, opacity: 0.6 }} />

                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={4}>
                    <InfoCard>
                      <Box display="flex" alignItems="center" mb={1}>
                        <ShowChart
                          sx={{ color: theme.palette.primary.main, mr: 1 }}
                        />
                        <Typography variant="subtitle2" fontWeight="600">
                          Análise de Mercado
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="textSecondary">
                        Avaliação contínua das tendências e oportunidades de
                        mercado
                      </Typography>
                    </InfoCard>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InfoCard>
                      <Box display="flex" alignItems="center" mb={1}>
                        <PieChart
                          sx={{ color: theme.palette.primary.main, mr: 1 }}
                        />
                        <Typography variant="subtitle2" fontWeight="600">
                          Diversificação
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="textSecondary">
                        Distribuição estratégica de recursos em diferentes
                        classes de ativos
                      </Typography>
                    </InfoCard>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InfoCard>
                      <Box display="flex" alignItems="center" mb={1}>
                        <BarChart
                          sx={{ color: theme.palette.primary.main, mr: 1 }}
                        />
                        <Typography variant="subtitle2" fontWeight="600">
                          Gestão de Riscos
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="textSecondary">
                        Identificação e mitigação de riscos para proteger seu
                        patrimônio
                      </Typography>
                    </InfoCard>
                  </Grid>
                </Grid>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid
              container
              spacing={3}
              direction={isSmallScreen ? "row" : "column"}
              style={{ height: "100%" }}
            >
              <Grid item xs={12}>
                <LottieWrapper>
                  <Lottie animationData={animation} />
                </LottieWrapper>
              </Grid>
              <Grid item xs={12}>
                <StyledCard>
                  <CardHeader>
                    <Box display="flex" alignItems="center">
                      <TrendingUp
                        sx={{ color: theme.palette.primary.main, mr: 1 }}
                      />
                      <Typography variant="h6" fontWeight="600">
                        Próximos Passos
                      </Typography>
                    </Box>
                  </CardHeader>
                  <CardContent>
                    <Typography variant="body2" paragraph>
                      Com a orientação correta, a gestão de investimentos pode
                      ser um recurso poderoso para melhorar a segurança
                      financeira e alcançar um crescimento sustentável a longo
                      prazo.
                    </Typography>
                    <ActionButton
                      variant="contained"
                      color="primary"
                      fullWidth
                      endIcon={<ArrowForward />}
                      sx={{ mt: 1 }}
                    >
                      Começar agora
                    </ActionButton>
                  </CardContent>
                </StyledCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ContentSection>
    </LayoutBaseDePagina>
  );
};
