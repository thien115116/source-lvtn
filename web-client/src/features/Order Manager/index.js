import PageNotFound from "layout/PageNotFound";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import DetailOrder from "./pages/Detail/DetailOrder";
import MainPage from "./pages/MainPage/MainPage";
import "./assets/order.css";
function OrderIndex(props) {
  let { path } = useRouteMatch();
  return (
    <Router>
      <div className="_card-food food-padding min-height">
        <div className="food-title">Báo Cáo Đơn Đặt Hàng</div>
        <hr />
        <Switch>
          <Route exact path={path}>
            <MainPage />
          </Route>
          <Route exact path="/merchant-topping/:id_order">
            <DetailOrder />
          </Route>
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default OrderIndex;
