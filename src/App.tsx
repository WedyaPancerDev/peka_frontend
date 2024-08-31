import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { ThemeSettings } from "theme/Theme";
import routers from "routes/Routes";

function App() {
  const theme = ThemeSettings();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={routers} />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 6000,
        }}
      />
    </ThemeProvider>
  );
}

export default App;
