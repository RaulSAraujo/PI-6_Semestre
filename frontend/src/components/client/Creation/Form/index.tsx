import { FormEvent, useState } from "react";

import { TextField } from "@components/ui";
import { FormClient } from "@models/client";
import { Alert, Box, Button } from "@mui/material";
import { ClientesService } from "@services/api/client";

import { Type } from "./Type";
import { Profile } from "./Profile";
import { useNavigate } from "react-router-dom";
import { useTableContext } from "@contexts/TableContext";

type Props = {
  formData: FormClient;
  setFormData: (value: FormClient) => void;
};

export function Form({ formData, setFormData }: Props) {
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
      await ClientesService.create(
        {
          type: formData.type,
          name: formData.name,
          document: formData.document,
          observation: formData.observation,
          id_profile: parseInt(formData.id_profile),
        },
        page
      );

      navigate(`/clientes`);
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

        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            size="large"
            type="submit"
            color="primary"
            variant="contained"
            disabled={isLoading}
            sx={{ width: "250px", color: "white" }}
          >
            {isLoading ? "Salvando..." : "Salvar"}
          </Button>
        </Box>

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
