import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import { sourceImgUpload } from "services/_readSourceImg";
import { useState, useMemo } from "react";
import Popup from "reactjs-popup";
import "./Banner.css";
import "reactjs-popup/dist/index.css";
import { PaginationComponent } from "components/Paginate/Pagination";
import "react-dates/lib/css/_datepicker.css";
import "./Banner.css";
import { UpdateBanner } from "./UpdateBanner";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import bannerAPI from "api/bannerAPI";

import { deleteBanner } from "../bannerSlice";
import { ErrorToast, SuccessToast, WarningToast } from "services/_ToastService";

const BannerTable = () => {
  const listBanner = useSelector((state) => state.banner.list);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const [sortState, setSortState] = useState(false);
  const dataBanner = useMemo(() => {
    let sliceData = listBanner;

    if (sortState) {
      sliceData = [...sliceData].sort(
        (a, b) => (a.state === 1) - (b.state === 1)
      );
    } else {
      sliceData = [...sliceData].sort(
        (a, b) => (a.state === 0) - (b.state === 0)
      );
    }

    return sliceData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [listBanner, currentPage, sortState]);
  const headers = [
    { name: "Mã Banner", field: "Mã Banner", sortable: false },
    { name: "Hình Ảnh", field: "Hình Ảnh", sortable: false },
    { name: "Ngày tạo", field: "Ngày tạo", sortable: false },
    { name: "Ngày Mở", field: "Ngày Mở", sortable: false },
    { name: "Ngày đóng", field: "Ngày đóng", sortable: false },
    { name: "Trạng thái", field: "Trạng thái", sortable: true },
    { name: "Link bài blog", field: "Link bài blog", sortable: false },
    { name: "Action", field: "Action", sortable: false },
  ];
  const changeSortState = (value) => {
    setSortState(!sortState);
  };

  return (
    <>
      <div className="table-card">
        <div className="card-title">
          <span>Danh sách banner</span>
          <span className="desc-title">
            Danh sách các{" "}
            <span
              style={{
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: 16,
              }}
            >
              banner
            </span>{" "}
            đang{" "}
            <span
              style={{
                textTransform: "uppercase",
                fontSize: 16,
                color: "#d4ac2a",
              }}
            >
              pending
            </span>{" "}
            hoặc đang{" "}
            <span
              style={{
                textTransform: "uppercase",
                fontSize: 16,
                color: "green",
              }}
            >
              active .
            </span>
          </span>
        </div>
        <table className="table table-hover">
          <BannerTableHeader sortState={changeSortState} data={headers} />
          <tbody>
            {dataBanner.map((item, index) => (
              <tr key={index}>
                <td>{item.id_banner}</td>
                <td>
                  <Popup
                    modal
                    closeOnDocumentClick
                    nested
                    trigger={
                      <img
                        src={sourceImgUpload(item.url_image)}
                        className="banner_review_img"
                        alt=""
                      />
                    }
                  >
                    <div>
                      <h2>Review Image</h2>
                      <img src={sourceImgUpload(item.url_image)} alt="" />
                    </div>
                  </Popup>
                </td>
                <td>{new Date(item.created_date).toLocaleDateString()}</td>
                <td>{new Date(item.public_date).toLocaleDateString()}</td>
                <td>{new Date(item.disable_date).toLocaleDateString()}</td>
                <td>
                  <div
                    className={item.state === 0 ? "dot-pending" : "dot-active"}
                  ></div>
                  {item.state === 0 ? "Pending" : "Active"}
                </td>
                <td>{item.url_blog}null</td>
                <td>
                  <Popup
                    modal
                    nested
                    trigger={
                      <div className="banner_action_icon">
                        <BsIcons.BsGear />
                      </div>
                    }
                  >
                    <UpdateBanner data={item} />
                  </Popup>

                  <div
                    onClick={() => {
                      if (
                        window.confirm(
                          "Bạn Có Chắc Chắn Muốn Hủy Kích Hoạt Banner Này ?"
                        )
                      ) {
                        (async () => {
                          try {
                            const token = localStorage.getItem("token");
                            await bannerAPI.delBanner(token, {
                              id: item.id_banner,
                            });
                            dispatch(deleteBanner(item.id_banner));
                            SuccessToast("Hủy Kích Hoạt Thành Công !");
                          } catch (error) {
                            ErrorToast("Hủy Kích Hoạt Thất Bại");
                          }
                        })();
                      } else {
                        WarningToast("Hủy thao tác !");
                      }
                    }}
                    className="banner_action_icon"
                  >
                    <MdIcons.MdDeleteForever />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {listBanner && listBanner.length === 0 ? (
          <div
            className="text-center bold"
            style={{ display: "block", textAlign: "center" }}
          >
            Hiện tại chưa có banner nào !!
          </div>
        ) : (
          <PaginationComponent
            total={listBanner.length}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
          />
        )}
      </div>

      <ToastContainer />
    </>
  );
};
const BannerTableHeader = (props) => {
  let header = props.data;
  return (
    <thead>
      <tr style={{ textTransform: "capitalize", fontWeight: "bold" }}>
        {header.map((item, index, sortable) => {
          return (
            <th
              onClick={() => (item.sortable ? props.sortState(!sortable) : "")}
              key={index}
              style={item.sortable ? { cursor: "pointer" } : {}}
            >
              {item.name}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default BannerTable;
