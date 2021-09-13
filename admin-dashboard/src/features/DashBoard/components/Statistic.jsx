import "./Dashboard.css";
import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  filterOrder,
  totalMoneyEver,
} from "services/About Monney/CalculatingMoney";
import { Link } from "react-router-dom";
export const TotalOrder = (props) => {
  const totalOrder = useSelector((state) => state.dashboard.totalOrder);
  const [totalCount, setTotalCount] = useState(null);
  return (
    <div className="box box-hover">
      {/* COUNTER */}
      <div className="counter d-flex">
        <div className="static_icon col-3 d-flex justify-content-center align-items-center">
          <div className="circle_icon d-flex justify-content-center align-items-center">
            <FaIcons.FaShoppingCart />
          </div>
        </div>
        <div className="col-9" style={{ paddingLeft: "unset" }}>
          <div className="counter-title text-center">total order</div>
          <div className="counter-info">
            <ul className="nav nav-tabs nav">
              <div className="nav-item nav-item">
                <Link
                  onClick={() => {
                    setTotalCount(filterOrder(totalOrder, 30));
                  }}
                  className="nav-link nav-link"
                >
                  Monthly
                </Link>
              </div>
              <div className="nav-item nav-item">
                <Link
                  onClick={() => {
                    setTotalCount(filterOrder(totalOrder, 7));
                  }}
                  className="nav-link nav-link"
                >
                  Weekly
                </Link>
              </div>
              <div className="nav-item nav-item">
                <Link
                  onClick={() => {
                    setTotalCount(filterOrder(totalOrder, 1));
                  }}
                  className="nav-link nav-link"
                >
                  Today
                </Link>
              </div>
            </ul>
          </div>
          <div className="row">
            <div className="col-12">
              {" "}
              <div className="counter-count d-flex justify-content-center align-items-center">
                <span style={{ fontSize: 25 }}>
                  {" "}
                  {totalCount
                    ? totalCount.length
                    : filterOrder(totalOrder, 1).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END COUNTER */}
    </div>
  );
};
export const TotalProfit = (props) => {
  const totalOrder = useSelector((state) => state.dashboard.totalOrder);
  const [totalProfit, setTotalProfit] = useState(null);
  // const totalProfit = useMemo(() => {
  //   let profit = totalMoneyEver(totalOrder);
  //   return profit;
  // }, [totalOrder]);
  return (
    <div className="box box-hover">
      {/* COUNTER */}
      <div className="counter d-flex">
        <div className="static_icon col-3 d-flex justify-content-center align-items-center">
          <div className="circle_icon d-flex justify-content-center align-items-center">
            <GiIcons.GiReceiveMoney />
          </div>
        </div>
        <div className="col-9" style={{ paddingLeft: "unset" }}>
          <div className="counter-title text-center">total profit</div>
          <div className="counter-info">
            <ul className="nav nav-tabs nav">
              <div className="nav-item nav-item">
                <Link
                  onClick={() => {
                    setTotalProfit(totalMoneyEver(totalOrder, 30));
                  }}
                  className="nav-link nav-link"
                >
                  Monthly
                </Link>
              </div>
              <div className="nav-item nav-item">
                <Link
                  onClick={() => {
                    setTotalProfit(totalMoneyEver(totalOrder, 7));
                  }}
                  className="nav-link nav-link"
                >
                  Weekly
                </Link>
              </div>
              <div className="nav-item nav-item">
                <Link
                  onClick={() => {
                    setTotalProfit(totalMoneyEver(totalOrder, 1));
                  }}
                  className="nav-link nav-link"
                >
                  Today
                </Link>
              </div>
            </ul>
          </div>
          <div className="row">
            <div className="col-12">
              {" "}
              <div className="counter-count d-flex justify-content-center align-items-center">
                <span style={{ fontSize: 25 }}>
                  {" "}
                  {totalProfit
                    ? new Intl.NumberFormat("it-IT", {
                        style: "currency",
                        currency: "VND",
                      }).format(totalProfit)
                    : new Intl.NumberFormat("it-IT", {
                        style: "currency",
                        currency: "VND",
                      }).format(totalMoneyEver(totalOrder, 1))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END COUNTER */}
    </div>
  );
};
export const DailyVisitor = (props) => {
  const state = useSelector((state) => state.merchant.list_Mer);
  return (
    <div className="box box-hover">
      {/* COUNTER */}
      <div className="counter d-flex">
        <div className="static_icon col-3 d-flex justify-content-center align-items-center">
          <div className="circle_icon d-flex justify-content-center align-items-center">
            <AiIcons.AiOutlineShop />
          </div>
        </div>
        <div className="col-9" style={{ paddingLeft: "unset" }}>
          <div className="counter-title text-center">total merchant</div>
          <div className="counter-count d-flex justify-content-center align-items-center">
            <span style={{ fontSize: 25 }}> {state.length}</span>
          </div>
        </div>
      </div>
      {/* END COUNTER */}
    </div>
  );
};
export const CurrentOnline = (props) => {
  return (
    <div className="box box-hover">
      {/* COUNTER */}
      <div className="counter d-flex">
        <div className="static_icon col-3 d-flex justify-content-center align-items-center">
          <div className="circle_icon d-flex justify-content-center align-items-center">
            <HiIcons.HiUserGroup />
          </div>
        </div>
        <div className="col-9">
          <div className="counter-title text-center">total user</div>
          <div className="counter-count d-flex justify-content-center align-items-center">
            <span style={{ fontSize: 25 }}> 318</span>
          </div>
        </div>
      </div>
      {/* END COUNTER */}
    </div>
  );
};
