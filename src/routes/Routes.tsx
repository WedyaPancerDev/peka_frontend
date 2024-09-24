import loadable from "@loadable/component";
import { createBrowserRouter, Navigate } from "react-router-dom";

const FullLayout = loadable(() => import("layouts/full/FullLayout"));
const BlankLayout = loadable(() => import("layouts/blank/BlankLayout"));

const Login = loadable(() => import("pages/auth/Login"));
const Event = loadable(() => import("pages/event"));
const Dashboard = loadable(() => import("pages/dashboard"));
const Discussion = loadable(() => import("pages/discussion"));
const Announcement = loadable(() => import("pages/announcement"));

const Module = loadable(() => import("pages/modul"));
const ModuleCreate = loadable(() => import("pages/modul/create"));

const PenggunaPage = loadable(() => import("pages/pengguna"));
const PenggunaTambahPage = loadable(() => import("pages/pengguna/create"));
const PenggunaEditPage = loadable(() => import("pages/pengguna/edit"));

import NotFound from "pages/404";

import PublicRoute from "./middlewares/PublicRoute";
import AuthenticatedRoute from "./middlewares/AuthenticatedRoute";

const routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthenticatedRoute>
        <FullLayout />
      </AuthenticatedRoute>
    ),
    children: [
      { path: "/", element: <Navigate to="/dashboard" replace /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/informasi-event", element: <Event /> },
      { path: "/berita-dan-pengumuman", element: <Announcement /> },

      { path: "/modul-materi", element: <Module /> },
      { path: "/modul-materi/create", element: <ModuleCreate /> },

      { path: "/buka-diskusi", element: <Discussion /> },

      { path: "/manajemen-pengguna", element: <PenggunaPage /> },
      { path: "/manajemen-pengguna/create", element: <PenggunaTambahPage /> },
      {
        path: "/manajemen-pengguna/:user_id/edit",
        element: <PenggunaEditPage />,
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: "/",
    element: (
      <PublicRoute>
        <BlankLayout />
      </PublicRoute>
    ),
    children: [{ path: "masuk", element: <Login /> }],
    errorElement: <NotFound />,
  },
]);

export default routers;
