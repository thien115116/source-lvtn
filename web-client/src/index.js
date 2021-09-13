import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import "./assets/css/GLOBAL.css";
import "components/Sidebar/MerchantSidebar/merchantSidebar.css";
import store from "app/store";
import { Provider } from "react-redux";
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
