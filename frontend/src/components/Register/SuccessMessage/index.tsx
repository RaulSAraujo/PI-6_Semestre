import { Alert, Snackbar } from "@mui/material";

type Props = {
  successMessage: string;
  setSuccessMessage: (message: string) => void;
};

export function SuccessMessage({ successMessage, setSuccessMessage }: Props) {
  return (
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
          width: "100%",
        }}
      >
        {successMessage}
      </Alert>
    </Snackbar>
  );
}
