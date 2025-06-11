import { FormData } from "@models/investment-portfolio";
import { alpha, Box, LinearProgress, useTheme } from "@mui/material";

import { Card } from "./Card";
import { Header } from "./Header";

type Props = {
  formData: FormData;
  isLoading?: boolean;
  method: "POST" | "PUT";
  setFormData: (value: FormData) => void;
};

export function Form(props: Props) {
  const theme = useTheme();

  const { formData, method, setFormData, isLoading = false } = props;

  return (
    <Box sx={{ p: 2 }}>
      <Header method={method} />

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
  );
}
