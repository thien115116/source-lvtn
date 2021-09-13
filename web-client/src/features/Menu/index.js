import PageNotFound from "layout/PageNotFound";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import AddMenu from "./pages/Add/AddMenu";
import EditMenu from "./pages/Edit/EditMenu";
import MainPage from "./pages/MainPage/MainPage";
import "./assets/css/menu.css";
import { useDispatch } from "react-redux";
import { setMenu } from "./menuSlice";
import menuAPI from "api/menuAPI";
import EditInfoMenu from "./pages/Edit/EditInfoMenu";
function MenuIndex() {
  let { path } = useRouteMatch();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await menuAPI.getAllMenu(token);
        console.log(res.data);
        dispatch(setMenu(res.data));
      } catch (error) {}
    })();
  }, [dispatch]);
  return (
    <Router>
      <div className="_card-food food-padding min-height">
        <div className="food-title">Thực Đơn Của Bạn</div>
        <hr />
        <Switch>
          <Route exact path={path}>
            <MainPage />
          </Route>
          <Route path="/menu/add">
            <AddMenu />
          </Route>
          <Route path="/menu/edit/:id_menu">
            <EditMenu />
          </Route>
          <Route path="/menu/:id_menu">
            <EditInfoMenu />
          </Route>
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default MenuIndex;
