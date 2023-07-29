import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";

import App from "./app";

const config = {
  token: {
    colorPrimary: "#41b995",
    colorSuccess: "#41b995",
    colorWarning: "#faea14",
    colorInfo: "#57d8b1",
    colorTextBase: "#242331",
    colorBgBase: "#feffff",
    fontSize: 15,
  },
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={config}>
      <Router>
        <App />
      </Router>
    </ConfigProvider>
  </React.StrictMode>
);
