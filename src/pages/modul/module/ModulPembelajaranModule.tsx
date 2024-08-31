import { Fragment } from "react";
import moment from "moment";
import { IconNote } from "@tabler/icons-react";

import { Box, Button, Theme, Typography, useMediaQuery } from "@mui/material";
import SkeletonLoader from "components/Loader/SkeletonLoader";
import { useAllModule } from "hooks/react-query/useModule";

import "./index.css";

const ModulPembelajaranModule = () => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  const {
    data: dataModules,
    isLoading: isLoadingModule,
    isError,
  } = useAllModule();

  const RenderSkeleton = ({ isLarge }: { isLarge: boolean }) => (
    <Fragment>
      {Array(3)
        .fill(3)
        .map((_, index, array) => {
          const lastAndFirst = index === 0 || index === array.length - 1;

          return (
            <SkeletonLoader
              key={index}
              style={{
                gridColumn:
                  lastAndFirst && isLarge
                    ? "span 2 / span 2"
                    : "span 1 / span 1",
              }}
            />
          );
        })}
    </Fragment>
  );

  return (
    <Box component="section" sx={{ marginY: "20px" }}>
      <Box
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box component="div" className="left-content">
          <Typography variant="h6" sx={{ color: "#111" }}>
            <b>Last Updated:</b>{" "}
            <span style={{ fontWeight: 500, color: "#6b7280" }}>
              2021-10-10 10:00
            </span>
          </Typography>
        </Box>
        <Box component="div" className="right-content">
          <Button type="button" variant="contained" color="primary">
            Tambah Modul Pembelajaran
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          gap: "12px",
          display: "grid",
          gridTemplateColumns:
            lgUp && dataModules?.data ? "repeat(3, 1fr)" : "repeat(1, 1fr)",
          marginTop: "20px",
        }}
      >
        {isLoadingModule ? (
          <RenderSkeleton isLarge={lgUp} />
        ) : dataModules ? (
          dataModules?.data.map((modul, index, array) => {
            const lastAndFirst = index === 0 || index === array.length - 1;

            const formattedDate = moment(modul.created_at).format(
              "DD MMMM YYYY"
            );

            return (
              <Box
                key={modul.module_code}
                sx={{
                  backgroundColor: "#FFF",
                  border: "1px solid #d1d5db",
                  padding: "14px",
                  borderRadius: "10px",
                  gridColumn:
                    lastAndFirst && lgUp
                      ? "span 2 / span 2"
                      : "span 1 / span 1",
                  transition: "all 0.3s",
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  },
                }}
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
                  sx={{ color: "#6b7280", fontSize: "16px" }}
                >
                  {modul.description}
                </Typography>
              </Box>
            );
          })
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
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
