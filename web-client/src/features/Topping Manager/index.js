import React, { useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./assets/css/topping.css";
import PageNotFound from "layout/PageNotFound";
import { useDispatch } from "react-redux";
import { getAll } from "./toppingSlice";
import toppingAPI from "api/toppingAPI";
import MainPage from "./pages/MainPage/MainPage";
import Add from "./pages/AddEdit/Add";
import Edit from "./pages/AddEdit/Edit";

function ToppingIndex() {
  let { path } = useRouteMatch();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await toppingAPI.getAll(token);
        console.log(res);
        dispatch(getAll(res.data));
      } catch (error) {}
    })();
  }, [dispatch]);
  return (
    <Router>
      <div className="_card-food food-padding min-height">
        <div className="food-title">Món Ăn Kèm</div>
        <hr />
        <Switch>
          <Route exact path={path}>
            <MainPage />
          </Route>
          <Route exact path="/merchant-topping/add">
            <Add />
          </Route>
          <Route exact path="/merchant-topping/edit/:id_topping">
            <Edit />
          </Route>
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}
export default ToppingIndex;
