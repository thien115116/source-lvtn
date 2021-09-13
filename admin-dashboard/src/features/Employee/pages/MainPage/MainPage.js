import { React, useEffect } from "react";
import { Export } from "services/_exportExcel_Servicec";
import { CreateForm } from "features/Employee/components/CreateForm";
import { Table } from "features/Employee/components/Table";
import "../../components/Staff.css";
import userAPI from "api/userAPI";
import { useSelector, useDispatch } from "react-redux";
import {
  initialEmployee,
  addAccount,
  emptyEmployee,
} from "features/Employee/employeeSlice";
import { LineChartEmployee } from "components/Chart/LineChart/LineChartEmployee";
import { ErrorToast, SuccessToast } from "services/_ToastService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MainPage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.employee.list);
  console.log(data);
  useEffect(() => {
    (async () => {
      try {
        dispatch(emptyEmployee());
        const token = localStorage.getItem("token");
        const response = await userAPI.getAdminAccount(token);
        dispatch(initialEmployee(response.data.Account));
      } catch (error) {}
    })();
  }, [dispatch]);

  const addNewData = (value) => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await userAPI.addAdminAccount(token, value);
        dispatch(addAccount(res.data.staff));
        SuccessToast("Thêm nhân viên thành công");
      } catch (error) {
        ErrorToast("Thêm nhân viên thất bại");
      }
    })();
  };
  return (
    <div className="">
      <ToastContainer />
      <div className="row">
        <div className="col-4  d-flex justify-content-center form-card">
          <div className="d-flex justify-content-center align-items-center">
            {" "}
            <CreateForm addNewData={addNewData} />
          </div>
        </div>
        <div className="col-8" style={{ paddingRight: "unset" }}>
          <div className="form-card">
            <LineChartEmployee />
          </div>
        </div>
        <div className="col-12" style={{ padding: "30px 0" }}>
          <div className="table-card">
            <span>Danh sách nhân viên</span>
            <span className="desc-title">
              Danh sách các{" "}
              <span
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  fontSize: 16,
                }}
              >
                Nhân viên{" "}
              </span>
              đang làm việc ||{" "}
              <span style={{ fontWeight: "bold" }}>Export:</span>
              <Export csvData={data} fileName={"DSNhanVien"} />
            </span>
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
