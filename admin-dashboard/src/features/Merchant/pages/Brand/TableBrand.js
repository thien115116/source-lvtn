import { PaginationComponent } from "components/Paginate/Pagination";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function TableBrand(props) {
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const data = useSelector((state) => state.merchant.brand);
  const brandData = useMemo(() => {
    let sliceData = data;
    return sliceData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [data, currentPage]);
  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr className="font-weight-bold text-center">
            <td>#</td>
            <td>Tên</td>
            <td>Mã Số Thuế</td>
            <td>Số Lượng Cửa Hàng</td>
            <td>Hành Động</td>
          </tr>
        </thead>
        <tbody>
          {brandData &&
            brandData.map((item, index) => {
              return (
                <tr key={index} className="text-center">
                  <td style={{ lineHeight: "40px" }}>{index + 1}</td>
                  <td style={{ lineHeight: "40px" }}>{item.nameBrand}</td>
                  <td style={{ lineHeight: "40px" }}>{item.code}</td>
                  <td style={{ lineHeight: "40px" }}>{item.count}</td>
                  <td className="d-flex align-items-center justify-content-center">
                    <Link
                      to={`/merchant/${item.code}`}
                      style={{ color: "#fff" }}
                    >
                      {" "}
                      <button
                        style={{ margin: "unset" }}
                        type="btn"
                        className="btn btn-primary"
                      >
                        Chi Tiết
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {brandData && brandData.length === 0 ? (
        <>
          <div className="text-center bold">Hiện tại chưa thương hiệu nào</div>
        </>
      ) : (
        <>
          <PaginationComponent
            total={brandData.length}
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
}
export default TableBrand;
