// (c) Tecnologico de Monterrey 2022, rights reserved.

import React, { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/main.css";
import { RelayEnvironmentProvider } from "react-relay";
import relayEnvironment from "./relay/RelayEnvironment";
import App from "./App";
import "flowbite-react";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <RelayEnvironmentProvider environment={relayEnvironment.getEnvironment()}>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<h1>Loading...</h1>}>
        <StrictMode>
          <Suspense fallback={<h1>Loading...</h1>}>
            <App />
          </Suspense>
        </StrictMode>
      </PersistGate>
    </Provider>
  </RelayEnvironmentProvider>,
);
