import { Box, Grid, Typography } from "@mui/material";

import { IconContainer, StatCard } from "./styles";

type Props = {
  icon: React.ReactNode;
  title: string;
  value: number | string;
};

export function Card({ icon, title, value }: Props) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <StatCard color="default">
        <Box
          display="flex"
          textAlign="center"
          alignItems="center"
          flexDirection="column"
        >
          <IconContainer color="primary">{icon}</IconContainer>

          <Typography variant="h6" fontWeight="600" gutterBottom>
            {title}
          </Typography>

          <Typography variant="h5" color="success" fontWeight="700">
            {value}
          </Typography>
        </Box>
      </StatCard>
    </Grid>
  );
}
