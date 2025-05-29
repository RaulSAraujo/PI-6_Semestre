import React from "react";
import { LogoContainer } from "./StyledComponents";
import logo from "/public/logo.png";

const LogoSection: React.FC = () => {
  return (
    <LogoContainer>
      <img src={logo} alt="Logo" />
    </LogoContainer>
  );
};

export default LogoSection;
