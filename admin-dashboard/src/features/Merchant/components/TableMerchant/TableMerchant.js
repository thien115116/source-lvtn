import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { PaginationComponent } from "components/Paginate/Pagination";
import Search from "./Search";
import { Link } from "react-router-dom";

function TableMerchant() {
  const list = useSelector((state) => state.merchant.list_Mer);
  const [search, setSearch] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [countData, setCountData] = useState(list.length);
  const ITEMS_PER_PAGE = 10;
  const dataMerChant = useMemo(() => {
    let sliceData = list;
    if (search) {
      let string = search.replace(/\s+/g, " ");
      sliceData = sliceData.filter((list) =>
        list.name_merchant.toLowerCase().includes(string.toLowerCase())
      );
      setCountData(sliceData.length);
      return sliceData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
    } else {
      setCountData(list.length);
      return sliceData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
    }
  }, [list, currentPage, search]);
  return (
    <div>
      <div className="pb-2">
        <Search
          onSearch={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
        />
      </div>
      <div className="text-center">
        <h3>Danh Sách Tổng</h3>
      </div>
      <table className="table table-striped ">
        <thead className="text-center bold">
          <tr className="text-center">
            <td>#</td>
            <td>Tên</td>
            <td>Địa Chỉ</td>
            <td>Kích Hoạt</td>
            <td>Thương Hiệu</td>
            <td>Chủ</td>
            <td>Ngày Tạo</td>
            <td>Chi Tiết</td>
          </tr>
        </thead>
        <tbody>
          {dataMerChant &&
            dataMerChant.map((item, index) => {
              return (
                <tr key={index} className="text-center">
                  <td>
                    #
                    {currentPage === 1
                      ? index + 1
                      : ITEMS_PER_PAGE * (currentPage - 1) + index + 1}
                  </td>
                  <td>{item.name_merchant}</td>
                  <td>{item.locations}</td>
                  <td>
                    {" "}
                    <div
                      className={
                        item.is_active === 1
                          ? "label_online"
                          : "label_non_online"
                      }
                    >
                      {item.is_active === 1 ? "Activated" : "Non Activated"}
                    </div>
                  </td>
                  <td>
                    {item.nameBrand ? item.nameBrand : "Không Có Thương Hiệu"}
                  </td>
                  <td>{item.author}</td>
                  <td> {new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/merchant/detail/${item.id_merchant}`}>
                      <button
                        style={{ margin: "unset" }}
                        type="button"
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
      <PaginationComponent
        total={countData}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
}
export default TableMerchant;
