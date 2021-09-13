import menuAPI from "api/menuAPI";
import { PaginationComponent } from "components/Paginate/Pagination";
import { deleteMenu } from "features/Menu/menuSlice";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorToast, SuccessToast } from "service/_ToastService";
function MainPage() {
  const menu = useSelector((state) => state.menu.menu);
  const dispatch = useDispatch();
  const [search, setSearch] = useState(null);
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const data = useMemo(() => {
    let dataSlice = menu;
    if (search) {
      let string = search.trim().replace(/\s+/g, " ");
      dataSlice = dataSlice.filter(
        (list) =>
          list.name_menu.toLowerCase().indexOf(string.toLowerCase()) > -1
      );
      return dataSlice.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
    } else {
      return dataSlice.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
    }
  }, [menu, search, currentPage]);
  return (
    <>
      <div className="food-title text-center" style={{ fontSize: 35 }}>
        Danh Sách Thực Đơn
      </div>
      <ToastContainer />
      <div className="row">
        <div className="col-12 food-header">
          <div className="pt-2">
            <Link to={`/menu/add`}>
              <span className="food-add">Thêm thực đơn +</span>
            </Link>
          </div>
          <div className="d-flex flex-row-reverse pb-2">
            <div className="form-field">
              <input
                type="text"
                name="search"
                placeholder=" "
                className="form-input"
                onChange={(e) => setSearch(e.target.value)}
              />
              <label className="form-label-focus">Tìm Kiếm</label>
            </div>
          </div>
        </div>
      </div>
      {data.length > 0 ? (
        <>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr className="font-weight-bold text-center">
                <td>#</td>
                <td>Tên Menu</td>
                <td>Số Lượng Món</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr className="text-center" key={index}>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        (window.location.href = `/menu/edit/${item.id_menu}`)
                      }
                    >
                      #
                      {currentPage === 1
                        ? index + 1
                        : ITEMS_PER_PAGE * (currentPage - 1) + index + 1}
                    </td>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        (window.location.href = `/menu/edit/${item.id_menu}`)
                      }
                    >
                      {item.name_menu}
                    </td>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        (window.location.href = `/menu/edit/${item.id_menu}`)
                      }
                    >
                      {item.quantity}
                    </td>
                    <td>
                      <div className="d-flex">
                        <Link
                          style={{ color: "#fff", width: "50%" }}
                          to={`/menu/${item.id_menu}`}
                        >
                          <button
                            style={{ width: "100%" }}
                            type="button"
                            className="btn btn-info"
                          >
                            Sửa Thông Tin
                          </button>
                        </Link>
                        <button
                          style={{ width: "50%", marginLeft: 10 }}
                          type="button"
                          className="btn btn-warning"
                          onClick={() => {
                            console.log(item.id_menu);
                            try {
                              (async () => {
                                if (
                                  window.confirm(
                                    "Bạn chắc chắn muốn xóa thực đơn này, lưu ý thực đơn cần được làm rỗng trước khi xóa"
                                  )
                                ) {
                                  const token = localStorage.getItem("token");
                                  const res = await menuAPI.deleteMenu(
                                    token,
                                    item.id_menu
                                  );
                                  if (res.data.status) {
                                    SuccessToast("Xóa thành công");
                                    dispatch(deleteMenu(item.id_menu));
                                  } else {
                                    ErrorToast("Có lỗi trong việc xóa");
                                  }
                                }
                              })();
                            } catch (error) {}
                          }}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <PaginationComponent
            total={menu.length}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
          />
        </>
      ) : (
        <>
          <div className="d-flex justify-content-center align-items-center pt-2">
            <span>
              Cửa hàng của bạn chưa có menu nào, vui lòng đến tạo menu tại{" "}
              <span> </span>
              <Link style={{ fontWeight: "bold" }} to={`/menu/add`}>
                đây.
              </Link>
            </span>
          </div>
        </>
      )}
    </>
  );
}
export default MainPage;
