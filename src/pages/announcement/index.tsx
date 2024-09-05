import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  type Theme,
} from "@mui/material";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";
import { useForm, Controller } from "react-hook-form";
import { IconPlus, IconSearch } from "@tabler/icons-react";

import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { useMemo } from "react";

const AnnouncementPage = (): JSX.Element => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const { control } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const renderHeader = (): JSX.Element => {
    return (
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          // LinkComponent={}
          href="/"
          variant="contained"
          size="large"
          sx={{ fontWeight: 600, display: "inline-flex", alignItems: "center" }}
        >
          <IconPlus size={20} style={{ marginRight: "2px" }} />
          <span>Tambah Data Berita dan Pengunguman</span>
        </Button>
        <Controller
          name="search"
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                type="text"
                sx={{ marginTop: lgUp ? 0 : 1 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size={20} />
                    </InputAdornment>
                  ),
                }}
                placeholder="Cari data pengguna..."
              />
            );
          }}
        />
      </Box>
    );
  };

  const header = renderHeader();

  const HeaderGroup = useMemo(() => {
    return (
      <ColumnGroup>
        <Row style={{ fontFamily: "Plus Jakarta Sans" }}>
          <Column
            header="NO"
            field="no"
            alignHeader={"center"}
            style={{ fontSize: 12 }}
          />
          <Column
            header="NAMA BERITA"
            sortable
            field="title"
            alignHeader={"center"}
            style={{ fontSize: 12 }}
          />
          <Column
            header="DESKRIPSI"
            sortable
            field="description"
            alignHeader={"center"}
            style={{ fontSize: 12 }}
          />
          <Column
            header="STATUS"
            sortable
            field="status"
            alignHeader={"center"}
            style={{ fontSize: 12 }}
          />
          <Column
            header="AKSI"
            field="action"
            alignHeader={"center"}
            style={{ fontSize: 12, width: "30%" }}
          />
        </Row>
      </ColumnGroup>
    );
  }, []);

  return (
    <PageContainer
      title="Berita & Pengumuman - Yayasan Pemberdayaan Perempuan Kepala Keluarga PEKKA"
      description="#"
    >
      <BannerTag type="announcement" />
      <Box marginTop="30px">
        <DataTable
          alwaysShowPaginator
          size="small"
          groupRowsBy="id"
          sortMode="single"
          scrollable
          value={[]}
          scrollHeight="auto"
          headerColumnGroup={HeaderGroup}
          showGridlines
          stripedRows
          tableStyle={{ minWidth: "50rem" }}
          paginator
          rows={10}
          header={header}
          rowsPerPageOptions={[5, 10, 20, 30]}
          style={{
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
            fontFamily: "Plus Jakarta Sans, sans-serif !important",
            fontSize: 14,
          }}
        >
          <Column
            field="no"
            header="NO"
            bodyStyle={{
              textAlign: "center",
              padding: "8px 0",
              width: "5%",
            }}
            body={(_, { rowIndex }) => {
              return (
                <div className="table-content">
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {rowIndex + 1}
                  </Typography>
                </div>
              );
            }}
          ></Column>
          <Column
            field="title"
            header="NAMA BERITA"
            bodyStyle={{
              textAlign: "center",
              padding: "8px 0",
            }}
            body={() => {
              return (
                <Box className="table-content">
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      maxWidth: "160px",
                      margin: "0 auto",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  ></Typography>
                </Box>
              );
            }}
          ></Column>
          <Column
            field="description"
            header="DESKRIPSI"
            bodyStyle={{
              textAlign: "center",
              padding: "8px 0",
            }}
            body={() => {
              return (
                <Box className="table-content">
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      maxWidth: "160px",
                      margin: "0 auto",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      textTransform: "capitalize",
                    }}
                  ></Typography>
                </Box>
              );
            }}
          ></Column>
          <Column
            field="status"
            header="STATUS"
            bodyStyle={{
              textAlign: "center",
              padding: "8px 0",
            }}
            body={() => {
              return (
                <Box className="table-content">
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      maxWidth: "160px",
                      margin: "0 auto",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      textTransform: "capitalize",
                    }}
                  ></Typography>
                </Box>
              );
            }}
          ></Column>
          <Column
            field="action"
            header="AKSI"
            bodyStyle={{
              textAlign: "center",
              padding: "8px 0",
            }}
            body={() => {
              return (
                <Box display="flex" alignItems="center" px="10px" gap="10px">
                  <Button
                    fullWidth
                    size="small"
                    type="button"
                    color="warning"
                    // onClick={() => {
                    //   router.push(`/manajemen-pegawai/edit/${rowData.uuid}`);
                    // }}
                    variant="contained"
                    sx={{ fontWeight: 700, fontSize: "12px" }}
                  >
                    Ubah
                  </Button>
                  <Button
                    fullWidth
                    size="small"
                    type="button"
                    color="error"
                    sx={{ fontWeight: 700, fontSize: "12px" }}
                    variant="contained"
                    // onClick={() => {
                    //   handleOpenDeletePopup(rowData.uuid);
                    // }}
                  >
                    Non-Aktifkan
                  </Button>
                </Box>
              );
            }}
          ></Column>
        </DataTable>
      </Box>
    </PageContainer>
  );
};

export default AnnouncementPage;
