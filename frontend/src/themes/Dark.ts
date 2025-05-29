import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#F5A623", // Dourado ensolarado
      dark: "#E09600",
      light: "#FFB94E",
      contrastText: "#1A1A1A",
    },
    secondary: {
      main: "#FF7B00", // Laranja vibrante
      dark: "#E56E00",
      light: "#FF9A3F",
      contrastText: "#1A1A1A",
    },
    background: {
      default: "#1F2128", // Cinza escuro com tom azulado
      paper: "#282C34", // Um pouco mais claro que o default
    },
    error: {
      main: "#FF5252",
    },
    warning: {
      main: "#FFD740",
    },
    info: {
      main: "#64B5F6",
    },
    success: {
      main: "#66BB6A",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
    allVariants: {
      color: "#ffffff",
    },
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
        },
      },
    },
  },
});
