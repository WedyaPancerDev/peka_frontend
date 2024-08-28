import { Box } from "@mui/material";
import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";

const EventPage = () => {
  return (
    <PageContainer
      title="Event - Yayasan Pemberdayaan Perempuan Kepala Keluarga PEKKA"
      description="#"
    >
      <BannerTag type="event" />
      <Box></Box>
    </PageContainer>
  );
};

export default EventPage;
