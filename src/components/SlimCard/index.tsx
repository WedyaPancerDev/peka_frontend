import { Box, Skeleton, Typography } from "@mui/material";
import { IconReportAnalytics } from "@tabler/icons-react";
import { IconReport, IconUser } from "@tabler/icons-react";

interface SlimCardProps {
  title: string;
  value: number;
  isLoading: boolean;
  style?: React.CSSProperties;
  type: "pengguna" | "module" | "event" | "news";
}

const SlimCard = ({
  title = "",
  value = 0,
  style,
  type = "pengguna",
  isLoading = false,
}: SlimCardProps): JSX.Element => {
  const icon: Record<string, JSX.Element> = {
    pengguna: <IconUser size={24} />,
    module: <IconReport size={24} />,
    event: <IconReportAnalytics size={24} />,
    news: <IconReport size={24} />,
  };

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

        {icon[type]}
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {isLoading ? (
          <Skeleton
            width={44}
            height={44}
            variant="rounded"
            sx={{ marginTop: "4px" }}
          />
        ) : (
          <Typography
            marginTop="4px"
            variant="h1"
            fontSize="38px"
            fontWeight={800}
            letterSpacing={-1}
          >
            {value}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SlimCard;
