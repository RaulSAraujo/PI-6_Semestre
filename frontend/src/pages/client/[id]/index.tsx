import { useEffect, useState } from "react";

import { Form } from "@components/client";
import { FormClient } from "@models/client";
import { LayoutBaseDePagina } from "@layouts/base";
import { ClientesService } from "@services/api/client";
import { useParams } from "react-router-dom";

export function EditClient() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormClient>({
    id: undefined,
    type: "F",
    name: "",
    document: "",
    observation: "",
    active: true,
    id_profile: "",
  });

  async function fetch() {
    try {
      setIsLoading(true);

      const res = await ClientesService.get({ id: parseInt(id as string) });

      setFormData({
        id: res.items[0].id,
        type: res.items[0].type,
        name: res.items[0].name,
        document: res.items[0].document,
        observation: res.items[0].observation,
        active: res.items[0].active,
        id_profile: res.items[0].id_profile.toString(),
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
        isLoading={isLoading}
        formData={formData}
        setFormData={setFormData}
        method="PUT"
      />
    </LayoutBaseDePagina>
  );
}
