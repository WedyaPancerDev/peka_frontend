import { Box, Skeleton } from "@mui/material";

const SkeletonLoader = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#f1f5f9",
        padding: "10px",
        borderRadius: "12px",
        ...style,
      }}
    >
      <Skeleton
        variant="rectangular"
        sx={{ borderRadius: "8px", height: "25px", maxWidth: "80%" }}
      />

      <Box sx={{ marginTop: "8px" }}>
        <Skeleton
          variant="rectangular"
          sx={{ borderRadius: "8px", height: "40px", marginBottom: "8px" }}
        />

        <Skeleton
          variant="rectangular"
          sx={{
            borderRadius: "8px",
            height: "20px",
            maxWidth: "60%",
          }}
        />
      </Box>
    </Box>
  );
};

export default SkeletonLoader;
