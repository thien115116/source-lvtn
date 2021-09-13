import ReactDOM from "react-dom";
import App from "./app";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/fonts/font-awesome-4.7.0/css/font-awesome.css";
import "./assets/style/global.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./App/store";
import React from "react";
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
