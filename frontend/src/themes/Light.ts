import { createTheme } from "@mui/material";
import { amber, orange, yellow } from "@mui/material/colors";

export const LightTheme = createTheme({
  palette: {
    mode: "light",
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
      default: "#F9FAFC", // Branco levemente azulado
      paper: "#FFFFFF",
    },
    error: {
      main: "#F44336",
    },
    warning: {
      main: "#FFA000",
    },
    info: {
      main: "#2196F3",
    },
    success: {
      main: "#4CAF50",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
      color: "#212121",
    },
    h2: {
      fontWeight: 700,
      color: "#212121",
    },
    h3: {
      fontWeight: 600,
      color: "#212121",
    },
    h4: {
      fontWeight: 600,
      color: "#212121",
    },
    h5: {
      fontWeight: 600,
      color: "#212121",
    },
    h6: {
      fontWeight: 600,
      color: "#212121",
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
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(90deg, #F5A623 0%, #FF7B00 100%)",
        },
      },
    },
  },
});
