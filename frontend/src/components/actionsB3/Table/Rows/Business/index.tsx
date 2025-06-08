import { Business } from "@mui/icons-material";
import { alpha, Box, TableCell, Typography, useTheme } from "@mui/material";

type Props = {
  name: string;
};

export function BusinessRow({ name }: Props) {
  const theme = useTheme();

  return (
    <TableCell>
      <Box display="flex" alignItems="center">
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 2,
            color: theme.palette.primary.main,
            fontWeight: "bold",
          }}
        >
          <Business />
        </Box>

        <Typography variant="body1" fontWeight="500">
          {name}
        </Typography>
      </Box>
    </TableCell>
  );
}
