import { useState, useEffect, FormEvent } from "react";
import { ClientesService } from "../../../services/api/client";

import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  SelectChangeEvent,
  Box,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { LayoutBaseDePagina } from "../../../layouts/base";
import { useNavigate } from "react-router-dom";

import { BackButton } from "./styles";
import { Add, ArrowBack } from "@mui/icons-material";

interface INovoClienteForm {
  type: string;
  name: string;
  active: boolean;
  document: string;
  id_profile: string;
  observation: string;
}

export function CreationClient() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<INovoClienteForm>({
    type: "F",
    name: "",
    document: "",
    observation: "",
    active: true,
    id_profile: "",
  });

  const [profiles, setProfiles] = useState<[]>([]);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  useEffect(() => {
    const fetchProfiles = async () => {
      setIsLoading(true);
      // try {
      //   const result = await PerfilService.getAll();

      //   if (result instanceof Error) {
      //     console.error(result.message);
      //   } else {
      //     setProfiles(result.data.items);
      //   }
      // } catch (error) {
      //   console.error("Erro ao buscar perfis:", error);
      // } finally {
      //   setIsLoading(false);
      // }
    };

    fetchProfiles();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfileChange = (e: SelectChangeEvent<string>) => {
    setFormData((prevData) => ({
      ...prevData,
      id_profile: e.target.value,
    }));
  };

  const handleTypeChange = (e: SelectChangeEvent<string>) => {
    setFormData((prevData) => ({
      ...prevData,
      type: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // try {
    //   const result = await ClientesService.create();

    //   if (result instanceof Error) {
    //     setSubmitStatus("error");
    //     console.error(result.message);
    //   } else {
    //     setSubmitStatus("success");
    //     navigate("/clientes");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   setSubmitStatus("error");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <LayoutBaseDePagina>
      <Box sx={{ p: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box display="flex" alignItems="center">
            <Tooltip title="Voltar para a lista">
              <BackButton onClick={() => navigate("/clientes")}>
                <ArrowBack />
              </BackButton>
            </Tooltip>

            <Typography
              variant="h5"
              component="h2"
              color="primary"
              fontWeight="700"
              sx={{ ml: 2, display: "flex", alignItems: "center" }}
            >
              <Add sx={{ mr: 1 }} />
              Cadastrar novo cliente
            </Typography>
          </Box>
        </Box>

        <Box component={Paper} variant="outlined" sx={{ p: 2, m: 2 }}>
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={2}>
              <FormControl fullWidth>
                <InputLabel id="type-select-label">Tipo</InputLabel>
                <Select
                  required
                  name="type"
                  labelId="type-select-label"
                  value={formData.type}
                  disabled={isLoading}
                  onChange={handleTypeChange}
                >
                  <MenuItem value="F">Física</MenuItem>
                  <MenuItem value="J">Jurídica</MenuItem>
                </Select>
              </FormControl>

              <TextField
                required
                fullWidth
                name="name"
                label="Nome"
                disabled={isLoading}
                value={formData.name}
                onChange={handleInputChange}
              />

              <TextField
                required
                fullWidth
                label="Documento"
                name="document"
                disabled={isLoading}
                value={formData.document}
                onChange={handleInputChange}
              />

              <TextField
                rows={4}
                multiline
                fullWidth
                label="Observação"
                name="observation"
                disabled={isLoading}
                value={formData.observation}
                onChange={handleInputChange}
              />

              <FormControl fullWidth>
                <InputLabel id="profile-select-label">Perfil</InputLabel>
                {/* <Select
                labelId="profile-select-label"
                value={formData.id_profile}
                onChange={handleProfileChange}
                required
                disabled={isLoading}
              >
                {profiles.length > 0 ? (
                  profiles.map((profile) => (
                    <MenuItem key={profile.id} value={profile.id}>
                      {profile.description}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    {isLoading
                      ? "Carregando perfis..."
                      : "Nenhum perfil encontrado"}
                  </MenuItem>
                )}
              </Select> */}
              </FormControl>

              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
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
        </Box>
      </Box>
    </LayoutBaseDePagina>
  );
}
