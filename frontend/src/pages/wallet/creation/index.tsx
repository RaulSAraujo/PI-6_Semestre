import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  SelectChangeEvent,
  Typography,
  Box,
  IconButton,
  Tooltip,
  alpha,
  styled,
  useTheme,
  Snackbar,
} from "@mui/material";
import {
  ArrowBack,
  Add,
  TrendingUp,
  TrendingFlat,
  TrendingDown,
} from "@mui/icons-material";

import { LayoutBaseDePagina } from "@layouts/base";
import { WalletService } from "@services/api/wallet";

import {} from "@components/wallet";

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
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Novacarteira>({
    id_client: "",
    id_listed_shares: "",
    share_price: "",
    quantity_purchased: "",
    invested_amount: "",
  });

  const [acoes, setAcoes] = useState<IListagemlistedshares>();
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [loadingAcoes, setLoadingAcoes] = useState(true);
  const [selectedAcao, setSelectedAcao] = useState<IDetalhelistedshares | null>(
    null
  );

  // Carregar clientes
  useEffect(() => {
    const fetchCliente = async () => {
      setLoadingClientes(true);
      try {
        const response = await WalletService.get({});
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
      await WalletService.create(formData);
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
    <LayoutBaseDePagina>
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
