import { Box, Avatar, Typography, useMediaQuery } from "@mui/material";
import { type AppState, useSelector } from "store/Store";

export const Profile = (): JSX.Element => {
  const customizer = useSelector((state: AppState) => state.customizer);

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const hideMenu = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : "";

  return (
    <Box
      display={"flex"}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${"secondary.light"}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar
            alt="Default Avatar"
            src={"/assets/images/avatar/default-avatar.svg"}
          />

          <Box>
            <Typography
              variant="h6"
              sx={{
                width: "80px",
                marginTop: "2px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              Jack Pitter
            </Typography>
            <Typography variant="caption" sx={{ textTransform: "capitalize" }}>
              Admin
            </Typography>
          </Box>
        </>
      ) : (
        ""
      )}
    </Box>
  );
};
