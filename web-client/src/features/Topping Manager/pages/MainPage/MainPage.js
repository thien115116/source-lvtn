import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ErrorToast, SuccessToast, WarningToast } from "service/_ToastService";
import "react-toastify/dist/ReactToastify.css";
import { PaginationComponent } from "components/Paginate/Pagination";
import { deleteTopping } from "features/Topping Manager/toppingSlice";
import toppingAPI from "api/toppingAPI";
function MainPage() {
  const topping = useSelector((state) => state.topping.topping);
  // console.log(att);
  const dispatch = useDispatch();

  const [countData, setCountData] = useState(topping.length);
  const [search, setSearch] = useState(null);
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const dataTopping = useMemo(() => {
    let sliceData = topping;
    if (search) {
      let string = search.trim().replace(/\s+/g, " ");
      console.log(string);
      sliceData = sliceData.filter(
        (list) => list.name.toLowerCase().indexOf(string.toLowerCase()) > -1
      );
      setCountData(sliceData.length);
      return sliceData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
    } else {
      setCountData(topping.length);
      return sliceData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
    }
  }, [topping, currentPage, search]);
  return (
    <>
      <ToastContainer />
      <div className="row">
        <div className="col-12 food-header">
          <div className="pt-2">
            <Link to={`/merchant-topping/add`}>
              <span className="food-add">Thêm Món Ăn Kèm +</span>
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
      {dataTopping.length > 0 ? (
        <>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr className="font-weight-bold text-center">
                <td>#</td>
                <td>Mã Món Ăn Kèm</td>
                <td>Tên Món Ăn Kèm</td>
                <td>Giá</td>
                <td>Enable</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {dataTopping.map((item, index) => {
                return (
                  <tr className="text-center" key={index}>
                    <td>
                      {" "}
                      #
                      {currentPage === 1
                        ? index + 1
                        : ITEMS_PER_PAGE * (currentPage - 1) + index + 1}
                    </td>
                    <td>{item.id_topping}</td>
                    <td>{item.name}</td>
                    <td>
                      {new Intl.NumberFormat("it-IT", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.price)}
                    </td>
                    <td>{item.is_enable > 0 ? "Enable" : "Disable"}</td>
                    <td>
                      <div className="d-flex">
                        <button
                          style={{ width: "50%", marginRight: 10 }}
                          type="button"
                          className="btn btn-warning"
                          onClick={() => {
                            if (
                              window.confirm(
                                `Xác nhận xóa topping "${item.name}"`
                              )
                            ) {
                              (async () => {
                                try {
                                  const token = localStorage.getItem("token");
                                  const res = await toppingAPI.delete(
                                    item.id_topping,
                                    token
                                  );
                                  console.log(res);
                                  SuccessToast("Xóa thành công");
                                  dispatch(deleteTopping(item.id_topping));
                                } catch (error) {
                                  ErrorToast("Không xóa được");
                                }
                              })();
                            } else {
                              WarningToast("Hủy xóa thành công !!");
                            }
                          }}
                        >
                          Xóa
                        </button>

                        <Link
                          style={{ color: "#fff", width: "50%" }}
                          to={`/merchant-topping/edit/${item.id_topping}`}
                        >
                          <button
                            style={{ width: "100%" }}
                            type="button"
                            className="btn btn-info"
                          >
                            Sửa
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <PaginationComponent
            total={countData}
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
              Cửa hàng của bạn chưa có món ăn kèm nào, vui lòng đến tạo món ăn
              kèm tại <span> </span>
              <Link style={{ fontWeight: "bold" }} to={`/merchant-topping/add`}>
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
