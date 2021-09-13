import merchantAPI from "api/merchantAPI";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import {
  emptyMerchant,
  setBrand,
  setListMerchant,
} from "features/Merchant/merchantSlice";
import MainPage from "features/Merchant/pages/MainPage/MainPage";
import "features/Merchant/components/Merchant.css";
import AddMerchant from "features/Merchant/pages/AddMerchant/AddMerchant";
import Brand from "features/Merchant/pages/Brand/Brand";
import BrandDetail from "features/Merchant/pages/Brand/BrandDetail";
import MerchantDetail from "features/Merchant/components/MerchantDetail";
function Merchant() {
  const dispatch = useDispatch();
  let { path } = useRouteMatch();
  useEffect(() => {
    (async () => {
      dispatch(emptyMerchant());
      const token = localStorage.getItem("token");
      const res = await merchantAPI.getAllMerchant(token);
      dispatch(setListMerchant(res.data));
    })();
    (async () => {
      const token = localStorage.getItem("token");
      const res = await merchantAPI.getBrand(token);
      dispatch(setBrand(res.data));
    })();
  }, [dispatch]);
  return (
    <div className="_card table-card">
      <div className="row" style={{ margin: "unset" }}>
        <div className="card-title col-8" style={{ padding: "unset" }}>
          <span>Đối tác</span>
          <span className="desc-title">
            Danh sách{" "}
            <span
              style={{ fontSize: 16, textTransform: "uppercase" }}
              className="bold"
            >
              đối tác
            </span>{" "}
            trên hệ thống .
          </span>
        </div>
        <div className="col-4 d-flex flex-row-reverse align-items-center">
          <Link to="/merchant/add">
            <button type="button" className="btn btn-primary">
              Tạo Merchant
            </button>
          </Link>
          <Link style={{ padding: "0 10px" }} to="/merchant/brand">
            <button type="button" className="btn btn-primary">
              Quản Lý Brand
            </button>
          </Link>
        </div>
      </div>
      <hr />
      <Switch>
        <Route exact path={`${path}`} component={MainPage} />
        <Route
          path={`${path}/detail/:id_merchant`}
          component={MerchantDetail}
        />
        <Route path={`${path}/add`} component={AddMerchant} />
        <Route path={`${path}/brand`} component={Brand} />
        <Route exact path={`${path}/:id`} component={BrandDetail} />
      </Switch>
    </div>
  );
}
export default Merchant;
