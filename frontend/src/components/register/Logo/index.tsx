import log from "/public/logo.png";

import { LogoContainer } from "./styles";

export function Logo() {
  return (
    <LogoContainer>
      <img src={log} alt="Logo" />
    </LogoContainer>
  );
}
