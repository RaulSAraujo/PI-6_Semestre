import { useState } from "react";

import { Form } from "@components/wallet";
import { LayoutBaseDePagina } from "@layouts/base";
import { FormData } from "@models/investment-portfolio";

export function CreationWallet() {
  const [formData, setFormData] = useState<FormData>({
    id: undefined,
    id_client: "",
    id_listed_shares: "",
    share_price: "",
    quantity_purchased: "",
    invested_amount: "",
  });

  return (
    <LayoutBaseDePagina>
      <Form
        method="POST"
        formData={formData}
        setFormData={setFormData}
        isLoading={false}
      />
    </LayoutBaseDePagina>
  );
}
