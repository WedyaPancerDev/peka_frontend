import { Avatar, Box, Button } from "@mui/material";
import {
  type ColGroupDef,
  type ColDef,
  type ValueFormatterParams,
} from "ag-grid-community";
import { useMemo } from "react";

import loadable from "@loadable/component";

import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";
import { formatDate, remove62Number } from "utils/helpers";
import PageLoader from "components/PageLoader";
import { useUsers } from "hooks/react-query/useUsers";
import { useNavigate } from "react-router-dom";
import { UsersResponse } from "services/users";

const TableContainer = loadable(() => import("components/TableContainer"), {
  fallback: <p>...</p>,
});

const PenggunaPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { data: userData, isLoading: isLoadingEvents } = useUsers();

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
        headerName: "Profil",
        field: "avatar",
        width: 100,
        cellRenderer: ({ data }: { data: UsersResponse }) => {
          return (
            <Box display="flex" justifyContent="center">
              {data.avatar ? (
                <Avatar src={data.avatar} alt={data.fullname} />
              ) : (
                "-"
              )}
            </Box>
          );
        },
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
        cellRenderer: ({ data }: { data: UsersResponse }) => {
          console.log({ data })
          return (
            <Box display="flex" gap="0.5rem" marginTop="4px">
              <Button
                type="button"
                variant="contained"
                color="warning"
                size="small"
                sx={{ fontWeight: 500 }}
                onClick={() => {
                  navigate(`/manajemen-pengguna/${data.id}/edit`);
                }}
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
        id: user.id,
        fullname: user.fullname,
        email: user.email || "-",
        phone: user?.phone ? remove62Number(user?.phone) : "-",
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
      title="Pengguna - Yayasan Pemberdayaan Perempuan Kepala Keluarga PEKKA"
      description="#"
    >
      <BannerTag type="pengguna" />

      <Box component="div" className="right-content" sx={{ marginTop: "20px" }}>
        <Button
          type="button"
          onClick={() => {
            navigate("/manajemen-pengguna/create");
          }}
          variant="contained"
          color="primary"
        >
          Tambah Pengguna
        </Button>
      </Box>
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
    </PageContainer>
  );
};

export default PenggunaPage;
