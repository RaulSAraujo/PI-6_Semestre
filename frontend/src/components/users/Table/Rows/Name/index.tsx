import { alpha, Box, TableCell, useTheme } from "@mui/material";

type Props = {
  name: string;
};

export function NameRow({ name }: Props) {
  const theme = useTheme();

  return (
    <TableCell component="th" scope="row">
      <Box display="flex" alignItems="center">
        <Box
          sx={{
            mr: 2,
            width: 36,
            height: 36,
            display: "flex",
            fontWeight: "bold",
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
            color: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
          }}
        >
          {name.charAt(0).toUpperCase()}
        </Box>

        {name}
      </Box>
    </TableCell>
  );
}
