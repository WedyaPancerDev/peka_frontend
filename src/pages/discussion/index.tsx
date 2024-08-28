import { Box } from "@mui/material";
import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";

const DiscussionPage = () => {
  return (
    <PageContainer
      title="Diskusi - Yayasan Pemberdayaan Perempuan Kepala Keluarga PEKKA"
      description="#"
    >
      <BannerTag type="discussion" />
      <Box></Box>
    </PageContainer>
  );
};

export default DiscussionPage;
