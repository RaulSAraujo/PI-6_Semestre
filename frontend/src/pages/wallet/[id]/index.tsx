import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Form } from "@components/wallet";
import { LayoutBaseDePagina } from "@layouts/base";
import { WalletService } from "@services/api/wallet";
import { FormData } from "@models/investment-portfolio";

export function EditWallet() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    id: "",
    id_client: "",
    id_listed_shares: "",
    share_price: "",
    quantity_purchased: "",
    invested_amount: "",
  });

  async function fetch() {
    try {
      setIsLoading(true);

      const res = await WalletService.get({ id: parseInt(id as string) });

      setFormData({
        id: res.items[0].id.toString(),
        id_client: res.items[0].id_client.toString(),
        invested_amount: res.items[0].invested_amount.toString(),
        id_listed_shares: res.items[0].id_listed_shares.toString(),
        quantity_purchased: res.items[0].quantity_purchased.toString(),
        share_price: parseFloat(res.items[0].share_price).toFixed(2).replace(".", ","),
      });
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <LayoutBaseDePagina>
      <Form
        method="POST"
        formData={formData}
        setFormData={setFormData}
        isLoading={isLoading}
      />
    </LayoutBaseDePagina>
  );
}
