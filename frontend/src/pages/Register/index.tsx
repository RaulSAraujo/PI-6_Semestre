import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Fade,
  IconButton,
  InputAdornment,
  styled,
  useTheme,
  alpha,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  PersonAdd,
  Email,
  Person,
  Badge,
  ArrowBack
} from "@mui/icons-material";
import log from "/public/logo.png";
import tenor from "../../../public/vecteezy.gif";
import { create } from "../../services/api/cadastro-user/user";

// Esquema de validação
const cadastro = yup.object().shape({
  cpf: yup.string().required("CPF é obrigatório"),
  email: yup.string().required("Email é obrigatório").email("Email inválido"),
  name: yup.string().required("Nome é obrigatório"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Senha inválida! Deve conter 8 ou mais caracteres, pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial."
    ),
});

// Componentes estilizados
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(8px)",
  background: alpha(theme.palette.background.paper, 0.85),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
  "& img": {
    width: "100px",
    height: "100px",
    borderRadius: 20,
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
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
  padding: theme.spacing(1.2),
  fontWeight: 600,
  textTransform: "none",
  fontSize: "1rem",
  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
  },
}));

const BackButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  left: theme.spacing(2),
  borderRadius: 12,
  padding: theme.spacing(1),
  minWidth: "auto",
  backgroundColor: alpha(theme.palette.background.paper, 0.7),
  color: theme.palette.text.primary,
  backdropFilter: "blur(5px)",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  zIndex: 10,
  "&:hover": {
    backgroundColor: alpha(theme.palette.background.paper, 0.9),
  },
}));

interface ICadastroProps {
  children?: React.ReactNode;
}

export const Cadastro: React.FC<ICadastroProps> = ({ }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [cpfError, setCpfError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const clearErrors = () => {
    setCpfError("");
    setEmailError("");
    setNameError("");
    setPasswordError("");
  };

  const handleSubmit = () => {
    setIsLoading(true);
    clearErrors();

    cadastro
      .validate({ cpf, email, name, password }, { abortEarly: false })
      .then((dadosValidados) => {
        const userData = {
          cpf: dadosValidados.cpf,
          email: dadosValidados.email,
          name: dadosValidados.name,
          password: dadosValidados.password,
        };
        return create(userData).then(() => {
          setIsLoading(false);
          setSuccessMessage("Cadastro realizado com sucesso!");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);

        errors.inner.forEach((error) => {
          if (error.path === "cpf") {
            setCpfError(error.message);
          } else if (error.path === "email") {
            setEmailError(error.message);
          } else if (error.path === "name") {
            setNameError(error.message);
          } else if (error.path === "password") {
            setPasswordError(error.message);
          }
        });
      });
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${tenor})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: alpha(theme.palette.common.black, 0.4),
          backdropFilter: "blur(2px)",
        },
      }}
    >
      <BackButton
        startIcon={<ArrowBack />}
        onClick={() => navigate("/")}
      >
        Voltar
      </BackButton>

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in timeout={800}>
          <Box>
            <LogoContainer>
              <img src={log} alt="Logo" />
            </LogoContainer>

            <StyledPaper elevation={0}>
              <Typography
                variant="h5"
                align="center"
                fontWeight="700"
                color="primary"
                gutterBottom
                sx={{ mb: 2 }}
              >
                Crie sua conta
              </Typography>

              <Typography
                variant="body2"
                align="center"
                color="textSecondary"
                sx={{ mb: 3 }}
              >
                Preencha os campos abaixo para se cadastrar
              </Typography>

              <StyledTextField
                fullWidth
                variant="outlined"
                label="CPF"
                value={cpf}
                disabled={isLoading}
                error={!!cpfError}
                helperText={cpfError}
                onKeyDown={() => setCpfError("")}
                onChange={(e) => setCpf(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Badge sx={{ color: theme.palette.text.secondary }} />
                    </InputAdornment>
                  ),
                }}
              />

              <StyledTextField
                fullWidth
                variant="outlined"
                label="Email"
                type="email"
                value={email}
                disabled={isLoading}
                error={!!emailError}
                helperText={emailError}
                onKeyDown={() => setEmailError("")}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: theme.palette.text.secondary }} />
                    </InputAdornment>
                  ),
                }}
              />

              <StyledTextField
                fullWidth
                variant="outlined"
                label="Nome completo"
                value={name}
                disabled={isLoading}
                error={!!nameError}
                helperText={nameError}
                onKeyDown={() => setNameError("")}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: theme.palette.text.secondary }} />
                    </InputAdornment>
                  ),
                }}
              />

              <StyledTextField
                fullWidth
                variant="outlined"
                label="Senha"
                type={showPassword ? "text" : "password"}
                value={password}
                disabled={isLoading}
                error={!!passwordError}
                helperText={passwordError}
                onKeyDown={() => setPasswordError("")}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: theme.palette.text.secondary
                        }}
                      >
                        🔒
                      </Box>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ mt: 1 }}>
                <ActionButton
                  variant="contained"
                  fullWidth
                  disabled={isLoading}
                  onClick={handleSubmit}
                  endIcon={<PersonAdd />}
                >
                  {isLoading ? "Cadastrando..." : "Criar conta"}
                </ActionButton>

                <Box display="flex" justifyContent="center" mt={2}>
                  <Button
                    variant="text"
                    disabled={isLoading}
                    onClick={() => navigate("/")}
                    sx={{
                      textTransform: "none",
                      color: theme.palette.text.secondary,
                      "&:hover": {
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      },
                    }}
                  >
                    Já tem uma conta? <span style={{ color: theme.palette.primary.main, marginLeft: 4, fontWeight: 600 }}>Faça login</span>
                  </Button>
                </Box>
              </Box>
            </StyledPaper>
          </Box>
        </Fade>
      </Container>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          elevation={6}
          variant="filled"
          severity="success"
          sx={{
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            width: '100%'
          }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};