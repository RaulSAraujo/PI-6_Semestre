import { useNavigate } from "react-router-dom";

import { ArrowBack } from "@mui/icons-material";

import { BackButtonStyled } from "./styles";

export function BackButton() {
  const navigate = useNavigate();

  return (
    <BackButtonStyled startIcon={<ArrowBack />} onClick={() => navigate("/")}>
      Voltar
    </BackButtonStyled>
  );
}
