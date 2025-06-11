import { useNavigate } from "react-router-dom";

import { Tooltip } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import { Button } from "./styles";

export function BackButton() {
  const navigate = useNavigate();

  return (
    <Tooltip title="Voltar para a lista">
      <Button onClick={() => navigate("/carteira")}>
        <ArrowBack />
      </Button>
    </Tooltip>
  );
}
