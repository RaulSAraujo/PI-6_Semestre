import { Item } from "@models/profiles";

import { Skeleton, TableCell } from "@mui/material";

import {
  AccountBalance,
  TrendingDown,
  TrendingFlat,
  TrendingUp,
} from "@mui/icons-material";

import { ProfileChip } from "./styles";

type Props = {
  profiles: Item[];
  isLoading: boolean;
  idProfile: number;
};

export function ProfileRow({ idProfile, profiles, isLoading }: Props) {
  const getProfileLabel = (id: number) => {
    const profile = profiles.find((p) => p.id === id);

    return profile?.description || "";
  };

  const getProfileIcon = (id: number) => {
    switch (id) {
      case 1:
        return <TrendingFlat />;
      case 2:
        return <AccountBalance />;
      case 3:
        return <TrendingUp />;
      case 4:
        return <TrendingDown />;
      default:
        return <AccountBalance />;
    }
  };

  const getProfileColor = (id: number) => {
    switch (id) {
      case 1:
        return "primary";
      case 2:
        return "secondary";
      case 3:
        return "error";
      case 4:
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <TableCell>
      {isLoading ? (
        <Skeleton width={100} />
      ) : (
        <ProfileChip
          size="small"
          icon={getProfileIcon(idProfile)}
          label={getProfileLabel(idProfile)}
          color={getProfileColor(idProfile)}
        />
      )}
    </TableCell>
  );
}
