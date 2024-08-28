import { lazy } from "react";
import BannerTag from "components/BannerTag/index.tsx";
import PageContainer from "components/Container/PageContainer.tsx";

const ModulPembelajaranModule = lazy(
  () => import("./module/ModulPembelajaranModule.tsx")
);

const ModulePage = (): JSX.Element => {
  return (
    <PageContainer
      title="Diskusi - Yayasan Pemberdayaan Perempuan Kepala Keluarga PEKKA"
      description="#"
    >
      <BannerTag type="module" />
      <ModulPembelajaranModule />
    </PageContainer>
  );
};

export default ModulePage;
