import { Box } from "@mui/material";

import { Card } from "./Card";
import { Header } from "./Header";

type Props = {
  isLoading?: boolean;
  method: "POST" | "PUT";
};

export function Form(props: Props) {
  const { method, isLoading = false } = props;

  return (
    <Box sx={{ p: 2 }}>
      <Header method={method} />

      <Card />
    </Box>
  );
}
