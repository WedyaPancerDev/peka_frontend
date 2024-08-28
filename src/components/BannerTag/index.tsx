import { Box, Typography } from "@mui/material";
import {
  IconBook2,
  IconLayoutDashboard,
  IconNotes,
  IconSend,
  IconSpeakerphone,
} from "@tabler/icons-react";

import ShinySingle from "components/Svg/ShinySingle";

type ActiveIconProps = Record<string, JSX.Element>;

type BannerTagProps = {
  type: "dashboard" | "module" | "announcement" | "event" | "discussion";
};

const activeIcon: ActiveIconProps = {
  dashboard: <IconLayoutDashboard style={{ flexShrink: 0 }} />,
  module: <IconBook2 style={{ flexShrink: 0 }} />,
  announcement: <IconNotes style={{ flexShrink: 0 }} />,
  event: <IconSpeakerphone style={{ flexShrink: 0 }} />,
  discussion: <IconSend style={{ flexShrink: 0 }} />,
};

const activeTitle: Record<string, string> = {
  dashboard: "Dashboard",
  module: "Modul Materi",
  announcement: "Berita & Pengumuman",
  event: "Informasi Event",
  discussion: "Buka Diskusi",
};

const activeDescription: Record<string, string> = {
  dashboard: "Lihat informasi terkini",
  module: "Modul materi yang tersedia untuk dipelajari",
  announcement: "Baca berita dan pengumuman terbaru",
  event: "Ikuti event yang sedang berlangsung",
  discussion: "Buka diskusi dan tanya jawab",
};

const BannerTag = ({ type }: BannerTagProps): JSX.Element => {
  return (
    <Box
      sx={{
        color: "white",
        background:
          "linear-gradient(-90deg, rgba(93,197,255,1) 0%, rgba(93,135,255,1) 100%)",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 10px 20px 0 rgba(0,0,0,.15)",
      }}
    >
      <ShinySingle style={{ position: "absolute", left: 0, zIndex: 0 }} />
      <Box
        sx={{
          padding: "16px",
          display: "flex",
          alignItems: "center",
          position: "relative",
          zIndex: 5,
        }}
      >
        {activeIcon[type] || <></>}

        <Box
          sx={{ display: "flex", flexDirection: "column", marginLeft: "16px" }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.035em",
            }}
          >
            {activeTitle[type] || "-"}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              marginTop: "4px",
            }}
          >
            {activeDescription[type] || "-"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BannerTag;
