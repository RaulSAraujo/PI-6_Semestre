import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  SelectChangeEvent,
  Typography,
  Box,
  Paper,
  Grid,
  Divider,
  IconButton,
  Tooltip,
  alpha,
  styled,
  useTheme,
  FormHelperText,
  Snackbar,
  Card,
  CardContent,
  CardHeader,
  Fade,
  Chip,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import {
  ArrowBack,
  Save,
  History,
  ShowChart,
  TrendingUp,
  TrendingDown,
  DateRange,
  AttachMoney,
  BarChart,
  ArrowUpward,
  ArrowDownward,
  Timeline,
  Add,
  Category,
} from "@mui/icons-material";

import { LayoutBaseDePagina } from "../../../layouts/LayoutBase";
import { HistoricoService } from "../../../services/api/historico/historico";
import {
  listedsharesService,
  IListagemlistedshares,
} from "../../../services/api/acoes_listadas/acoes_listadas";
import {
  PerfilService,
  IListagemPerfil,
} from "../../../services/api/perfil/perfil";

// Componentes estilizados
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  overflow: "hidden",
  boxShadow:
    theme.palette.mode === "dark"
      ? `0 6px 20px ${alpha(theme.palette.common.black, 0.2)}`
      : `0 6px 20px ${alpha(theme.palette.common.black, 0.05)}`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.05)}`,
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  background:
    theme.palette.mode === "dark"
      ? `linear-gradient(90deg, ${alpha(
          theme.palette.primary.dark,
          0.3
        )} 0%, ${alpha(theme.palette.secondary.dark, 0.3)} 100%)`
      : `linear-gradient(90deg, ${alpha(
          theme.palette.primary.light,
          0.2
        )} 0%, ${alpha(theme.palette.secondary.light, 0.2)} 100%)`,
  padding: theme.spacing(2, 3),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    transition: "all 0.3s ease",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiInputLabel-root": {
    transition: "all 0.3s ease",
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
  },
  "& .MuiSelect-select": {
    padding: theme.spacing(1.5, 2),
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    transition: "all 0.3s ease",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiInputLabel-root": {
    transition: "all 0.3s ease",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(1.2, 3),
  textTransform: "none",
  fontWeight: 600,
  fontSize: "1rem",
  boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.2)}`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
  },
}));

const BackButton = styled(IconButton)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.background.paper, 0.5)
      : alpha(theme.palette.background.paper, 0.8),
  border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
  borderRadius: 12,
  padding: theme.spacing(1),
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    transform: "translateY(-2px)",
  },
}));

const ProfileChip = styled(Chip)(({ theme, color }) => ({
  borderRadius: 8,
  fontWeight: 500,
  backgroundColor:
    color === "conservador"
      ? alpha(theme.palette.info.main, 0.1)
      : color === "moderado"
      ? alpha(theme.palette.warning.main, 0.1)
      : alpha(theme.palette.error.main, 0.1),
  color:
    color === "conservador"
      ? theme.palette.info.main
      : color === "moderado"
      ? theme.palette.warning.main
      : theme.palette.error.main,
  border: `1px solid ${
    color === "conservador"
      ? alpha(theme.palette.info.main, 0.2)
      : color === "moderado"
      ? alpha(theme.palette.warning.main, 0.2)
      : alpha(theme.palette.error.main, 0.2)
  }`,
  "& .MuiChip-icon": {
    color:
      color === "conservador"
        ? theme.palette.info.main
        : color === "moderado"
        ? theme.palette.warning.main
        : theme.palette.error.main,
  },
}));

const TickerChip = styled(Chip)(({ theme }) => ({
  borderRadius: 8,
  fontWeight: 700,
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  color: theme.palette.primary.main,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  "& .MuiChip-icon": {
    color: theme.palette.primary.main,
  },
}));

const SummaryCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(2),
  backgroundColor: alpha(theme.palette.info.main, 0.05),
  border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
  boxShadow: `0 4px 14px ${alpha(theme.palette.common.black, 0.05)}`,
}));

// Interface
interface Novohistorico {
  id_listed_shares: string;
  id_profile: string;
  date: string;
  last_value: string;
  opening: string;
  high: string;
  low: string;
  trading_volume: string;
  percentage_change: string;
}

// Componente principal
export function CreationHistory() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Novohistorico>({
    id_listed_shares: "",
    id_profile: "",
    date: "",
    last_value: "",
    opening: "",
    high: "",
    low: "",
    trading_volume: "",
    percentage_change: "",
  });

  const [acoes, setAcoes] = useState<IListagemlistedshares>();
  const [perfis, setPerfis] = useState<IListagemPerfil>();
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loadingPerfis, setLoadingPerfis] = useState(true);
  const [loadingAcoes, setLoadingAcoes] = useState(true);
  const [selectedAcao, setSelectedAcao] = useState<any | null>(null);

  // Carregar perfis
  useEffect(() => {
    const fetchPerfis = async () => {
      setLoadingPerfis(true);
      try {
        const response = await PerfilService.getAll();
        if (response instanceof Error) {
          console.error(response.message);
        } else {
          setPerfis(response.data.items);
        }
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
      } finally {
        setLoadingPerfis(false);
      }
    };
    fetchPerfis();
  }, []);

  // Carregar ações
  useEffect(() => {
    const fetchAcoes = async () => {
      setLoadingAcoes(true);
      try {
        const response = await listedsharesService.getAll();
        if (response instanceof Error) {
          console.error(response.message);
        } else {
          setAcoes(response.data.items);
        }
      } catch (error) {
        console.error("Erro ao buscar ações:", error);
      } finally {
        setLoadingAcoes(false);
      }
    };
    fetchAcoes();
  }, []);

  // Atualizar ação selecionada quando o id muda
  useEffect(() => {
    if (formData.id_listed_shares && Array.isArray(acoes)) {
      const acao = acoes.find((a) => a.id === formData.id_listed_shares);
      setSelectedAcao(acao || null);
    } else {
      setSelectedAcao(null);
    }
  }, [formData.id_listed_shares, acoes]);

  // Calcular variação percentual automaticamente
  useEffect(() => {
    if (formData.opening && formData.last_value) {
      const opening = parseFloat(formData.opening.replace(/[^\d.-]/g, ""));
      const lastValue = parseFloat(formData.last_value.replace(/[^\d.-]/g, ""));

      if (!isNaN(opening) && !isNaN(lastValue) && opening !== 0) {
        const percentChange = (((lastValue - opening) / opening) * 100).toFixed(
          2
        );
        setFormData((prev) => ({
          ...prev,
          percentage_change: percentChange,
        }));
      }
    }
  }, [formData.opening, formData.last_value]);

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

  const handlePerfilChange = (e: SelectChangeEvent<string>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      id_profile: e.target.value,
    }));

    if (errors.id_profile) {
      setErrors((prev) => ({ ...prev, id_profile: "" }));
    }
  };

  const handleAcoesChange = (e: SelectChangeEvent<string>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      id_listed_shares: e.target.value,
    }));

    if (errors.id_listed_shares) {
      setErrors((prev) => ({ ...prev, id_listed_shares: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.id_profile) {
      newErrors.id_profile = "Perfil é obrigatório";
    }

    if (!formData.id_listed_shares) {
      newErrors.id_listed_shares = "Ação é obrigatória";
    }

    if (!formData.date) {
      newErrors.date = "Data é obrigatória";
    }

    if (!formData.last_value) {
      newErrors.last_value = "Último valor é obrigatório";
    } else if (isNaN(parseFloat(formData.last_value.replace(/[^\d.-]/g, "")))) {
      newErrors.last_value = "Último valor deve ser um número válido";
    }

    if (!formData.opening) {
      newErrors.opening = "Abertura é obrigatória";
    } else if (isNaN(parseFloat(formData.opening.replace(/[^\d.-]/g, "")))) {
      newErrors.opening = "Abertura deve ser um número válido";
    }

    if (!formData.high) {
      newErrors.high = "Alta é obrigatória";
    } else if (isNaN(parseFloat(formData.high.replace(/[^\d.-]/g, "")))) {
      newErrors.high = "Alta deve ser um número válido";
    }

    if (!formData.low) {
      newErrors.low = "Baixa é obrigatória";
    } else if (isNaN(parseFloat(formData.low.replace(/[^\d.-]/g, "")))) {
      newErrors.low = "Baixa deve ser um número válido";
    }

    if (!formData.trading_volume) {
      newErrors.trading_volume = "Volume de negociação é obrigatório";
    } else if (
      isNaN(parseFloat(formData.trading_volume.replace(/[^\d.-]/g, "")))
    ) {
      newErrors.trading_volume =
        "Volume de negociação deve ser um número válido";
    }

    if (!formData.percentage_change) {
      newErrors.percentage_change = "Alteração percentual é obrigatória";
    } else if (
      isNaN(parseFloat(formData.percentage_change.replace(/[^\d.-]/g, "")))
    ) {
      newErrors.percentage_change =
        "Alteração percentual deve ser um número válido";
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
      await HistoricoService.create(formData);
      setSubmitStatus("success");

      // Aguardar um pouco antes de redirecionar para mostrar a mensagem de sucesso
      setTimeout(() => {
        navigate("/historico");
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

  const formatCurrency = (value: string) => {
    if (!value) return "";

    const numValue = parseFloat(value.replace(/[^\d.-]/g, ""));
    if (isNaN(numValue)) return "";

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numValue);
  };

  const formatPercentage = (value: string) => {
    if (!value) return "";

    const numValue = parseFloat(value.replace(/[^\d.-]/g, ""));
    if (isNaN(numValue)) return "";

    return `${numValue.toFixed(2)}%`;
  };

  return (
    <LayoutBaseDePagina titulo="Novo Histórico">
      <Box sx={{ p: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box display="flex" alignItems="center">
            <Tooltip title="Voltar para o histórico">
              <BackButton onClick={() => navigate("/historico")}>
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
              Adicionar Novo Histórico
            </Typography>
          </Box>
        </Box>

        <Fade in timeout={500}>
          <StyledCard>
            <StyledCardHeader
              title={
                <Typography variant="subtitle1" fontWeight="600">
                  Informações do Histórico
                </Typography>
              }
            />

            <CardContent sx={{ p: 3 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <StyledFormControl fullWidth error={!!errors.id_profile}>
                      <InputLabel id="perfil-select-label">
                        Perfil de Investimento
                      </InputLabel>
                      <StyledSelect
                        labelId="perfil-select-label"
                        value={formData.id_profile}
                        onChange={handlePerfilChange}
                        label="Perfil de Investimento"
                        startAdornment={
                          <InputAdornment position="start">
                            <Category />
                          </InputAdornment>
                        }
                        disabled={loadingPerfis}
                        endAdornment={
                          loadingPerfis ? (
                            <InputAdornment position="end">
                              <CircularProgress size={20} />
                            </InputAdornment>
                          ) : null
                        }
                      >
                        {loadingPerfis ? (
                          <MenuItem value="" disabled>
                            Carregando perfis...
                          </MenuItem>
                        ) : Array.isArray(perfis) && perfis.length > 0 ? (
                          perfis.map((p) => (
                            <MenuItem key={p.id.toString()} value={p.id}>
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                width="100%"
                              >
                                <Typography>{p.description}</Typography>
                                <ProfileChip
                                  size="small"
                                  label={p.description}
                                  icon={getProfileIcon(p.description)}
                                  color={getProfileColor(p.description)}
                                />
                              </Box>
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value="" disabled>
                            Nenhum perfil disponível
                          </MenuItem>
                        )}
                      </StyledSelect>
                      {errors.id_profile && (
                        <FormHelperText error>
                          {errors.id_profile}
                        </FormHelperText>
                      )}
                    </StyledFormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <StyledFormControl
                      fullWidth
                      error={!!errors.id_listed_shares}
                    >
                      <InputLabel id="acoes-select-label">Ação</InputLabel>
                      <StyledSelect
                        labelId="acoes-select-label"
                        value={formData.id_listed_shares}
                        onChange={handleAcoesChange}
                        label="Ação"
                        startAdornment={
                          <InputAdornment position="start">
                            <ShowChart />
                          </InputAdornment>
                        }
                        disabled={loadingAcoes}
                        endAdornment={
                          loadingAcoes ? (
                            <InputAdornment position="end">
                              <CircularProgress size={20} />
                            </InputAdornment>
                          ) : null
                        }
                      >
                        {loadingAcoes ? (
                          <MenuItem value="" disabled>
                            Carregando ações...
                          </MenuItem>
                        ) : Array.isArray(acoes) && acoes.length > 0 ? (
                          acoes.map((a) => (
                            <MenuItem key={a.id.toString()} value={a.id}>
                              <Box display="flex" alignItems="center">
                                <TickerChip
                                  size="small"
                                  label={a.ticker}
                                  icon={<ShowChart />}
                                  sx={{ mr: 1 }}
                                />
                                <Typography>{a.name}</Typography>
                              </Box>
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value="" disabled>
                            Nenhuma ação disponível
                          </MenuItem>
                        )}
                      </StyledSelect>
                      {errors.id_listed_shares && (
                        <FormHelperText error>
                          {errors.id_listed_shares}
                        </FormHelperText>
                      )}
                    </StyledFormControl>
                  </Grid>

                  {selectedAcao && (
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.05
                          ),
                          border: `1px dashed ${alpha(
                            theme.palette.primary.main,
                            0.3
                          )}`,
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <TickerChip
                          label={selectedAcao.ticker}
                          icon={<ShowChart />}
                        />
                        <Typography variant="body1" fontWeight="500">
                          {selectedAcao.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ ml: "auto" }}
                        >
                          Setor: {selectedAcao.b3_sector_classification}
                        </Typography>
                      </Box>
                    </Grid>
                  )}

                  <Grid item xs={12} md={6}>
                    <StyledTextField
                      label="Data"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      fullWidth
                      error={!!errors.date}
                      helperText={errors.date}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <DateRange />
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <StyledTextField
                      label="Último Valor"
                      name="last_value"
                      value={formData.last_value}
                      onChange={handleInputChange}
                      fullWidth
                      error={!!errors.last_value}
                      helperText={errors.last_value}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoney />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <StyledTextField
                      label="Abertura"
                      name="opening"
                      value={formData.opening}
                      onChange={handleInputChange}
                      fullWidth
                      error={!!errors.opening}
                      helperText={errors.opening}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Timeline />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <StyledTextField
                      label="Alta"
                      name="high"
                      value={formData.high}
                      onChange={handleInputChange}
                      fullWidth
                      error={!!errors.high}
                      helperText={errors.high}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ArrowUpward color="success" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <StyledTextField
                      label="Baixa"
                      name="low"
                      value={formData.low}
                      onChange={handleInputChange}
                      fullWidth
                      error={!!errors.low}
                      helperText={errors.low}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ArrowDownward color="error" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <StyledTextField
                      label="Volume de Negociação"
                      name="trading_volume"
                      value={formData.trading_volume}
                      onChange={handleInputChange}
                      fullWidth
                      error={!!errors.trading_volume}
                      helperText={errors.trading_volume}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BarChart color="secondary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <StyledTextField
                      label="Alteração Percentual"
                      name="percentage_change"
                      value={formData.percentage_change}
                      onChange={handleInputChange}
                      fullWidth
                      error={!!errors.percentage_change}
                      helperText={
                        errors.percentage_change ||
                        "Calculado automaticamente com base na abertura e último valor"
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {parseFloat(formData.percentage_change) > 0 ? (
                              <ArrowUpward color="success" />
                            ) : parseFloat(formData.percentage_change) < 0 ? (
                              <ArrowDownward color="error" />
                            ) : (
                              <TrendingFlat />
                            )}
                          </InputAdornment>
                        ),
                        endAdornment: formData.percentage_change && (
                          <InputAdornment position="end">
                            <Chip
                              size="small"
                              label={formatPercentage(
                                formData.percentage_change
                              )}
                              color={
                                parseFloat(formData.percentage_change) > 0
                                  ? "success"
                                  : "error"
                              }
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {formData.opening &&
                    formData.last_value &&
                    formData.high &&
                    formData.low && (
                      <Grid item xs={12}>
                        <SummaryCard>
                          <Box display="flex" flexDirection="column" gap={1}>
                            <Typography
                              variant="subtitle2"
                              color="textSecondary"
                            >
                              Resumo da Cotação
                            </Typography>
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              flexWrap="wrap"
                              gap={2}
                            >
                              <Box>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  Abertura
                                </Typography>
                                <Typography variant="body1" fontWeight="500">
                                  {formatCurrency(formData.opening)}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  Último
                                </Typography>
                                <Typography variant="body1" fontWeight="500">
                                  {formatCurrency(formData.last_value)}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  Alta
                                </Typography>
                                <Typography
                                  variant="body1"
                                  fontWeight="500"
                                  color="success.main"
                                >
                                  {formatCurrency(formData.high)}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  Baixa
                                </Typography>
                                <Typography
                                  variant="body1"
                                  fontWeight="500"
                                  color="error.main"
                                >
                                  {formatCurrency(formData.low)}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  Variação
                                </Typography>
                                <Typography
                                  variant="body1"
                                  fontWeight="700"
                                  color={
                                    parseFloat(formData.percentage_change) > 0
                                      ? "success.main"
                                      : "error.main"
                                  }
                                >
                                  {formatPercentage(formData.percentage_change)}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </SummaryCard>
                      </Grid>
                    )}

                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                  </Grid>

                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between" gap={2}>
                      <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => navigate("/historico")}
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
                        {isLoading ? "Salvando..." : "Salvar Histórico"}
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
            ? "Histórico adicionado com sucesso!"
            : "Erro ao adicionar histórico. Tente novamente."}
        </Alert>
      </Snackbar>
    </LayoutBaseDePagina>
  );
}
