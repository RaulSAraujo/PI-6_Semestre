import { Box, TableCell, Typography } from "@mui/material";
import {
  AccountBalance,
  TrendingDown,
  TrendingFlat,
  TrendingUp,
} from "@mui/icons-material";

import { ProfileIcon } from "./styles";

type Props = {
  id: number;
  description: string;
};

export function ProfileRow({ id, description }: Props) {
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

  return (
    <TableCell>
      <Box display="flex" alignItems="center">
        <ProfileIcon>{getProfileIcon(description)}</ProfileIcon>

        <Box>
          <Typography variant="body1" fontWeight="500">
            {description}
          </Typography>

          <Typography variant="caption" color="textSecondary">
            ID: {id}
          </Typography>
        </Box>
      </Box>
    </TableCell>
  );
}
