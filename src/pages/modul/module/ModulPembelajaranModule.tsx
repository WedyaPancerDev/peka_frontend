import moment from "moment";
import { Fragment } from "react";
import {
  IconBrandYoutube,
  IconEyeSearch,
  IconNote,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import {
  Box,
  Button,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SkeletonLoader from "components/Loader/SkeletonLoader";
import { useAllModule } from "hooks/react-query/useModule";

import "./index.css";
import { useNavigate } from "react-router-dom";

const ModulPembelajaranModule = () => {
  const navigate = useNavigate();

  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const { data: dataModules, isLoading: isLoadingModule } = useAllModule();

  const RenderSkeleton = () => (
    <Fragment>
      {Array(4)
        .fill(4)
        .map((_, index) => {
          return <SkeletonLoader key={index} />;
        })}
    </Fragment>
  );

  return (
    <Box component="section" sx={{ marginTop: "20px", marginBottom: "40px" }}>
      <Box
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Box component="div" className="right-content">
          <Button
            type="button"
            onClick={() => navigate("/modul-materi/create")}
            variant="contained"
            color="primary"
          >
            Tambah Modul Pembelajaran
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          gap: "12px",
          display: "grid",
          gridTemplateColumns: mdUp ? "repeat(2, 1fr)" : "repeat(1, 1fr)",
          marginTop: "20px",
        }}
      >
        {isLoadingModule ? (
          <RenderSkeleton />
        ) : dataModules ? (
          dataModules?.data.map((modul) => {
            const formattedDate = moment(modul.created_at).format(
              "DD MMMM YYYY"
            );

            return (
              <Box
                key={modul.module_code}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "18px",
                  backgroundColor: "#FFF",
                  border: "1px solid #e4e4e7",
                  padding: "14px",
                  borderRadius: "10px",
                  position: "relative",
                  transition: "all 0.3s",
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: "0 5px 15px 0 rgba(0,0,0,.08)",
                  },
                }}
              >
                <Box
                  component="div"
                  className="card-body"
                  display="flex"
                  flexDirection="column"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="body2" marginBottom="10px">
                      {modul?.module_code}
                    </Typography>

                    <Typography variant="body2" marginBottom="10px">
                      {formattedDate}
                    </Typography>
                  </Box>

                  {modul?.banner ? (
                    <LazyLoadImage
                      effect="blur"
                      src={modul.banner}
                      alt={modul.title}
                      style={{
                        width: "100%",
                        aspectRatio: "7/2",
                        objectFit: "cover",
                        borderRadius: "10px",
                        marginBottom: "10px",
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        backgroundColor: "#f1f5f9",
                        marginBottom: "10px",
                        aspectRatio: "7/2",
                      }}
                    />
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                      maxWidth: "fit-content",
                    }}
                  >
                    <IconNote
                      color="#4b5563"
                      size={22}
                      style={{
                        marginRight: 6,
                        alignSelf: "self-start",
                        flexShrink: 0,
                      }}
                    />

                    <Typography
                      component="h5"
                      className="line-clamp-1"
                      variant="h5"
                      sx={{
                        color: "#1f2937",
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {modul.title}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body1"
                    component="p"
                    className="line-clamp-4"
                    sx={{ color: "#6b7280", fontSize: "16px" }}
                  >
                    {modul.description ?? "-"}
                  </Typography>
                </Box>

                <Box
                  component="div"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  gap="8px"
                >
                  {mdUp && (
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        backgroundColor: "#fdba74",
                        p: 1,
                        borderRadius: 1,
                      }}
                    >
                      {modul.users?.fullname ?? "-"}
                    </Typography>
                  )}

                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ gap: "8px", flexWrap: lgUp ? "nowrap" : "wrap" }}
                  >
                    <Button
                      type="button"
                      variant="text"
                      size="small"
                      color="inherit"
                    >
                      <Tooltip title="Pergi ke YouTube">
                        <IconBrandYoutube />
                      </Tooltip>
                    </Button>

                    <Button
                      type="button"
                      size="small"
                      variant="text"
                      color="inherit"
                    >
                      <Tooltip title="Lihat Detail Modul">
                        <IconEyeSearch />
                      </Tooltip>
                    </Button>

                    <Button
                      type="button"
                      size="small"
                      variant="text"
                      color="warning"
                    >
                      <Tooltip title="Ubah Modul">
                        <IconPencil />
                      </Tooltip>
                    </Button>

                    <Button
                      type="button"
                      size="small"
                      variant="text"
                      color="error"
                    >
                      <IconTrash />
                    </Button>

                    {!mdUp && (
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          backgroundColor: "#fdba74",
                          p: 1,
                          borderRadius: 1,
                        }}
                      >
                        {modul.users?.fullname ?? "-"}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            );
          })
        ) : (
          <Box
            sx={{
              width: "100%",
              display: "grid",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              Tidak ada data
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ModulPembelajaranModule;
