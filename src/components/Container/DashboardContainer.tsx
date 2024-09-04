import { Box } from "@mui/system";
import SlimCard from "components/SlimCard";

const DashboardContainer = (): JSX.Element => {
  return (
    <>
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
        <SlimCard title="Jumlah Pegawai" />
        <SlimCard title="Jumlah Absensi Hari ini" />
        <SlimCard title="Jumlah Pegawai Cuti Hari ini" />
        <SlimCard title="Cuti Belum Disetujui" />
      </Box>
    </>
  );
};

export default DashboardContainer;
