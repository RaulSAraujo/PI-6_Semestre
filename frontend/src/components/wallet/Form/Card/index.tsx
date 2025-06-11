import { FormEvent, useEffect, useState } from "react";

import { TextField } from "@components/ui";
import { FormData } from "@models/investment-portfolio";
import {
  Alert,
  Box,
  CardContent,
  Divider,
  Fade,
  Grid,
  Typography,
} from "@mui/material";

import { Submit } from "./Submit";
import { Summary } from "./Summary";
import { IdClient } from "./IdClient";
import { IdListedShares } from "./IdListedShares";
import { StyledCard, StyledCardHeader } from "./styles";

import { WalletService } from "@services/api/wallet";
import { useNavigate } from "react-router-dom";
import { useTableContext } from "@contexts/TableContext";

type Props = {
  formData: FormData;
  method: "POST" | "PUT";
  setFormData: (value: FormData) => void;
};

export function Card({ formData, method, setFormData }: Props) {
  const navigate = useNavigate();

  const { page } = useTableContext();

  const [isLoading, setIsLoading] = useState(false);

  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const body = {
        id: undefined,
        id_client: parseInt(formData.id_client),
        id_listed_shares: parseInt(formData.id_listed_shares),
        quantity_purchased: parseInt(formData.quantity_purchased),
        share_price: formData.share_price.replace(",", "."),
        invested_amount: formData.invested_amount,
      };

      if (method === "POST") {
        await WalletService.create(body, page);

        navigate(`/carteira`);
      }

      if (method === "PUT") {
        await WalletService.update(body, page);
      }

      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  // Calcular valor investido automaticamente
  useEffect(() => {
    if (formData.share_price && formData.quantity_purchased) {
      const quantity = parseFloat(formData.quantity_purchased);
      const price = parseFloat(formData.share_price.replace(",", "."));

      if (!isNaN(price) && !isNaN(quantity)) {
        const total = (price * quantity).toFixed(2);

        setFormData({ ...formData, invested_amount: total });
      }
    }
  }, [formData.share_price, formData.quantity_purchased]);

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
              <Grid item xs={12} md={6}>
                <IdClient
                  idClient={formData.id_client}
                  onChange={(id) => setFormData({ ...formData, id_client: id })}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <IdListedShares
                  idClient={formData.id_client}
                  idListedShares={formData.id_listed_shares}
                  onChange={(id) =>
                    setFormData({ ...formData, id_listed_shares: id })
                  }
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  required
                  label="Quantidade Comprada"
                  disabled={isLoading}
                  value={formData.quantity_purchased}
                  setError={() => {}}
                  handleSubmit={() => {}}
                  onChange={(value) =>
                    setFormData({ ...formData, quantity_purchased: value })
                  }
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  required
                  label="Preço da ação"
                  disabled={isLoading}
                  value={formData.share_price}
                  setError={() => {}}
                  handleSubmit={() => {}}
                  onChange={(value) =>
                    setFormData({ ...formData, share_price: value })
                  }
                />
              </Grid>

              <Summary formData={formData} />

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" gap={2}>
                  <Submit isLoading={isLoading} />
                </Box>
              </Grid>

              {submitStatus === "success" && (
                <Alert severity="success">
                  Investimento {method === "POST" ? "criado" : "atualizado"} com
                  sucesso!
                </Alert>
              )}

              {submitStatus === "error" && (
                <Alert severity="error">
                  Erro ao criar investimento. Tente novamente.
                </Alert>
              )}
            </Grid>
          </form>
        </CardContent>
      </StyledCard>
    </Fade>
  );
}
