import { Box, Typography } from "@mui/material";

interface SlimCardProps {
  title: string;
  style?: React.CSSProperties;
}

const SlimCard = ({ title = "", style }: SlimCardProps): JSX.Element => {
  return (
    <Box
      sx={{
        cursor: "pointer",
        backgroundColor: "#FFF",
        border: "2px solid #f3f4f6",
        padding: "12px",
        transition: "all 0.3s",
        "&:hover": {
          borderColor: "#e5e7eb",
        },
        ...style,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="body1"
          color="inherit"
          sx={{ color: "#6b7280" }}
          fontSize="16px"
          fontWeight={500}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default SlimCard;
