import { Avatar, AvatarGroup, Box, Button, Chip, Tooltip } from "@mui/material";
import {
  type ColGroupDef,
  type ColDef,
  type ValueFormatterParams,
} from "ag-grid-community";
import { useMemo, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

import "react-photo-view/dist/react-photo-view.css";

import loadable from "@loadable/component";

import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";
import { UsersResponse } from "services/users";
import { formatDate } from "utils/helpers";
import FormDialog from "components/Dialog";
import PageLoader from "components/PageLoader";
import { useUsers } from "hooks/react-query/useUsers";

const TableContainer = loadable(() => import("components/TableContainer"), {
  fallback: <p>...</p>,
});

const PenggunaPage = (): JSX.Element => {
  const { data: userData, isLoading: isLoadingEvents } = useUsers();

  const [isShowImage, setIsShowImage] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<UsersResponse | null>(null);

  const handleOpenImages = (payload: UsersResponse): void => {
    setSelectedRows(payload);
    setIsShowImage((prev) => !prev);
  };

  const handleCloseImages = (): void => {
    setSelectedRows(null);
    setIsShowImage(false);
  };

  const columns: ColDef[] | ColGroupDef[] = useMemo(() => {
    return [
      {
        headerName: "No",
        width: 55,
        valueFormatter: (params: ValueFormatterParams) => {
          return `${Number(params.node?.id ?? 0) + 1}`;
        },
      },
      {
        headerName: "Nama Lengkap",
        field: "fullname",
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Email",
        field: "email",
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Nomor Telepon",
        field: "phone",
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Role",
        field: "role",
        filter: true,
      },
      {
        headerName: "Tanggal Lahir",
        field: "birth_of_date",
        filter: true,
      },
      {
        headerName: "Aksi",
        field: "action",
        cellRenderer: ({ data }: { data: any }) => {
          return (
            <Box display="flex" gap="0.5rem" marginTop="4px">
              <Button
                type="button"
                variant="contained"
                color="warning"
                size="small"
                sx={{ fontWeight: 500 }}
              >
                <span>Edit Pengguna</span>
              </Button>
            </Box>
          );
        },
      },
    ];
  }, []);

  const rows = useMemo(() => {
    if (userData?.data) {
      return userData.data.map((user) => ({
        fullname: user.fullname,
        email: user.email || '-',
        phone: user.phone,
        role: user.role?.toUpperCase(),
        birth_of_date: user?.birth_of_date
          ? formatDate(user?.birth_of_date)
          : "-",
        avatar: user.avatar ?? "",
      }));
    }

    return [];
  }, [userData?.data]);

  return (
    <PageContainer
      title="Event - Yayasan Pemberdayaan Perempuan Kepala Keluarga PEKKA"
      description="#"
    >
      <BannerTag type="pengguna" />

      <Box sx={{ marginY: "20px" }}>
        {isLoadingEvents ? (
          <PageLoader />
        ) : (
          <TableContainer
            rows={rows || []}
            columns={columns}
            pagination={true}
            paginationPageSize={10}
            rowSelection="multiple"
            suppressColumnVirtualisation={true}
            suppressRowVirtualisation={true}
            paginationPageSizeSelector={[10, 20, 30]}
          />
        )}
      </Box>

      {isShowImage && selectedRows && (
        <FormDialog
          open={isShowImage}
          maxWidth="sm"
          title="Gambar Banner Berita"
          handleClose={() => {
            handleCloseImages();
          }}
        >
          <PhotoProvider>
            <PhotoView src={selectedRows?.avatar ?? ""}>
              <img
                src={selectedRows?.avatar ?? ""}
                alt={selectedRows?.fullname ?? ""}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
              />
            </PhotoView>
          </PhotoProvider>
        </FormDialog>
      )}
    </PageContainer>
  );
};

export default PenggunaPage;
