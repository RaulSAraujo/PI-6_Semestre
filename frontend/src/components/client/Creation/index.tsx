import { useState } from "react";

import { Box, Paper } from "@mui/material";
import { FormClient } from "@models/client";

import { Form } from "./Form";
import { Header } from "./Header";

export function Creation() {
  const [formData, setFormData] = useState<FormClient>({
    type: "F",
    name: "",
    document: "",
    observation: "",
    active: true,
    id_profile: "",
  });

  return (
    <Box sx={{ p: 2 }}>
      <Header />

      <Box component={Paper} variant="outlined" sx={{ p: 2, m: 2 }}>
        <Form formData={formData} setFormData={setFormData} />
      </Box>
    </Box>
  );
}
