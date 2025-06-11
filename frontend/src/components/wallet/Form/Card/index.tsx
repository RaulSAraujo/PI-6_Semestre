import { useState } from "react";

import { ArrowBack, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  CardContent,
  Divider,
  Fade,
  Grid,
  InputLabel,
  Typography,
  useTheme,
} from "@mui/material";

import {
  ActionButton,
  ProfileChip,
  StyledCard,
  StyledCardHeader,
  StyledFormControl,
  StyledSelect,
  StyledTextField,
  SummaryCard,
  TickerChip,
} from "./styles";
import { useNavigate } from "react-router-dom";

export function Card() {
  const theme = useTheme();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Fade in timeout={500}>
      <StyledCard>
        <StyledCardHeader
          title={
            <Typography variant="subtitle1" fontWeight="600">
              Informações do Investimento
            </Typography>
          }
        />

        <CardContent sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}></Grid>

              <Grid item xs={12} md={6}></Grid>

              {/* {selectedAcao && (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                      border: `1px dashed ${alpha(
                        theme.palette.primary.main,
                        0.3
                      )}`,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <TickerChip
                      label={selectedAcao.ticker}
                      icon={<ShowChart />}
                    />
                    <Typography variant="body1" fontWeight="500">
                      {selectedAcao.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ ml: "auto" }}
                    >
                      Setor: {selectedAcao.b3_sector_classification}
                    </Typography>
                  </Box>
                </Grid>
              )} */}

              <Grid item xs={12} md={6}></Grid>

              <Grid item xs={12} md={6}></Grid>

              <Grid item xs={12}></Grid>

              {/* {formData.share_price &&
                formData.quantity_purchased &&
                formData.invested_amount && (
                  <Grid item xs={12}>
                    <SummaryCard>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Box>
                          <Typography variant="subtitle2" color="textSecondary">
                            Resumo do Investimento
                          </Typography>
                          <Typography variant="body1" fontWeight="500">
                            {formData.quantity_purchased} ações a{" "}
                            {formatCurrency(formData.share_price)} cada
                          </Typography>
                        </Box>
                        <Box textAlign="right">
                          <Typography variant="subtitle2" color="textSecondary">
                            Total Investido
                          </Typography>
                          <Typography
                            variant="h6"
                            color="success.main"
                            fontWeight="700"
                          >
                            {formatCurrency(formData.invested_amount)}
                          </Typography>
                        </Box>
                      </Box>
                    </SummaryCard>
                  </Grid>
                )} */}

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" gap={2}>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => navigate("/carteira")}
                    startIcon={<ArrowBack />}
                    sx={{
                      borderRadius: 3,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Cancelar
                  </Button>

                  <ActionButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                    startIcon={<Save />}
                  >
                    {isLoading ? "Salvando..." : "Salvar Investimento"}
                  </ActionButton>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </StyledCard>
    </Fade>
  );
}
