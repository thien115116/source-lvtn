import TableOrder from "features/Order Manager/components/TableOrder";
import React, { useMemo, useState } from "react";

import { dayOfWeek } from "service/calculatingDayOfWeek";
import orderAPI from "api/orderAPI";
import { useDispatch, useSelector } from "react-redux";
import { emptyOrder, setOrder } from "features/Order Manager/OrderSlice";
function MainPage() {
  const dispatch = useDispatch();
  const order_list = useSelector((state) => state.order.order);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const total = useMemo(() => {
    let orderData = order_list;
    let profit = 0;
    orderData.forEach((item) => {
      profit += item.profit;
    });
    let count;
    if (order_list === null) {
      count = 0;
    } else {
      count = orderData.length;
    }
    return { profit: profit, count: count };
  }, [order_list]);

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="order-time _card-food" style={{ minHeight: 100 }}>
            <div className="pick_one">
              <div className="pr-2 d-inline-block">
                <span style={{ fontSize: 18, fontWeight: "bold" }}>
                  Lọc theo:{" "}
                </span>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    (async () => {
                      try {
                        const token = localStorage.getItem("token");
                        const res = await orderAPI.getTodayOrder(token);
                        console.log(res);
                        dispatch(emptyOrder());
                        dispatch(setOrder(res.data));
                      } catch (error) {}
                    })();
                  }}
                >
                  Hôm nay
                </button>
              </div>
              <div className="pr-2 d-inline-block">
                <button
                  onClick={() => {
                    let data = dayOfWeek();
                    (async () => {
                      try {
                        const token = localStorage.getItem("token");
                        const res = await orderAPI.getWeekOrder(
                          { start: data.startDay, end: data.endDay },
                          token
                        );
                        console.log(res);
                        dispatch(emptyOrder());
                        dispatch(setOrder(res.data));
                      } catch (error) {}
                    })();
                  }}
                  type="button"
                  className="btn btn-primary"
                >
                  Tuần
                </button>
              </div>
              <div className="d-inline-block">
                <button
                  onClick={() => {
                    (async () => {
                      try {
                        const token = localStorage.getItem("token");
                        const res = await orderAPI.getMonthOrder(
                          { month: new Date().getMonth() + 1 },
                          token
                        );
                        console.log(res);
                        dispatch(emptyOrder());
                        dispatch(setOrder(res.data));
                      } catch (error) {}
                    })();
                  }}
                  type="button"
                  className="btn btn-primary"
                >
                  Tháng
                </button>
              </div>
            </div>
            <div className="pick_multi pt-3">
              <span
                style={{ display: "block", fontWeight: "bold", fontSize: 18 }}
              >
                Lọc theo ngày tùy chọn:{" "}
              </span>
              <label>Chọn ngày bắt đầu:</label>
              <input
                onChange={(e) => {
                  setStart(e.target.value);
                }}
                type="date"
                className="form-input"
              />
              <label>Chọn ngày kết thúc:</label>
              <input
                onChange={(e) => {
                  setEnd(e.target.value);
                }}
                type="date"
                className="form-input"
              />
              <button
                onClick={() => {
                  if (start && end) {
                    (async () => {
                      try {
                        const token = localStorage.getItem("token");
                        const res = await orderAPI.getCustomDayOrder(
                          { start: start, end: end },
                          token
                        );
                        console.log(res);
                        dispatch(emptyOrder());
                        dispatch(setOrder(res.data));
                      } catch (error) {}
                    })();
                  }
                }}
                type="button"
                className="btn btn-primary mt-2"
              >
                Tìm
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 pt-3">
          <div
            className="order-count _card-food row"
            style={{ minHeight: 100 }}
          >
            <div className="col-6">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "100%" }}
              >
                <div className="text-center ">
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: "bold",
                      color: "#999",
                    }}
                  >
                    Số đơn hàng:
                  </span>{" "}
                  <div className="font-weight-bold" style={{ fontSize: 20 }}>
                    {total.count}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "100%" }}
              >
                <div className="text-center ">
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: "bold",
                      color: "#999",
                    }}
                  >
                    Tổng doanh thu (đ):
                  </span>{" "}
                  <div className="font-weight-bold" style={{ fontSize: 20 }}>
                    {new Intl.NumberFormat("it-IT", {
                      style: "currency",
                      currency: "VND",
                    }).format(total.profit)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 pt-3">
          <div
            className="order-table _card-food"
            style={{ minHeight: 380, padding: "5px 10px" }}
          >
            <TableOrder />
          </div>
        </div>
      </div>
    </>
  );
}
export default MainPage;
