import checkRole from "services/_checkRoles";
import { useDispatch, useSelector } from "react-redux";
import { PaginationComponent } from "components/Paginate/Pagination";
import { useMemo, useState } from "react";
import * as MdIcons from "react-icons/md";
import employeeAPI from "api/employeeAPI";
import { ErrorToast, SuccessToast } from "services/_ToastService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteAccount } from "../employeeSlice";
export const Table = () => {
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const data = useSelector((state) => state.employee.list);

  const dataEmployee = useMemo(() => {
    let sliceData = data;

    return sliceData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [data, currentPage]);
  return (
    <>
      <ToastContainer />
      <table className="table table-hover">
        <thead>
          <TableHeader />
        </thead>
        <tbody>
          <TableData
            currentPage={currentPage}
            ITEMS_PER_PAGE={ITEMS_PER_PAGE}
            data={dataEmployee}
          />
        </tbody>
      </table>
      {data && data.length === 0 ? (
        <>
          <div className="text-center bold">
            Hiện tại chưa có nhân viên nào !!
          </div>
        </>
      ) : (
        <>
          <PaginationComponent
            total={data.length}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
          />
        </>
      )}
    </>
  );
};
const TableHeader = () => {
  return (
    <tr className="text-center bold">
      <td>#</td>
      <td>FULL NAME</td>
      <td>EMAIL</td>
      <td>CREATE DATE</td>
      <td>IS ACTIVE</td>
      <td>IS ENABLE</td>
      <td>ROLE</td>
      <td>IS CONFIRM EMAIL</td>
      <td>UPDATE DATE</td>
      <td>Action</td>
    </tr>
  );
};
const TableData = ({ data, currentPage, ITEMS_PER_PAGE }) => {
  const dispatch = useDispatch();
  return (
    <>
      {data.map((item, index) => (
        <tr className="text-center" key={index}>
          <td>
            {currentPage === 1
              ? index + 1
              : ITEMS_PER_PAGE * (currentPage - 1) + index + 1}
          </td>
          <td>{item.full_name}</td>
          <td>{item.email}</td>
          <td>{new Date(item.created_date).toLocaleDateString()}</td>
          <td>
            <div
              className={
                item.is_active === 1 ? "label_online" : "label_non_online"
              }
            >
              {item.is_active === 1 ? "Online" : "Offline"}
            </div>
          </td>
          <td>
            <div
              className={
                item.is_enable === 1 ? "label_enable" : "label_non_enable"
              }
            >
              {" "}
              {item.is_enable === 1 ? "Kích Hoạt" : "Chưa Kích Hoạt"}
            </div>
          </td>
          <td>
            <div className={checkRole(item.role) ? "labelAdmin" : "labelStaff"}>
              {checkRole(item.role) ? "Admin" : "Staff"}
            </div>
          </td>
          <td>
            <div
              className={
                item.is_confirmEmail === null
                  ? "label_confirm_email"
                  : "label_non_confirm_email"
              }
            >
              {item.is_confirmEmail !== null ? "Chưa xác nhận" : "Đã xác nhận"}
            </div>
          </td>
          <td>{new Date(item.updated_date).toLocaleDateString()}</td>
          <td>
            <div
              onClick={() => {
                if (window.confirm("Xác nhận xóa nhân viên này ?")) {
                  (async () => {
                    try {
                      const token = localStorage.getItem("token");
                      const res = await employeeAPI.deleteStaff(
                        item.id_admin,
                        token
                      );
                      console.log(res);
                      if (res.data.status) {
                        SuccessToast("Xóa thành công");
                        dispatch(deleteAccount(item.id_admin));
                      } else {
                        ErrorToast(
                          "Xóa thất bại, nhân viên hiện tại không thể xóa"
                        );
                      }
                    } catch (error) {
                      ErrorToast(
                        "Xóa thất bại, nhân viên hiện tại không thể xóa"
                      );
                    }
                  })();
                }
              }}
              className="employee-delete-button"
            >
              <MdIcons.MdDeleteForever />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};
