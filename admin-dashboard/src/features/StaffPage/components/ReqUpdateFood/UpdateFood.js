import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as AiIcons from "react-icons/ai";
import "../CreateFood/CreateFood.css";
import staffAPI from "api/staffAPI";
import { setRequestUpdate } from "features/StaffPage/staffSlice";
import { useHistory, useParams } from "react-router-dom";
import * as BsIcons from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import { ErrorToast, SuccessToast, WarningToast } from "services/_ToastService";
function UpdateFood() {
  const req = useSelector((state) => state.staff.reqUpdate);
  console.log(req);
  const dispatch = useDispatch();
  const { id_request } = useParams();
  const history = useHistory();
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      const res = await staffAPI.getReqUpdate(token);
      dispatch(setRequestUpdate(res.data));
      console.log(res);
    })();
  }, [dispatch]);
  const current_req = useMemo(() => {
    return req.filter((item) => item.id_request === id_request)[0];
  }, [req, id_request]);
  console.log(current_req);
  return (
    <div className="_card-food min-height">
      <div style={{ position: "absolute" }}>
        <a href="/staff" style={{ textDecoration: "none" }}>
          <div className="return-effect">
            <span className="effect-2" style={{ color: "white" }}>
              <AiIcons.AiOutlineArrowLeft />
            </span>
            Return
          </div>
        </a>
      </div>
      <div className="pt-5">
        <div className="text-center title-req">Request Update Food</div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-4">
              <div className="subTitle-req pb-3">Note</div>
              <div className="d-flex justify-content-center align-items-center">
                <div
                  style={{
                    border: "1px solid #330000",
                    minHeight: "75vh",
                    width: "100%",
                    padding: 10,
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  {current_req && current_req.note}
                </div>
              </div>
            </div>
            <div className="col-8 ">
              <div className="subTitle-req pb-3">Process</div>
              <div className="d-flex justify-content-center align-items-center">
                <div
                  style={{
                    border: "1px solid #330000",
                    minHeight: "75vh",
                    width: "100%",
                  }}
                  className="row"
                >
                  <div className="previous-content-update d-flex justify-content-center align-items-center col-5">
                    <table className="table">
                      <tr>
                        <th className="bold">Old Name</th>
                        <td>{current_req && current_req.nameOld}</td>
                      </tr>
                      <tr>
                        <th className="bold">Old Price</th>
                        <td>
                          {current_req &&
                            new Intl.NumberFormat("it-IT", {
                              style: "currency",
                              currency: "VND",
                            }).format(current_req.priceOld)}
                        </td>
                      </tr>
                      <tr>
                        <th className="bold">Old Discount</th>
                        <td>{current_req && current_req.discountOld}%</td>
                      </tr>
                      <tr>
                        <th className="bold">Old Description</th>
                        <td>{current_req && current_req.dicriptionsOld}</td>
                      </tr>
                    </table>
                  </div>
                  <div className="col-2 d-flex justify-content-center align-items-center">
                    <span className="effect-to-right" style={{ fontSize: 30 }}>
                      <BsIcons.BsChevronRight />{" "}
                    </span>
                  </div>
                  <div className="current-content-update d-flex justify-content-center align-items-center col-5">
                    <table className="table">
                      <tr>
                        <th className="bold">New Name</th>
                        {}
                        <td
                          style={
                            current_req &&
                            current_req.nameNew !== current_req.nameOld
                              ? { color: "red" }
                              : { color: "black" }
                          }
                        >
                          {current_req && current_req.nameNew}
                        </td>
                      </tr>
                      <tr>
                        <th className="bold">New Price</th>
                        <td
                          style={
                            current_req &&
                            current_req.priceNew !== current_req.priceOld
                              ? { color: "red" }
                              : { color: "black" }
                          }
                        >
                          {current_req &&
                            new Intl.NumberFormat("it-IT", {
                              style: "currency",
                              currency: "VND",
                            }).format(current_req.priceNew)}
                        </td>
                      </tr>
                      <tr>
                        <th className="bold">New Discount</th>
                        <td
                          style={
                            current_req &&
                            current_req.discountNew !== current_req.discountOld
                              ? { color: "red" }
                              : { color: "black" }
                          }
                        >
                          {current_req && current_req.discountNew}%
                        </td>
                      </tr>
                      <tr>
                        <th className="bold">New Description</th>
                        <td
                          style={
                            current_req &&
                            current_req.dicriptionsNew !==
                              current_req.dicriptionsOld
                              ? { color: "red" }
                              : { color: "black" }
                          }
                        >
                          {current_req && current_req.dicriptionsNew}
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div className="col-12 d-flex justify-content-center align-items-center">
                    <button
                      onClick={() => {
                        if (window.confirm("Xác nhận chấp thuận ?")) {
                          let data = {
                            id_product: current_req.id_product,
                            name_product: current_req.nameNew,
                            priceNew: current_req.priceNew,
                            discountNew: current_req.discountNew,
                            descriptionNew: current_req.dicriptionsNew,
                            id_request: current_req.id_request,
                          };
                          console.log(data);
                          (async () => {
                            try {
                              const token = localStorage.getItem("token");
                              const res = await staffAPI.updateFood(
                                data,
                                token
                              );
                              console.log(res);
                              SuccessToast("Chấp thuận cập nhật thành công");
                              setTimeout(() => {
                                history.push("/staff");
                              }, 2000);
                            } catch (error) {
                              ErrorToast("Chấp thuận cập nhật thất bại");
                            }
                          })();
                        }
                      }}
                      type="button"
                      className="btn btn-primary"
                    >
                      Xác nhận
                    </button>
                    <button
                      style={{ marginLeft: 30 }}
                      type="button"
                      className="btn btn-warning"
                      onClick={() => {
                        if (window.confirm("Xác nhận từ chối ?")) {
                          try {
                            const token = localStorage.getItem("token");
                            staffAPI.ejectUpdateFood(
                              {
                                id_request: current_req.id_request,
                                id_product: current_req.id_product,
                              },
                              token
                            );
                            WarningToast("Từ chối cập nhật thành công");
                          } catch (error) {
                            ErrorToast("Từ chối cập nhật thất bại");
                          }
                        }
                      }}
                    >
                      Từ chối
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default UpdateFood;
