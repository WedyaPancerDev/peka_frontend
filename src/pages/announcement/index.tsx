import { Box, Button, Chip } from "@mui/material";
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
import { NewsResponse } from "services/news";
import { useNews } from "hooks/react-query/useNews";
import { formatDate } from "utils/helpers";
import FormDialog from "components/Dialog";
import PageLoader from "components/PageLoader";

const TableContainer = loadable(() => import("components/TableContainer"), {
  fallback: <p>...</p>,
});

const AnnouncementPage = (): JSX.Element => {
  const { data: newsData, isLoading: isLoadingNews } = useNews();

  const [isShowImage, setIsShowImage] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<NewsResponse | null>(null);

  const handleOpenImages = (payload: NewsResponse): void => {
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
        cellRenderer: ({ data }: { data: NewsResponse }) => {
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
        headerName: "Hastag",
        field: "hastag",
        filter: true,
        width: 300,
        cellRenderer: ({ data }: { data: NewsResponse }) => {
          return (
            <Box flexWrap="wrap">
              {data.hastag.map((hastag, index) => (
                <Chip
                  key={index}
                  label={hastag}
                  size="small"
                  color="success"
                  variant="filled"
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    marginRight: "4px",
                  }}
                />
              ))}
            </Box>
          );
        },
      },
      {
        headerName: "Tanggal Publish",
        field: "published_at",
        filter: true,
      },
      {
        headerName: "Referensi",
        field: "url_news",
        filter: true,
        cellRenderer: ({ data }: { data: NewsResponse }) => {
          return (
            <>
              <a
                href={data.url_news}
                target="_blank"
                rel="noreferrer noopenner"
              >
                Lihat Berita
              </a>
            </>
          );
        },
      },
      {
        headerName: "Penulis",
        field: "users_author",
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Editor",
        field: "users_editor",
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Status",
        field: "status",
        width: 150,
        filter: true,
        cellRenderer: ({ data }: { data: NewsResponse }) => {
          const customChip: Record<string, JSX.Element> = {
            published: (
              <Chip
                label={data.status}
                size="small"
                color="success"
                variant="filled"
                sx={{ textTransform: "uppercase" }}
              />
            ),
            draft: (
              <Chip
                label={data.status}
                size="small"
                color="primary"
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
          return <>{customChip[data.status]}</>;
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
                <span>Edit Berita</span>
              </Button>
            </Box>
          );
        },
      },
    ];
  }, []);

  const rows = useMemo(() => {
    if (newsData?.data) {
      return newsData.data.map((news) => ({
        title: news.title,
        description: news.description,
        banner: news.banner,
        hastag: news.hastag,
        published_at: formatDate(news.published_at),
        url_news: news.url_news,
        users_author: news.users_author.fullname,
        users_editor: news.users_editor.fullname,
        status: news.status,
      }));
    }

    return [];
  }, [newsData?.data]);

  return (
    <PageContainer
      title="Berita & Pengumuman - Yayasan Pemberdayaan Perempuan Kepala Keluarga PEKKA"
      description="#"
    >
      <BannerTag type="announcement" />
      <Box sx={{ marginY: "20px" }}>
        {isLoadingNews ? (
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

export default AnnouncementPage;
