import { Typography } from "@mui/material";

import { EmptyBox } from "./styles";

type Props = {
  titleEmpty: string;
  subtitleEmpty: string;
  iconEmpty?: React.ReactElement;
};

export function EmptyState({ titleEmpty, subtitleEmpty, iconEmpty }: Props) {
  return (
    <EmptyBox>
      {iconEmpty}
      <Typography variant="subtitle1" gutterBottom>
        {titleEmpty}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {subtitleEmpty}
      </Typography>
    </EmptyBox>
  );
}
