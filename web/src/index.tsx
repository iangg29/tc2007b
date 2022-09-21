import React, { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/main.css";
import { RelayEnvironmentProvider } from "react-relay";
import relayEnvironment from "./relay/RelayEnvironment";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <RelayEnvironmentProvider environment={relayEnvironment.getEnvironment()}>
    <Provider store={store}>
      <StrictMode>
        <Suspense fallback={<h1>Loading...</h1>}>
          <App />
        </Suspense>
      </StrictMode>
    </Provider>
  </RelayEnvironmentProvider>,
);
