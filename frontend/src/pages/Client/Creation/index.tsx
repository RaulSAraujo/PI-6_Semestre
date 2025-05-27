import { useState, useEffect, FormEvent } from "react";
import { ClientesService } from "../../../services/api/cliente/clientes";
import {
  PerfilService,
  IDetalhePerfil,
} from "../../../services/api/perfil/perfil";
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
} from "@mui/material";
import { LayoutBaseDePagina } from "../../../layouts/LayoutBase";
import { useNavigate } from "react-router-dom";

interface INovoClienteForm {
  type: string;
  name: string;
  document: string;
  observation: string;
  active: boolean;
  id_profile: string;
}

export const Novoclientes: React.FC = () => {
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

  const [profiles, setProfiles] = useState<IDetalhePerfil[]>([]);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  useEffect(() => {
    const fetchProfiles = async () => {
      setIsLoading(true);
      try {
        const result = await PerfilService.getAll();

        if (result instanceof Error) {
          console.error(result.message);
        } else {
          setProfiles(result.data.items);
        }
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
      } finally {
        setIsLoading(false);
      }
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

    try {
      const result = await ClientesService.create(formData);

      if (result instanceof Error) {
        setSubmitStatus("error");
        console.error(result.message);
      } else {
        setSubmitStatus("success");
        navigate("/clientes");
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LayoutBaseDePagina titulo="Novo Cliente" barraDeFerramentas={<></>}>
      <Box component={Paper} variant="outlined" sx={{ p: 2, m: 2 }}>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <FormControl fullWidth>
              <InputLabel id="type-select-label">Tipo</InputLabel>
              <Select
                labelId="type-select-label"
                name="type"
                value={formData.type}
                onChange={handleTypeChange}
                required
                disabled={isLoading}
              >
                <MenuItem value="F">Física</MenuItem>
                <MenuItem value="J">Jurídica</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Nome"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              fullWidth
              disabled={isLoading}
            />

            <TextField
              label="Documento"
              name="document"
              value={formData.document}
              onChange={handleInputChange}
              required
              fullWidth
              disabled={isLoading}
            />

            <TextField
              label="Observação"
              name="observation"
              value={formData.observation}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
              disabled={isLoading}
            />

            <FormControl fullWidth>
              <InputLabel id="profile-select-label">Perfil</InputLabel>
              <Select
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
              </Select>
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
    </LayoutBaseDePagina>
  );
};
