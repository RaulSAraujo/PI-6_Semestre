import { FormEvent, useState } from "react";

import { useNavigate } from "react-router-dom";

import { TextField } from "@components/ui";
import { Alert, Box } from "@mui/material";
import { FormClient } from "@models/client";
import { ClientesService } from "@services/api/client";
import { useTableContext } from "@contexts/TableContext";

import { Type } from "./Type";
import { Submit } from "./Submit";
import { Profile } from "./Profile";

type Props = {
  formData: FormClient;
  method: "POST" | "PUT";
  setFormData: (value: FormClient) => void;
};

export function Card({ formData, setFormData, method }: Props) {
  const navigate = useNavigate();

  const { page } = useTableContext();

  const [isLoading, setIsLoading] = useState(false);

  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const body = {
        id: formData.id,
        type: formData.type,
        name: formData.name,
        document: formData.document,
        observation: formData.observation,
        id_profile: parseInt(formData.id_profile),
      };

      if (method === "POST") {
        await ClientesService.create(body, page);

        navigate(`/clientes`);
      }

      if (method === "PUT") {
        await ClientesService.update(body, page);
      }

      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Type
          isLoading={isLoading}
          value={formData.type}
          onChange={(value) => setFormData({ ...formData, type: value })}
        />

        <TextField
          required
          label="Nome"
          disabled={isLoading}
          value={formData.name}
          setError={() => {}}
          handleSubmit={() => {}}
          onChange={(value) => setFormData({ ...formData, name: value })}
        />

        <TextField
          required
          label="Documento"
          disabled={isLoading}
          setError={() => {}}
          handleSubmit={() => {}}
          value={formData.document}
          onChange={(value) => setFormData({ ...formData, document: value })}
        />

        <TextField
          rows={4}
          multiline
          label="Observação"
          setError={() => {}}
          disabled={isLoading}
          handleSubmit={() => {}}
          value={formData.observation}
          onChange={(value) => setFormData({ ...formData, observation: value })}
        />

        <Profile
          isLoading={isLoading}
          value={formData.id_profile}
          onChange={(value) => setFormData({ ...formData, id_profile: value })}
        />

        <Submit isLoading={isLoading} />

        {submitStatus === "success" && (
          <Alert severity="success">Cliente criado com sucesso!</Alert>
        )}

        {submitStatus === "error" && (
          <Alert severity="error">
            Erro ao criar cliente. Tente novamente.
          </Alert>
        )}
      </Box>
    </form>
  );
}
