import { Box } from "@mui/material";
import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";

const AnnouncementPage = () => {
  return (
    <PageContainer
      title="Berita & Pengumuman - Yayasan Pemberdayaan Perempuan Kepala Keluarga PEKKA"
      description="#"
    >
      <BannerTag type="announcement" />
      <Box></Box>
    </PageContainer>
  );
};

export default AnnouncementPage;
