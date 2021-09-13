import "./Dashboard.css";
import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import { useEffect, useState } from "react";
import orderAPI from "api/orderAPI";
import { useDispatch, useSelector } from "react-redux";
import { setOrderToday } from "features/Order Manager/OrderSlice";
import { moneyOfToday } from "service/About Monney/CalculatingMoney";
export const TotalOrder = (props) => {
  const dispatch = useDispatch();
  const [orderTodayX, setOrderTodayX] = useState();
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await orderAPI.getTodayOrder(token);
        console.log(res);
        setOrderTodayX(res.data);
        dispatch(setOrderToday(res.data));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);
  return (
    <div className="box box-hover">
      {/* COUNTER */}
      <div className="counter d-flex">
        <div className="static_icon col-4">
          <div className="circle_icon d-flex justify-content-center align-items-center">
            <FaIcons.FaShoppingCart />
          </div>
        </div>
        <div className="col-8">
          <div className="counter-title">Đơn Đặt Hàng</div>
          <div className="counter-info">
            <div className="counter-count ">
              {orderTodayX === null ? orderTodayX : "0"} đơn
            </div>
          </div>
        </div>
      </div>
      {/* END COUNTER */}
    </div>
  );
};
export const TotalProfit = (props) => {
  const todayOrder = useSelector((state) => state.order.order_today);
  return (
    <div className="box box-hover">
      {/* COUNTER */}
      <div className="counter d-flex">
        <div className="static_icon col-4">
          <div className="circle_icon d-flex justify-content-center align-items-center">
            <GiIcons.GiReceiveMoney />
          </div>
        </div>
        <div className="col-8">
          <div className="counter-title">Tổng Doanh Thu</div>
          <div className="counter-info">
            <div className="counter-count">
              {new Intl.NumberFormat("it-IT", {
                style: "currency",
                currency: "VND",
              }).format(moneyOfToday(todayOrder))}
            </div>
          </div>
        </div>
      </div>
      {/* END COUNTER */}
    </div>
  );
};
export const DailyVisitor = (props) => {
  return (
    <div className="box box-hover">
      {/* COUNTER */}
      <div className="counter d-flex">
        <div className="static_icon col-4">
          <div className="circle_icon d-flex justify-content-center align-items-center">
            <AiIcons.AiOutlineShop />
          </div>
        </div>
        <div className="col-8">
          <div className="counter-title">Số Menus</div>
          <div className="counter-info">
            <div className="counter-count">10</div>
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
        <div className="static_icon col-4">
          <div className="circle_icon d-flex justify-content-center align-items-center">
            <HiIcons.HiUserGroup />
          </div>
        </div>
        <div className="col-8">
          <div className="counter-title">Số Khách Hàng</div>
          <div className="counter-info">
            <div className="counter-count">100</div>
          </div>
        </div>
      </div>
      {/* END COUNTER */}
    </div>
  );
};
