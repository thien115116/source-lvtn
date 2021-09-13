import React, { useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import MainPage from "./pages/Mainpage/Mainpage";
import Add from "./pages/AddEdit/Add";
import "../Food/assets/css/food.css";
import PageNotFound from "layout/PageNotFound";
import { getAll } from "./attributeSlice";
import { useDispatch } from "react-redux";
import attributeAPI from "api/attributeAPI";
import Edit from "./pages/AddEdit/Edit";

function AttributeIndex(props) {
  let { path } = useRouteMatch();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await attributeAPI.getAll(token);
        dispatch(getAll(res.data));
      } catch (error) {}
    })();
  }, [dispatch]);
  return (
    <Router>
      <div className="_card-food food-padding min-height">
        <div className="food-title">Attributes</div>
        <hr />
        <Switch>
          <Route exact path={path}>
            <MainPage />
          </Route>
          <Route exact path="/merchant-attribute/add">
            <Add />
          </Route>
          <Route exact path="/merchant-attribute/edit/:id_attr">
            <Edit />
          </Route>
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

AttributeIndex.propTypes = {};

export default AttributeIndex;
