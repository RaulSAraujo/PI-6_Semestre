import { Business } from "@mui/icons-material";
import { alpha, Box, Skeleton, TableCell, Typography, useTheme } from "@mui/material";
import { Item as ItemShares } from "@models/listed-shares";

type Props = {
  loading: boolean;
  idListedShares: number;
  listShares: ItemShares[];
};

export function BusinessRow({ idListedShares, listShares, loading }: Props) {
  const theme = useTheme();

  const getLabel = (id: number) => {
    const share = listShares.find((p) => p.id === id);

    return share?.name || "";
  };

  return (
    <TableCell>
      {loading ? (
        <Skeleton width={100} />
      ) : (
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
            {getLabel(idListedShares)}
          </Typography>
        </Box>
      )}
    </TableCell>
  );
}
