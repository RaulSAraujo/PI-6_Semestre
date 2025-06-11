import { Box, styled, alpha } from "@mui/material";

import tenor from "../../../public/vecteezy.gif";

export const PageContainer = styled(Box)(({ theme }) => ({
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
}));
