import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  MenuItem,
  InputLabel,
  Alert,
  SelectChangeEvent,
  Typography,
  Box,
  Grid,
  Divider,
  Tooltip,
  useTheme,
  FormHelperText,
  Snackbar,
  CardContent,
  Fade,
  InputAdornment,
} from "@mui/material";
import {
  ArrowBack,
  Save,
  ShowChart,
  Business,
  Category,
  TrendingUp,
  TrendingFlat,
  TrendingDown,
  CheckCircleOutline,
  Label,
  Add,
} from "@mui/icons-material";

import { LayoutBaseDePagina } from "../../../layouts/base";
import { ActionB3Service } from "@services/api/action";
import { ProfileService } from "@services/api/profile";

import {
  ActionButton,
  BackButton,
  ProfileChip,
  StyledCard,
  StyledCardHeader,
  StyledFormControl,
  StyledSelect,
  StyledTextField,
  TickerChip,
} from "./styles";

// Interface
interface NovaAcao {
  ticker: string;
  name: string;
  b3_sector_classification: string;
  id_profile: string;
  active: boolean;
}

// Componente principal
export function CreationAction() {
  const theme = useTheme();

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<NovaAcao>({
    ticker: "",
    name: "",
    b3_sector_classification: "",
    id_profile: "",
    active: true,
  });

  const [profiles, setProfiles] = useState([]);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await ProfileService.getAll();
        if (response instanceof Error) {
          console.error(response.message);
        } else {
          setProfiles([]);
        }
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
      }
    };
    fetchProfiles();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Limpar erro do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleProfileChange = (e: SelectChangeEvent<string>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      id_profile: e.target.value,
    }));

    if (errors.id_profile) {
      setErrors((prev) => ({ ...prev, id_profile: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.ticker.trim()) {
      newErrors.ticker = "Ticker é obrigatório";
    } else if (!/^[A-Z0-9]{4,6}$/.test(formData.ticker)) {
      newErrors.ticker =
        "Ticker inválido. Deve conter 4-6 caracteres alfanuméricos";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.b3_sector_classification.trim()) {
      newErrors.b3_sector_classification =
        "Classificação setorial é obrigatória";
    }

    if (!formData.id_profile) {
      newErrors.id_profile = "Perfil é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // await ActionB3Service.create(formData);
      setSubmitStatus("success");

      // Aguardar um pouco antes de redirecionar para mostrar a mensagem de sucesso
      setTimeout(() => {
        navigate("/acoes_listadas");
      }, 1500);
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const getProfileIcon = (description: string) => {
    if (description.toLowerCase().includes("conservador")) {
      return <TrendingDown />;
    } else if (description.toLowerCase().includes("moderado")) {
      return <TrendingFlat />;
    } else if (description.toLowerCase().includes("agressivo")) {
      return <TrendingUp />;
    }
    return <TrendingFlat />;
  };

  const getProfileColor = (description: string) => {
    if (description.toLowerCase().includes("conservador")) {
      return "conservador";
    } else if (description.toLowerCase().includes("moderado")) {
      return "moderado";
    } else if (description.toLowerCase().includes("agressivo")) {
      return "agressivo";
    }
    return "moderado";
  };

  const previewTicker = formData.ticker.trim() ? (
    <TickerChip
      size="small"
      label={formData.ticker.toUpperCase()}
      icon={<ShowChart />}
    />
  ) : null;

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
              <BackButton onClick={() => navigate("/acoes-listadas")}>
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
              Cadastrar Nova Ação
            </Typography>
          </Box>
        </Box>

        <Fade in timeout={500}>
          <StyledCard>
            <StyledCardHeader
              title={
                <Typography variant="subtitle1" fontWeight="600">
                  Informações da Ação
                </Typography>
              }
            />

            <CardContent sx={{ p: 3 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <StyledTextField
                      label="Ticker"
                      name="ticker"
                      value={formData.ticker}
                      onChange={handleInputChange}
                      fullWidth
                      error={!!errors.ticker}
                      helperText={errors.ticker || "Ex: PETR4, VALE3, ITUB4"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Label />
                          </InputAdornment>
                        ),
                        endAdornment: previewTicker && (
                          <InputAdornment position="end">
                            {previewTicker}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <StyledFormControl fullWidth error={!!errors.id_profile}>
                      <InputLabel id="profile-select-label">
                        Perfil de Investimento
                      </InputLabel>
                      {/* <StyledSelect
                        labelId="profile-select-label"
                        value={formData.id_profile}
                        onChange={handleProfileChange}
                        label="Perfil de Investimento"
                        startAdornment={
                          <InputAdornment position="start">
                            <TrendingUp />
                          </InputAdornment>
                        }
                        renderValue={(selected) => {
                          const selectedProfile = profiles?.find(
                            (p) => p.id === selected
                          );
                          if (!selectedProfile) return "";

                          return (
                            <ProfileChip
                              size="small"
                              label={selectedProfile.description}
                              icon={getProfileIcon(selectedProfile.description)}
                              color={getProfileColor(
                                selectedProfile.description
                              )}
                            />
                          );
                        }}
                      >
                        {profiles ? (
                          profiles.map((profile) => (
                            <MenuItem
                              key={profile.id.toString()}
                              value={profile.id}
                            >
                              <ProfileChip
                                size="small"
                                label={profile.description}
                                icon={getProfileIcon(profile.description)}
                                color={getProfileColor(profile.description)}
                              />
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value="" disabled>
                            Carregando perfis...
                          </MenuItem>
                        )}
                      </StyledSelect> */}
                      {errors.id_profile && (
                        <FormHelperText error>
                          {errors.id_profile}
                        </FormHelperText>
                      )}
                    </StyledFormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <StyledTextField
                      label="Nome da Empresa"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      fullWidth
                      error={!!errors.name}
                      helperText={
                        errors.name || "Ex: Petrobras, Vale, Itaú Unibanco"
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Business />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <StyledTextField
                      label="Classificação Setorial B3"
                      name="b3_sector_classification"
                      value={formData.b3_sector_classification}
                      onChange={handleInputChange}
                      fullWidth
                      error={!!errors.b3_sector_classification}
                      helperText={
                        errors.b3_sector_classification ||
                        "Ex: Petróleo e Gás, Mineração, Financeiro"
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Category />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <StyledTextField
                      label="Status"
                      value="Ativo"
                      disabled
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CheckCircleOutline color="success" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                  </Grid>

                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between" gap={2}>
                      <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => navigate("/acoes_listadas")}
                        startIcon={<ArrowBack />}
                        sx={{
                          borderRadius: 3,
                          textTransform: "none",
                          fontWeight: 600,
                        }}
                      >
                        Cancelar
                      </Button>

                      <ActionButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                        startIcon={<Save />}
                      >
                        {isLoading ? "Salvando..." : "Salvar Ação"}
                      </ActionButton>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </StyledCard>
        </Fade>
      </Box>

      <Snackbar
        open={submitStatus !== null}
        autoHideDuration={6000}
        onClose={() => setSubmitStatus(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={submitStatus === "success" ? "success" : "error"}
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          {submitStatus === "success"
            ? "Ação cadastrada com sucesso!"
            : "Erro ao cadastrar ação. Tente novamente."}
        </Alert>
      </Snackbar>
    </LayoutBaseDePagina>
  );
}
