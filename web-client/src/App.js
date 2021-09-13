import { Route, BrowserRouter, Switch } from "react-router-dom";
import PublicRoute from "./utils/PublicRoute";
import React, { Fragment } from "react";
import { Suspense } from "react";
import { LoadAnimation } from "./components/Load/Load";
import MerchantRoute from "layout/MerchantRoute";
// Lazy load
const Login = React.lazy(() => import("./components/auth/Login"));
const Dashboard = React.lazy(() => import("features/Dashboard/index"));
const Merchant = React.lazy(() => import("features/Merchant/index"));
const Food = React.lazy(() => import("features/Food/index"));
const AddFood = React.lazy(() => import("features/Food/pages/AddFood/AddFood"));
const FoodDetail = React.lazy(() =>
  import("features/Food/pages/FoodDetail/index")
);
const UpdateFood = React.lazy(() =>
  import("features/Food/pages/UpdateFood/index")
);
const AttributeIndex = React.lazy(() =>
  import("features/Attribute Manager/index")
);
const ToppingIndex = React.lazy(() =>
  import("features/Topping Manager/index.js")
);
const MenuIndex = React.lazy(() => import("features/Menu/index.js"));
const OrderIndex = React.lazy(() => import("features/Order Manager/index"));
const FeedbackIndex = React.lazy(() => import("features/Feedback/index"));

const PageNotFound = React.lazy(() => import("layout/PageNotFound"));
function App() {
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
              {/* ---------------------------Login---------------------- */}
              <PublicRoute exact path="/login" component={Login} />
              {/* ---------------------------Login---------------------- */}

              {/* ---------------------------Dashboard---------------------- */}
              <MerchantRoute exact path="/" component={Dashboard} />
              <MerchantRoute
                exact
                path="/merchant-attribute"
                component={AttributeIndex}
              />
              <MerchantRoute
                exact
                path="/merchant-topping"
                component={ToppingIndex}
              />
              <MerchantRoute
                exact
                path="/merchant-feedback"
                component={FeedbackIndex}
              />
              <MerchantRoute
                exact
                path="/merchant-order"
                component={OrderIndex}
              />
              <MerchantRoute path="/menu" component={MenuIndex} />
              {/* ---------------------------Dashboard---------------------- */}

              {/* ---------------------------Merchant---------------------- */}
              <MerchantRoute exact path="/merchant" component={Merchant} />

              {/* ---------------------------Merchant---------------------- */}

              {/* ---------------------------Food---------------------- */}
              <MerchantRoute exact path="/food" component={Food} />
              <MerchantRoute
                exact
                path="/food/add/:id_merchant"
                component={AddFood}
              />
              <MerchantRoute
                exact
                path="/food/:id_product"
                component={FoodDetail}
              />
              <MerchantRoute
                exact
                path="/food-update/:id_product"
                component={UpdateFood}
              />
              {/* ---------------------------Food---------------------- */}

              <Route component={PageNotFound} />
            </Switch>
          </Suspense>
        </Fragment>
      </BrowserRouter>
    </div>
  );
}
export default App;
