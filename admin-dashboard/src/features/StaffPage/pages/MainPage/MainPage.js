import axios from "axios";
import { React, useEffect, useState } from "react";
import { GLOBAL_VARIABLE } from "app.global";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as FcIcons from "react-icons/fc";
import MerchantPending from "features/StaffPage/components/MerchantPending/MerchantPending";
import RequestCreateFood from "features/StaffPage/components/RequestCreateFood/RequestCreateFood";
import BarChart from "features/StaffPage/components/Chart/Barchart/Barchart";
import staffAPI from "api/staffAPI";
import RequestUpdateFood from "features/StaffPage/components/ReqUpdateFood/RequestUpdateFood";
import { useDispatch } from "react-redux";
import { setRequestUpdate } from "features/StaffPage/staffSlice";
const MainPage = () => {
  const [request, setRequest] = useState(null);
  const [reqUpdateFood, setReqUpdateFood] = useState(null);
  const [countReqUpdateFood, setCountReqUpdateFood] = useState(null);
  const [countReq, setCountReq] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    getData();
    (async () => {
      const token = localStorage.getItem("token");
      const res = await staffAPI.getReqUpdate(token);
      setReqUpdateFood(res.data);
      dispatch(setRequestUpdate(res.data));
      setCountReqUpdateFood(res.data.length);
      console.log(res);
    })();
  }, [dispatch]);
  const getData = async () => {
    const res1 = await axios.get(
      `${GLOBAL_VARIABLE.BASE_URL}/base-admin/get-request-from-merchant`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    console.log(res1.data);
    setRequest(res1.data);
    setCountReq(res1.data.length);
  };

  return (
    <>
      <ToastContainer />
      <div className="row">
        <div className="col-md-8 ">
          <div className="merchant__pending _card-food p-3">
            <div style={{ paddingBottom: 50 }}>
              <span className="count-task-title">
                <span className="d-block">You've got</span>{" "}
                <span className="d-block">
                  {countReq + countReqUpdateFood} tasks now{" "}
                  <FcIcons.FcCalendar />{" "}
                </span>
              </span>
            </div>
            <div className="container-fluid ">
              <div className="workview--border ">
                <fieldset className="scheduler-border">
                  <legend className="scheduler-border">
                    <span className="count-task-title">
                      <span className="d-block">My Task</span>{" "}
                    </span>
                  </legend>
                  {request &&
                    request.map((item, index) => {
                      switch (item.content) {
                        case "Yêu cầu mở cửa hàng.":
                          return (
                            <div key={index} className="_card-food mb-3 p-2">
                              <MerchantPending
                                index={index}
                                item={item}
                                // count={handleChangeCount}
                              />
                            </div>
                          );

                        case "Hỗ trợ tạo món.":
                          return (
                            <div key={index} className="_card-food mb-3 p-2">
                              <RequestCreateFood
                                // count={handleChangeCount}
                                index={index}
                                item={item}
                              />
                            </div>
                          );

                        default:
                          return <></>;
                      }
                    })}
                  {reqUpdateFood &&
                    reqUpdateFood.map((item, index) => {
                      return (
                        <div className="_card-food mb-3 p-2" key={index}>
                          <RequestUpdateFood req={item} />
                        </div>
                      );
                    })}
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 pb-5 ">
          <div className="row">
            <div className="col-12 ">
              <div className="workview--border _card-food message">
                <div className="message__box">
                  <div className="message__title">
                    <span>Owner Message</span>
                  </div>
                  <div className="message__content">
                    Message From Base-Admin
                  </div>
                  <hr></hr>
                  <div className="message__response">
                    <form>
                      <div className="form-group">
                        <textarea
                          placeholder="Your response"
                          className="form-control"
                          rows={4}
                        />
                      </div>
                      <div className="form-group">
                        <button type="button" className="btn btn-secondary">
                          Gửi Phản Hồi
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="_card-food" style={{ marginTop: 20 }}>
                <BarChart a={0} b={countReq + countReqUpdateFood} c={1} d={1} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
