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
import { EventResponse } from "services/events";
import { useEvents } from "hooks/react-query/useEvents";
import { formatDate } from "utils/helpers";
import FormDialog from "components/Dialog";
import PageLoader from "components/PageLoader";

const TableContainer = loadable(() => import("components/TableContainer"), {
  fallback: <p>...</p>,
});

const EventPage = (): JSX.Element => {
  const { data: eventData, isLoading: isLoadingEvents } = useEvents();

  const [isShowImage, setIsShowImage] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<EventResponse | null>(null);

  const handleOpenImages = (payload: EventResponse): void => {
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
        headerName: "Judul",
        field: "title",
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Deskripsi",
        field: "description",
        width: 180,
        filter: true,
      },
      {
        headerName: "Banner",
        field: "banner",
        filter: true,
        cellRenderer: ({ data }: { data: EventResponse }) => {
          return (
            <>
              {data.banner ? (
                <Button
                  type="button"
                  variant="text"
                  color="primary"
                  size="small"
                  onClick={() => {
                    handleOpenImages(data);
                  }}
                  sx={{ marginBottom: "4px", fontWeight: 600 }}
                >
                  Lihat Gambar
                </Button>
              ) : (
                "-"
              )}
            </>
          );
        },
      },
      {
        headerName: "Lokasi",
        field: "address",
        filter: true,
      },
      {
        headerName: "Tanggal Mulai",
        field: "start_date",
        filter: true,
      },
      {
        headerName: "Tanggal Selesai",
        field: "end_date",
        filter: true,
      },
      {
        headerName: "Undangan",
        field: "invite_only",
        cellRenderer: ({ data }: { data: EventResponse }) => {
          return (
            <>
              {data.invite_only ? (
                <Chip
                  label="Undangan"
                  size="small"
                  color="primary"
                  variant="filled"
                  sx={{ textTransform: "uppercase", mb: "6px" }}
                />
              ) : (
                <Chip
                  label="Publik"
                  size="small"
                  color="success"
                  variant="filled"
                  sx={{ textTransform: "uppercase", mb: "6px" }}
                />
              )}
            </>
          );
        },
      },
      {
        headerName: "Status",
        field: "status",
        width: 150,
        filter: true,
        cellRenderer: ({ data }: { data: EventResponse }) => {
          const customChip: Record<string, JSX.Element> = {
            active: (
              <Chip
                label={data.status}
                size="small"
                color="success"
                variant="filled"
                sx={{ textTransform: "uppercase" }}
              />
            ),
            inactive: (
              <Chip
                label={data.status}
                size="small"
                color="error"
                variant="filled"
                sx={{ textTransform: "uppercase" }}
              />
            ),
          };

          return <Box>{customChip[data.status]}</Box>;
        },
      },
      {
        headerName: "Yang Diundang",
        field: "event_invites",
        width: 180,
        filter: true,
        cellRenderer: ({ data }: { data: EventResponse }) => {
          return (
            <Box display="flex" justifyContent="flex-start" py="2px">
              <AvatarGroup max={5}>
                {data.event_invites.map((invite) => (
                  <Tooltip
                    key={invite.email}
                    title={invite.fullname}
                    sx={{ cursor: "pointer" }}
                  >
                    <Avatar alt={invite.fullname} src={invite.avatar} />
                  </Tooltip>
                ))}
              </AvatarGroup>
            </Box>
          );
        },
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
                <span>Edit Event</span>
              </Button>
            </Box>
          );
        },
      },
    ];
  }, []);

  const rows = useMemo(() => {
    if (eventData?.data) {
      return eventData.data.map((event) => ({
        title: event.title,
        description: event.description,
        location: event.location,
        address: event.address,
        start_date: formatDate(event.start_date),
        end_date: formatDate(event.end_date),
        invite_only: event.invite_only,
        banner: event.banner,
        created_by: event.created_by,
        status: event.status,
        event_invites: event.event_invites,
      }));
    }

    return [];
  }, [eventData?.data]);

  return (
    <PageContainer
      title="Event - Yayasan Pemberdayaan Perempuan Kepala Keluarga PEKKA"
      description="#"
    >
      <BannerTag type="event" />

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
            <PhotoView src={selectedRows?.banner ?? ""}>
              <img
                src={selectedRows?.banner ?? ""}
                alt={selectedRows?.title}
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

export default EventPage;
