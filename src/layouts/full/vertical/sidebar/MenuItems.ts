import { nanoid as uniqueId } from "nanoid";
import {
  IconLayoutDashboard,
  IconNotes,
  IconSend,
  IconSpeakerphone,
  IconUser,
} from "@tabler/icons-react";
import { IconBook2 } from "@tabler/icons-react";

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}

export const AdminMenuItems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(10),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard",
    chipColor: "secondary",
  },
  {
    id: uniqueId(10),
    title: "Modul Materi",
    icon: IconBook2,
    href: "/modul-materi",
    chipColor: "secondary",
  },
  {
    id: uniqueId(10),
    title: "Berita & Pengumuman",
    icon: IconNotes,
    href: "/berita-dan-pengumuman",
    chipColor: "secondary",
  },
  {
    id: uniqueId(10),
    title: "Informasi Event",
    icon: IconSpeakerphone,
    href: "/informasi-event",
    chipColor: "secondary",
  },
  {
    id: uniqueId(10),
    title: "Buka Diskusi",
    icon: IconSend,
    href: "/buka-diskusi",
    chipColor: "secondary",
  },
  {
    navlabel: true,
    subheader: "Applications",
  },
  {
    id: uniqueId(10),
    title: "Manajemen Pengguna",
    icon: IconUser,
    href: "/manajemen-pengguna",
    chipColor: "secondary",
  },
];
