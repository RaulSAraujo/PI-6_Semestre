// src/pages/dashboard/components/NextStepsCard.jsx
import { CardContent, Typography, Box } from "@mui/material";
import { TrendingUp, ArrowForward } from "@mui/icons-material";
import { StyledCard, CardHeader, ActionButton } from "./styles";

export function NextStepsCard() {
  return (
    <StyledCard>
      <CardHeader>
        <Box display="flex" alignItems="center">
          <TrendingUp
            sx={{ color: (theme) => theme.palette.primary.main, mr: 1 }}
          />
          <Typography variant="h6" fontWeight="600">
            Próximos Passos
          </Typography>
        </Box>
      </CardHeader>
      <CardContent>
        <Typography variant="body2" paragraph>
          Com a orientação correta, a gestão de investimentos pode ser um
          recurso poderoso para melhorar a segurança financeira e alcançar um
          crescimento sustentável a longo prazo.
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
  );
}
