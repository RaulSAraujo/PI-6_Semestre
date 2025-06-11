import { FormClient } from "@models/client";
import { alpha, Box, LinearProgress, Paper, useTheme } from "@mui/material";

import { Card } from "./Card";
import { Header } from "./Header";

type Props = {
  isLoading?: boolean;
  formData: FormClient;
  method: "POST" | "PUT";
  setFormData: (value: FormClient) => void;
};

export function Form({
  method,
  formData,
  setFormData,
  isLoading = false,
}: Props) {
  const theme = useTheme();

  return (
    <Box sx={{ p: 2 }}>
      <Header />

      <Box component={Paper} variant="outlined" sx={{ p: 2, m: 2 }}>
        {isLoading && (
          <LinearProgress
            variant="indeterminate"
            sx={{
              height: 6,
              borderRadius: 3,
              mb: 2,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
            }}
          />
        )}

        <Card method={method} formData={formData} setFormData={setFormData} />
      </Box>
    </Box>
  );
}
