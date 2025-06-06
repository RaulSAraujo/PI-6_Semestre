import logo from "/public/logo.png";

import { LogoContainer } from "./styles";

export function Logo() {
  return (
    <LogoContainer>
      <img src={logo} alt="Logo" />
    </LogoContainer>
  );
}
