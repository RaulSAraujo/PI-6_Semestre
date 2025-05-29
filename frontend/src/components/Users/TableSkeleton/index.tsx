import { Box, LinearProgress, Skeleton, alpha, useTheme } from "@mui/material";

export const UserTableSkeleton: React.FC = () => {
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
          <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
          <Box width="100%">
            <Skeleton variant="text" width="40%" height={24} />
            <Skeleton variant="text" width="60%" height={20} />
          </Box>
        </Box>
      ))}
    </Box>
  );
};
