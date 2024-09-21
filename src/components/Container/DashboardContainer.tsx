import { Box } from "@mui/material";

import SlimCard from "components/SlimCard";
import { useUserDashboard } from "hooks/react-query/useUsers";

const DashboardContainer = (): JSX.Element => {
  const { data: dashboardData, isLoading } = useUserDashboard();
  const dashboard = dashboardData?.data;

  return (
    <Box
      sx={{
        marginTop: 4,
        display: "grid",
        gridTemplateColumns: "repeat(1,1fr)",
        "@media (min-width: 768px)": {
          gridTemplateColumns: "repeat(2,1fr)",
        },
        "@media (min-width: 992px)": {
          gridTemplateColumns: "repeat(3,1fr)",
        },
        gap: "16px",
      }}
    >
      <SlimCard
        type="pengguna"
        title="Jumlah Pengguna"
        value={dashboard?.users || 0}
        isLoading={isLoading}
      />

      <SlimCard
        type="module"
        title="Jumlah Modul"
        value={dashboard?.module || 0}
        isLoading={isLoading}
      />

      <SlimCard
        type="event"
        title="Jumlah Event"
        value={dashboard?.events || 0}
        isLoading={isLoading}
      />

      <SlimCard
        type="news"
        title="Jumlah Berita"
        value={dashboard?.news || 0}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default DashboardContainer;
