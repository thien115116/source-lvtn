import { Route, BrowserRouter, Switch } from "react-router-dom";
import PublicRoute from "./Utils/PublicRoute";
import React, { Fragment, useEffect } from "react";
import { Suspense } from "react";
import { LoadAnimation } from "./components/Load/Load";
import { useDispatch } from "react-redux";
import {
  emptyMerchant,
  setListMerchant,
} from "features/Merchant/merchantSlice";
import merchantAPI from "api/merchantAPI";
import firebase from "./firebase";
import "@firebase/messaging";
// Lazy load
const Dashboard = React.lazy(() => import("features/DashBoard/index.js"));
const Banner = React.lazy(() => import("./features/Banner/index.jsx"));
const AdminRoute = React.lazy(() => import("layout/Admin"));
const StaffRoute = React.lazy(() => import("./layout/StaffRoute"));
// const StaffTemplate = React.lazy(() => import("./layout/StaffRoute"));
const AdminManager = React.lazy(() =>
  import("./components/AdminInfo/AdminManager")
);
const StaffWork = React.lazy(() => import("features/StaffPage/index.js"));
const ReqUpdate = React.lazy(() =>
  import("features/StaffPage/components/ReqUpdateFood/UpdateFood")
);
const Staff = React.lazy(() => import("features/Employee/index.jsx"));

const Login = React.lazy(() => import("./components/auth/Login"));
const CreateFood = React.lazy(() =>
  import("features/StaffPage/pages/AddFood/AddFood")
);
const Merchant = React.lazy(() => import("features/Merchant/index"));
const Location = React.lazy(() => import("features/Location/index"));
const WorkView = React.lazy(() => import("features/Work-View/index"));
const Debt = React.lazy(() => import("features/Debt/index"));
const PageNotFound = React.lazy(() => import("layout/PageNotFound"));

function Routes() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      dispatch(emptyMerchant());
      const token = localStorage.getItem("token");
      const res = await merchantAPI.getAllMerchant(token);
      dispatch(setListMerchant(res.data));
    })();
  }, [dispatch]);
  // useEffect(() => {
  //   const msg = firebase.messaging();
  //   msg.onMessage(function (payload) {
  //     console.log("onMessage: ", payload);
  //   });
  //   msg
  //     .requestPermission()
  //     .then(() => {
  //       return msg.getToken();
  //     })
  //     .then((data) => {
  //       console.warn("token", data);
  //       console.log(data);
  //     });
  // });
  return (
    <div>
      <BrowserRouter>
        <Fragment>
          <Suspense
            fallback={
              <div>
                <LoadAnimation />
              </div>
            }
          >
            <Switch>
              <PublicRoute exact path="/login" component={Login} />

              <AdminRoute exact path="/" component={Dashboard} />

              <AdminRoute path="/merchant" component={Merchant} />

              <AdminRoute exact path="/debt" component={Debt} />

              <AdminRoute exact path="/employee" component={Staff} />

              <AdminRoute exact path="/workview" component={WorkView} />

              <AdminRoute exact path="/banner" component={Banner} />

              <AdminRoute exact path="/location" component={Location} />

              <AdminRoute exact path="/profile" component={AdminManager} />

              <StaffRoute
                exact
                path="/staff-profile"
                component={AdminManager}
              />
              <StaffRoute exact path="/staff" component={StaffWork} />
              <StaffRoute
                exact
                path="/staff/update-food/:id_request"
                component={ReqUpdate}
              />
              <StaffRoute
                exact
                path="/staff/create-food/:id_merchant"
                component={CreateFood}
              />

              <Route path="*" component={PageNotFound} />
            </Switch>
          </Suspense>
        </Fragment>
      </BrowserRouter>
    </div>
  );
}
export default Routes;
