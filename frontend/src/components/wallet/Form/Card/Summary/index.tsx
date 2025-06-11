import { Box, Grid, Typography } from "@mui/material";
import { FormData } from "@models/investment-portfolio";

import { SummaryCard } from "./styles";

type Props = {
  formData: FormData;
};

export function Summary({ formData }: Props) {
  const formatCurrency = (value: string) => {
    if (!value) return "";

    const numValue = parseFloat(value.replace(/[^\d.-]/g, ""));
    if (isNaN(numValue)) return "";

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numValue);
  };

  return (
    <>
      {formData.share_price &&
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
                    {formatCurrency(formData.share_price.replace(",", "."))}{" "}
                    cada
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
        )}
    </>
  );
}
