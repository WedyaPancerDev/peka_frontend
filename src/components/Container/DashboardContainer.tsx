import { Box } from "@mui/material";

import SlimCard from "components/SlimCard";

const DashboardContainer = (): JSX.Element => {
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
        value={6}
        isLoading={false}
      />
      <SlimCard
        type="module"
        title="Jumlah module"
        value={3}
        isLoading={false}
      />
      <SlimCard type="event" title="Jumlah event" value={2} isLoading={false} />
    </Box>
  );
};

export default DashboardContainer;
