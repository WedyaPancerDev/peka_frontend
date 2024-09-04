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
        position="bottom-right"
        toastOptions={{
          duration: 5000,
        }}
      />
    </ThemeProvider>
  );
}

export default App;
