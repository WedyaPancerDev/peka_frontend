import { Box } from "@mui/material";
import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";

const Dashboard = (): JSX.Element => {
  return (
    <PageContainer
      title="Dashboard - Yayasan Pemberdayaan Perempuan Kepala Keluarga PEKKA"
      description="#"
    >
      <BannerTag type="dashboard" />
      <Box></Box>
    </PageContainer>
  );
};

export default Dashboard;
