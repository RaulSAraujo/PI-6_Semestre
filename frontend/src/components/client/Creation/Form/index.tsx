import { FormEvent, useState } from "react";

import { TextField } from "@components/ui";
import { FormClient } from "@models/client";
import { Box, Button } from "@mui/material";
import { ClientesService } from "@services/api/client";

import { Type } from "./Type";
import { Profile } from "./Profile";

type Props = {
  formData: FormClient;
  setFormData: (value: FormClient) => void;
};

export function Form({ formData, setFormData }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await ClientesService.create({
        type: formData.type,
        name: formData.name,
        document: formData.document,
        id_profile: parseInt(formData.id_profile),
        observation: formData.observation,
      });

      if (result instanceof Error) {
        setSubmitStatus("error");

        console.error(result.message);
      } else {
        setSubmitStatus("success");

        // navigate("/clientes");
      }
    } catch (error) {
      console.error(error);
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

        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? "Salvando..." : "Salvar"}
          </Button>
        </Box>

        {/* {submitStatus === "success" && (
          <Alert severity="success">Cliente criado com sucesso!</Alert>
        )}

        {submitStatus === "error" && (
          <Alert severity="error">
            Erro ao criar cliente. Tente novamente.
          </Alert>
        )} */}
      </Box>
    </form>
  );
}
