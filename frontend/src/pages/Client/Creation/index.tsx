import { useState } from "react";

import { Box, Paper } from "@mui/material";
import { FormClient } from "@models/client";
import { LayoutBaseDePagina } from "@layouts/base";
import { Form, Header } from "@components/client/Creation";

export function CreationClient() {
  const [formData, setFormData] = useState<FormClient>({
    type: "F",
    name: "",
    document: "",
    observation: "",
    active: true,
    id_profile: "",
  });

  return (
    <LayoutBaseDePagina>
      <Box sx={{ p: 2 }}>
        <Header />

        <Box component={Paper} variant="outlined" sx={{ p: 2, m: 2 }}>
          <Form formData={formData} setFormData={setFormData} />
        </Box>
      </Box>
    </LayoutBaseDePagina>
  );
}
