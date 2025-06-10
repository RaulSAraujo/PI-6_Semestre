import { Item } from "@models/profiles";

import { Skeleton, TableCell } from "@mui/material";

import { Business, Person, PersonOutline } from "@mui/icons-material";

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
