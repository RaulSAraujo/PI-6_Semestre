import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Container,
  Fade,
  IconButton,
  InputAdornment,
  styled,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
} from "@mui/icons-material";
import log from "/public/logo.png";
import { useAuthContext } from "../../contexts";
import backgroundImage from "../../../public/vecteezy.gif";

// Esquema de validação
const loginSchema = yup.object().shape({
  username: yup.string().required("Nome de usuário é obrigatório"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(5, "A senha deve ter pelo menos 5 caracteres"),
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
  marginBottom: theme.spacing(3),
  "& img": {
    width: "120px",
    height: "120px",
    borderRadius: 20,
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
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

const SignUpButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(1),
  textTransform: "none",
  fontWeight: 500,
  fontSize: "0.9rem",
  color: theme.palette.text.secondary,
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
}));

interface ILoginProps {
  children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, signIn } = useAuthContext();
  const navigate = useNavigate();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    setUsernameError("");
    setPasswordError("");

    loginSchema
      .validate({ username, password }, { abortEarly: false })
      .then((dadosValidados) => {
        signIn(dadosValidados.username, dadosValidados.password).then(() => {
          setIsLoading(false);
          navigate("/pagina-inicial");
        });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);

        errors.inner.forEach((error) => {
          if (error.path === "username") {
            setUsernameError(error.message);
          } else if (error.path === "password") {
            setPasswordError(error.message);
          }
        });
      });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isAuthenticated) return <>{children}</>;

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${backgroundImage})`,
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
      <Container maxWidth="xs" sx={{ position: "relative", zIndex: 1 }}>
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
                sx={{ mb: 3 }}
              >
                Bem-vindo de volta
              </Typography>

              <Typography
                variant="body2"
                align="center"
                color="textSecondary"
                sx={{ mb: 4 }}
              >
                Faça login para acessar sua conta
              </Typography>

              <StyledTextField
                fullWidth
                variant="outlined"
                label="Email"
                value={username}
                disabled={isLoading}
                error={!!usernameError}
                helperText={usernameError}
                onKeyDown={(e) => {
                  setUsernameError("");
                  if (e.key === "Enter") handleSubmit();
                }}
                onChange={(e) => setUsername(e.target.value)}
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
                onKeyDown={(e) => {
                  setPasswordError("");
                  if (e.key === "Enter") handleSubmit();
                }}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
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

              <ActionButton
                variant="contained"
                fullWidth
                disabled={isLoading}
                onClick={handleSubmit}
                endIcon={<LoginIcon />}
                sx={{ mb: 2 }}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </ActionButton>

              <Box display="flex" justifyContent="center">
                <SignUpButton
                  disabled={isLoading}
                  onClick={() => navigate("/cadastro")}
                >
                  Não tem uma conta?{" "}
                  <span
                    style={{
                      color: theme.palette.primary.main,
                      marginLeft: 4,
                      fontWeight: 600,
                    }}
                  >
                    Cadastre-se
                  </span>
                </SignUpButton>
              </Box>
            </StyledPaper>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};
