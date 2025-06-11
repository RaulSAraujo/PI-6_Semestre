import { useState } from "react";

import { Form } from "@components/client";
import { FormClient } from "@models/client";
import { LayoutBaseDePagina } from "@layouts/base";

export function CreationClient() {
  const [formData, setFormData] = useState<FormClient>({
    id: undefined,
    type: "F",
    name: "",
    document: "",
    observation: "",
    active: true,
    id_profile: "",
  });

  return (
    <LayoutBaseDePagina>
      <Form formData={formData} setFormData={setFormData} method="POST" />
    </LayoutBaseDePagina>
  );
}
