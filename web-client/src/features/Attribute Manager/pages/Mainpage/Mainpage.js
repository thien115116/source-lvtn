import attributeAPI from "api/attributeAPI";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ErrorToast, SuccessToast, WarningToast } from "service/_ToastService";
import "react-toastify/dist/ReactToastify.css";
import { deleteAtt } from "features/Attribute Manager/attributeSlice";
import { PaginationComponent } from "components/Paginate/Pagination";
function MainPage() {
  const att = useSelector((state) => state.att.att);
  // console.log(att);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [countData, setCountData] = useState(att.length);
  const [search, setSearch] = useState(null);
  const ITEMS_PER_PAGE = 9;
  const dataMerChant = useMemo(() => {
    let sliceData = att;
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
      setCountData(att.length);
      return sliceData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
    }
  }, [att, currentPage, search]);
  return (
    <>
      <ToastContainer />
      <div className="row">
        <div className="col-12 food-header">
          <div className="pt-2">
            <Link to={`/merchant-attribute/add`}>
              <span className="food-add">Thêm Attribute +</span>
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

      {dataMerChant.length > 0 ? (
        <>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr className="font-weight-bold text-center">
                <td>#</td>
                <td>Mã Attribute</td>
                <td>Tên Attribute</td>
                <td>Nhóm</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {dataMerChant.map((item, index) => {
                return (
                  <tr className="text-center" key={index}>
                    <td>
                      {" "}
                      #
                      {currentPage === 1
                        ? index + 1
                        : ITEMS_PER_PAGE * (currentPage - 1) + index + 1}
                    </td>
                    <td>{item.id_attr}</td>
                    <td>{item.name}</td>
                    <td className="text-capitalize">{item.type}</td>
                    <td>
                      <div className="d-flex">
                        <button
                          style={{ width: "50%", marginRight: 10 }}
                          type="button"
                          className="btn btn-warning"
                          onClick={() => {
                            (async () => {
                              if (window.confirm("Chắc chắn muốn xóa ?")) {
                                try {
                                  const token = localStorage.getItem("token");
                                  const res = await attributeAPI.delete(
                                    item.id_attr,
                                    token
                                  );
                                  console.log(res);

                                  if (!res.data.status) {
                                    ErrorToast(res.data.message);
                                  } else {
                                    SuccessToast("Xóa thành công");
                                    dispatch(deleteAtt(item.id_attr));
                                  }
                                } catch (error) {
                                  ErrorToast("Lỗi Thêm");
                                }
                              } else {
                                WarningToast("Hủy Hành Động Xóa");
                              }
                            })();
                          }}
                        >
                          Xóa
                        </button>

                        <Link
                          style={{ color: "#fff", width: "50%" }}
                          to={`/merchant-attribute/edit/${item.id_attr}`}
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
              Cửa hàng của bạn chưa có Attributes nào, vui lòng đến tạo
              Attributes tại <span> </span>
              <Link
                style={{ fontWeight: "bold" }}
                to={`/merchant-attribute/add`}
              >
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
