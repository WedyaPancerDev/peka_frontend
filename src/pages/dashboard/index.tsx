import BannerTag from "components/BannerTag";
import DashboardContainer from "components/Container/DashboardContainer";
import PageContainer from "components/Container/PageContainer";

const Dashboard = (): JSX.Element => {
  return (
    <PageContainer
      title="Dashboard - Yayasan Pemberdayaan Perempuan Kepala Keluarga PEKKA"
      description="#"
    >
      <BannerTag type="dashboard" />
      <DashboardContainer />
    </PageContainer>
  );
};

export default Dashboard;
