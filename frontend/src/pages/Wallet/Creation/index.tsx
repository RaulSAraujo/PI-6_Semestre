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
  AccountBalance,
  Person,
  ShowChart,
  AttachMoney,
  ShoppingCart,
  Calculate,
  Add,
  TrendingUp,
  TrendingFlat,
  TrendingDown,
} from "@mui/icons-material";

import { LayoutBaseDePagina } from "../../../layouts/LayoutBase";
import { CarteiraService } from "../../../services/api/carteira/carteira";
import {
  ClientesService,
  IDetalheCliente,
} from "../../../services/api/cliente/clientes";
import {
  listedsharesService,
  IListagemlistedshares,
  IDetalhelistedshares,
} from "../../../services/api/acoes_listadas/acoes_listadas";

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
  backgroundColor: alpha(theme.palette.success.main, 0.05),
  border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
  boxShadow: `0 4px 14px ${alpha(theme.palette.common.black, 0.05)}`,
}));

// Interface
interface Novacarteira {
  id_client: string;
  id_listed_shares: string;
  share_price: string;
  quantity_purchased: string;
  invested_amount: string;
}

// Componente principal
export function CreationWallet() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Novacarteira>({
    id_client: "",
    id_listed_shares: "",
    share_price: "",
    quantity_purchased: "",
    invested_amount: "",
  });

  const [cliente, setCliente] = useState<IDetalheCliente>();
  const [acoes, setAcoes] = useState<IListagemlistedshares>();
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loadingClientes, setLoadingClientes] = useState(true);
  const [loadingAcoes, setLoadingAcoes] = useState(true);
  const [selectedAcao, setSelectedAcao] = useState<IDetalhelistedshares | null>(
    null
  );

  // Carregar clientes
  useEffect(() => {
    const fetchCliente = async () => {
      setLoadingClientes(true);
      try {
        const response = await ClientesService.getAll();
        if (response instanceof Error) {
          console.error(response.message);
        } else {
          setCliente(response.data.items);
        }
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      } finally {
        setLoadingClientes(false);
      }
    };
    fetchCliente();
  }, []);

  // Carregar ações com base no cliente selecionado
  useEffect(() => {
    const fetchAcoes = async () => {
      if (!formData.id_client) return;

      setLoadingAcoes(true);
      try {
        const response = await listedsharesService.getAll();
        if (response instanceof Error) {
          console.error(response.message);
        } else {
          // Filtra as ações com base no id_profile do cliente selecionado
          const selectedClient = Array.isArray(cliente)
            ? cliente.find((c) => c.id === formData.id_client)
            : null;

          if (selectedClient) {
            const acoesFiltradas = response.data.items.filter(
              (acao: IDetalhelistedshares) =>
                acao.id_profile === selectedClient.id_profile
            );
            setAcoes(acoesFiltradas);
          } else {
            setAcoes(response.data.items);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar ações:", error);
      } finally {
        setLoadingAcoes(false);
      }
    };

    fetchAcoes();
  }, [formData.id_client, cliente]);

  // Atualizar ação selecionada quando o id muda
  useEffect(() => {
    if (formData.id_listed_shares && Array.isArray(acoes)) {
      const acao = acoes.find((a) => a.id === formData.id_listed_shares);
      setSelectedAcao(acao || null);
    } else {
      setSelectedAcao(null);
    }
  }, [formData.id_listed_shares, acoes]);

  // Calcular valor investido automaticamente
  useEffect(() => {
    if (formData.share_price && formData.quantity_purchased) {
      const price = parseFloat(formData.share_price.replace(/[^\d.-]/g, ""));
      const quantity = parseFloat(formData.quantity_purchased);

      if (!isNaN(price) && !isNaN(quantity)) {
        const total = (price * quantity).toFixed(2);
        setFormData((prev) => ({
          ...prev,
          invested_amount: total,
        }));
      }
    }
  }, [formData.share_price, formData.quantity_purchased]);

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

  const handleClienteChange = (e: SelectChangeEvent<string>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      id_client: e.target.value,
      // Resetar a ação selecionada quando o cliente muda
      id_listed_shares: "",
    }));

    if (errors.id_client) {
      setErrors((prev) => ({ ...prev, id_client: "" }));
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

    if (!formData.id_client) {
      newErrors.id_client = "Cliente é obrigatório";
    }

    if (!formData.id_listed_shares) {
      newErrors.id_listed_shares = "Ação é obrigatória";
    }

    if (!formData.share_price) {
      newErrors.share_price = "Preço da ação é obrigatório";
    } else if (
      isNaN(parseFloat(formData.share_price.replace(/[^\d.-]/g, "")))
    ) {
      newErrors.share_price = "Preço da ação deve ser um número válido";
    }

    if (!formData.quantity_purchased) {
      newErrors.quantity_purchased = "Quantidade é obrigatória";
    } else if (isNaN(parseFloat(formData.quantity_purchased))) {
      newErrors.quantity_purchased = "Quantidade deve ser um número válido";
    }

    if (!formData.invested_amount) {
      newErrors.invested_amount = "Valor investido é obrigatório";
    } else if (
      isNaN(parseFloat(formData.invested_amount.replace(/[^\d.-]/g, "")))
    ) {
      newErrors.invested_amount = "Valor investido deve ser um número válido";
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
      await CarteiraService.create(formData);
      setSubmitStatus("success");

      // Aguardar um pouco antes de redirecionar para mostrar a mensagem de sucesso
      setTimeout(() => {
        navigate("/carteira");
      }, 1500);
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const getProfileIcon = (profileId: number) => {
    switch (profileId) {
      case 1:
        return <TrendingDown />;
      case 2:
        return <TrendingFlat />;
      case 3:
        return <TrendingUp />;
      default:
        return <TrendingFlat />;
    }
  };

  const getProfileName = (profileId: number) => {
    switch (profileId) {
      case 1:
        return "conservador";
      case 2:
        return "moderado";
      case 3:
        return "arrojado";
      default:
        return "indefinido";
    }
  };

  const getProfileLabel = (profileId: number) => {
    switch (profileId) {
      case 1:
        return "Conservador";
      case 2:
        return "Moderado";
      case 3:
        return "Arrojado";
      default:
        return "Indefinido";
    }
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

  return (
    <LayoutBaseDePagina titulo="Nova Carteira">
      <Box sx={{ p: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box display="flex" alignItems="center">
            <Tooltip title="Voltar para a carteira">
              <BackButton onClick={() => navigate("/carteira")}>
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
              Adicionar Novo Investimento
            </Typography>
          </Box>
        </Box>

        <Fade in timeout={500}>
          <StyledCard>
            <StyledCardHeader
              title={
                <Typography variant="subtitle1" fontWeight="600">
                  Informações do Investimento
                </Typography>
              }
            />

            <CardContent sx={{ p: 3 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <StyledFormControl fullWidth error={!!errors.id_client}>
                      <InputLabel id="cliente-select-label">Cliente</InputLabel>
                      <StyledSelect
                        labelId="cliente-select-label"
                        value={formData.id_client}
                        onChange={handleClienteChange}
                        label="Cliente"
                        startAdornment={
                          <InputAdornment position="start">
                            <Person />
                          </InputAdornment>
                        }
                        disabled={loadingClientes}
                        endAdornment={
                          loadingClientes ? (
                            <InputAdornment position="end">
                              <CircularProgress size={20} />
                            </InputAdornment>
                          ) : null
                        }
                      >
                        {loadingClientes ? (
                          <MenuItem value="" disabled>
                            Carregando clientes...
                          </MenuItem>
                        ) : Array.isArray(cliente) && cliente.length > 0 ? (
                          cliente.map((c) => (
                            <MenuItem key={c.id.toString()} value={c.id}>
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                width="100%"
                              >
                                <Typography>{c.name}</Typography>
                                <ProfileChip
                                  size="small"
                                  label={getProfileLabel(Number(c.id_profile))}
                                  icon={getProfileIcon(Number(c.id_profile))}
                                  color={getProfileName(Number(c.id_profile))}
                                />
                              </Box>
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value="" disabled>
                            Nenhum cliente disponível
                          </MenuItem>
                        )}
                      </StyledSelect>
                      {errors.id_client && (
                        <FormHelperText error>
                          {errors.id_client}
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
                        disabled={loadingAcoes || !formData.id_client}
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
                        ) : !formData.id_client ? (
                          <MenuItem value="" disabled>
                            Selecione um cliente primeiro
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
                            Nenhuma ação disponível para este perfil
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
                      label="Preço da Ação"
                      name="share_price"
                      value={formData.share_price}
                      onChange={handleInputChange}
                      fullWidth
                      error={!!errors.share_price}
                      helperText={errors.share_price}
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
                      label="Quantidade Comprada"
                      name="quantity_purchased"
                      value={formData.quantity_purchased}
                      onChange={handleInputChange}
                      fullWidth
                      error={!!errors.quantity_purchased}
                      helperText={errors.quantity_purchased}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ShoppingCart />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <StyledTextField
                      label="Valor Investido"
                      name="invested_amount"
                      value={formData.invested_amount}
                      onChange={handleInputChange}
                      fullWidth
                      error={!!errors.invested_amount}
                      helperText={
                        errors.invested_amount ||
                        "Calculado automaticamente com base no preço e quantidade"
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Calculate />
                          </InputAdornment>
                        ),
                        readOnly: true,
                      }}
                    />
                  </Grid>

                  {formData.share_price &&
                    formData.quantity_purchased &&
                    formData.invested_amount && (
                      <Grid item xs={12}>
                        <SummaryCard>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Box>
                              <Typography
                                variant="subtitle2"
                                color="textSecondary"
                              >
                                Resumo do Investimento
                              </Typography>
                              <Typography variant="body1" fontWeight="500">
                                {formData.quantity_purchased} ações a{" "}
                                {formatCurrency(formData.share_price)} cada
                              </Typography>
                            </Box>
                            <Box textAlign="right">
                              <Typography
                                variant="subtitle2"
                                color="textSecondary"
                              >
                                Total Investido
                              </Typography>
                              <Typography
                                variant="h6"
                                color="success.main"
                                fontWeight="700"
                              >
                                {formatCurrency(formData.invested_amount)}
                              </Typography>
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
                        onClick={() => navigate("/carteira")}
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
                        {isLoading ? "Salvando..." : "Salvar Investimento"}
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
            ? "Investimento adicionado com sucesso!"
            : "Erro ao adicionar investimento. Tente novamente."}
        </Alert>
      </Snackbar>
    </LayoutBaseDePagina>
  );
}
