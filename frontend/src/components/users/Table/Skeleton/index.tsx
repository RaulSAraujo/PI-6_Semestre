import {
  Box,
  LinearProgress,
  Skeleton as SK,
  alpha,
  useTheme,
} from "@mui/material";

export function Skeleton() {
  const theme = useTheme();

  return (
    <Box sx={{ p: 2 }}>
      <LinearProgress
        variant="indeterminate"
        sx={{
          height: 6,
          borderRadius: 3,
          mb: 2,
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
        }}
      />

      {[1, 2, 3, 4].map((item) => (
        <Box key={item} sx={{ display: "flex", mb: 2 }}>
          <SK variant="circular" width={40} height={40} sx={{ mr: 2 }} />

          <Box width="100%">
            <SK variant="text" width="40%" height={24} />

            <SK variant="text" width="60%" height={20} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
