import { TableCell } from "@mui/material";
import {
  AccountBalance,
  TrendingDown,
  TrendingFlat,
  TrendingUp,
} from "@mui/icons-material";

import { ProfileChip } from "./styles";

type Props = {
  type: string;
  description: string;
};

export function TypeRow({ type, description }: Props) {
  const getProfileIcon = (description: string) => {
    if (description?.includes("conservador")) {
      return <TrendingDown />;
    } else if (description?.includes("moderado")) {
      return <TrendingFlat />;
    } else if (description?.includes("agressivo")) {
      return <TrendingUp />;
    }

    return <AccountBalance />;
  };

  const getProfileColor = (description: string) => {
    if (description?.includes("conservador")) {
      return "primary";
    } else if (description?.includes("moderado")) {
      return "default";
    } else if (description?.includes("agressivo")) {
      return "error";
    }

    return "primary";
  };

  return (
    <TableCell>
      <ProfileChip
        size="small"
        label={type}
        color={getProfileColor(description)}
        icon={getProfileIcon(description)}
      />
    </TableCell>
  );
}
