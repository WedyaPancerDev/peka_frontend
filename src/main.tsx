import { Suspense } from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import Store from "store/Store";
import PageLoader from "components/PageLoader";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Suspense fallback={<PageLoader />}>
    <HelmetProvider>
      <Provider store={Store}>
        <App />
      </Provider>
    </HelmetProvider>
  </Suspense>
);
