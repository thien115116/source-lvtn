import { PaginationComponent } from "components/Paginate/Pagination";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { formatDDmmYYYY } from "service/About_Date_And_Time/convertDate";
function TableOrder() {
  const order_list = useSelector((state) => state.order.order);
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const dataSlice = useMemo(() => {
    let sliceData = order_list.slice().reverse();
    return sliceData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [order_list, currentPage]);
  return (
    <>
      {dataSlice.length > 0 ? (
        <>
          <table className="table table-striped">
            <thead>
              <tr className="text-center font-weight-bold">
                <td>Thời gian tạo đơn hàng</td>
                <td>Mã đơn hàng</td>
                <td>Số tiền (vnđ)</td>
              </tr>
            </thead>
            <tbody>
              {dataSlice.map((item, index) => {
                return (
                  <tr className="text-center" key={index}>
                    <td className="font-weight-bold">
                      {formatDDmmYYYY(item.createAt)},{" "}
                      {new Date(item.createAt).toLocaleTimeString()}
                    </td>
                    <td>{item.id_oder}</td>
                    <td>
                      {new Intl.NumberFormat("it-IT", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.profit)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pb-1">
            <PaginationComponent
              total={order_list.length}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={(page) => {
                setCurrentPage(page);
              }}
            />
          </div>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-center align-items-center pt-2">
            <span className="font-weight-bold">
              Không có đơn đặt hàng nào trong khoảng thời gian bạn chọn.
            </span>
          </div>
        </>
      )}
    </>
  );
}
export default TableOrder;
