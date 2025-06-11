import {
  TextField,
  Button,
  Select,
  FormControl,
  IconButton,
  alpha,
  styled,
  Card,
  CardHeader,
  Chip,
} from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  overflow: "hidden",
  boxShadow:
    theme.palette.mode === "dark"
      ? `0 6px 20px ${alpha(theme.palette.common.black, 0.2)}`
      : `0 6px 20px ${alpha(theme.palette.common.black, 0.05)}`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.05)}`,
}));

export const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
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

export const StyledTextField = styled(TextField)(({ theme }) => ({
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

export const StyledSelect = styled(Select)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
  },
  "& .MuiSelect-select": {
    padding: theme.spacing(1.5, 2),
  },
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
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

export const ActionButton = styled(Button)(({ theme }) => ({
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

export const BackButton = styled(IconButton)(({ theme }) => ({
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

export const ProfileChip = styled(Chip)(({ theme, color }) => ({
  borderRadius: 8,
  fontWeight: 500,
  backgroundColor:
    color === "default"
      ? alpha(theme.palette.info.main, 0.1)
      : color === "primary"
      ? alpha(theme.palette.warning.main, 0.1)
      : alpha(theme.palette.error.main, 0.1),
  color:
    color === "default"
      ? theme.palette.info.main
      : color === "primary"
      ? theme.palette.warning.main
      : theme.palette.error.main,
  border: `1px solid ${
    color === "default"
      ? alpha(theme.palette.info.main, 0.2)
      : color === "primary"
      ? alpha(theme.palette.warning.main, 0.2)
      : alpha(theme.palette.error.main, 0.2)
  }`,
  "& .MuiChip-icon": {
    color:
      color === "default"
        ? theme.palette.info.main
        : color === "primary"
        ? theme.palette.warning.main
        : theme.palette.error.main,
  },
}));

export const TickerChip = styled(Chip)(({ theme }) => ({
  borderRadius: 8,
  fontWeight: 700,
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  color: theme.palette.primary.main,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  "& .MuiChip-icon": {
    color: theme.palette.primary.main,
  },
}));
