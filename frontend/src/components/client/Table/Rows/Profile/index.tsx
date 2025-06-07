import { TableCell } from "@mui/material";
import { Business, Person, PersonOutline } from "@mui/icons-material";

import { ProfileChip } from "./styles";

type Props = {
  idProfile: number;
};

export function ProfileRow({ idProfile }: Props) {
  const getProfileLabel = (id: number) => {
    switch (id) {
      case 1:
        return "Administrador";
      case 2:
        return "Gerente";
      case 3:
        return "Usuário";
      default:
        return "Desconhecido";
    }
  };

  const getProfileIcon = (id: number) => {
    switch (id) {
      case 1:
        return <Person />;
      case 2:
        return <Business />;
      case 3:
        return <PersonOutline />;
      default:
        return <PersonOutline />;
    }
  };

  const getProfileColor = (id: number) => {
    switch (id) {
      case 1:
        return "primary";
      case 2:
        return "secondary";
      case 3:
        return "default";
      default:
        return "default";
    }
  };

  return (
    <TableCell>
      <ProfileChip
        size="small"
        icon={getProfileIcon(idProfile)}
        label={getProfileLabel(idProfile)}
        color={getProfileColor(idProfile)}
      />
    </TableCell>
  );
}
