
import { useEffect, useState } from "react";

import { LayoutBaseDePagina } from "@layouts/base";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { MainContentCard, NextStepsCard, WelcomePanel } from "@components/dashboard";

import { ContentSection } from "./styles";

export const Dashboard = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
      <WelcomePanel status={stats} />

      <ContentSection>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <MainContentCard />
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid
              container
              spacing={3}
              direction={isSmallScreen ? "row" : "column"}
              style={{ height: "100%" }}
            >
              <Grid item xs={12}>
                <NextStepsCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ContentSection>
    </LayoutBaseDePagina>
  );
};
