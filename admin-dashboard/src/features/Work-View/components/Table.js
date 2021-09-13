import React, { useEffect, useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "features/Work-View/work.css";
import { sourceImgUpload } from "services/_readSourceImg";
import workAPI from "api/workviewAPI";
import Select from "react-select";
import { empty, setOption } from "../workSlice";
import { PaginationComponent } from "components/Paginate/Pagination";
import { formatDDmmYYYY } from "services/About_Date_And_Time/convertDate";
function TableWork(props) {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.work.reqList);
  const option = useSelector((state) => state.work.option);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  useEffect(() => {
    (async () => {
      try {
        dispatch(empty());
        const token = localStorage.getItem("token");
        const res = await workAPI.getAllAdminIMG(token);
        console.log(res);
        dispatch(setOption(res.data));
      } catch (error) {}
    })();
  }, [dispatch]);
  const dataReq = useMemo(() => {
    let sliceData = list;

    return sliceData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [list, currentPage]);
  return (
    <>
      <Table className="table-work" bordered hover variant="light">
        <thead className="thead-dark text-uppercase text-light bg-dark">
          <tr className="text-center bold">
            <td>#</td>
            <td>Người Gửi</td>
            <td>Nội Dung</td>
            <td>Phân Công</td>
            <td>Trạng Thái</td>
            <td>Ưu Tiên</td>
            <td>Ngày Tạo</td>
          </tr>
        </thead>
        <tbody>
          {dataReq &&
            dataReq.map((item, index) => {
              return (
                <TrData key={index} option={option} data={item} index={index} />
              );
            })}
        </tbody>
      </Table>
      {dataReq && dataReq.length === 0 ? (
        <>
          <div className="text-center bold">
            Hiện tại chưa có request nào !!
          </div>
        </>
      ) : (
        <>
          <PaginationComponent
            total={list.length}
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
const TrData = ({ data, index, option }) => {
  return (
    <tr>
      <td>{index}</td>
      <td>
        {data.name_type ? (
          <div className="d-flex justify-content-center align-items-center">
            <div className="label_merchant">{data.name_type}</div>
          </div>
        ) : (
          "Rỗng"
        )}
      </td>
      <td className="text-center">
        {data.content ? (
          <div>
            <div>{data.content}</div>
          </div>
        ) : (
          "Rỗng"
        )}
      </td>
      <td width="500">
        <Assignee option={option} data={data} />
      </td>
      <td>
        <div
          className={
            data.state === "New"
              ? "label_online"
              : data.state === "Doing"
              ? "label_doing"
              : "label_warning"
          }
        >
          {data.state}
        </div>
      </td>
      <td>
        <div
          className={
            data.priority === "ASAP"
              ? "label_ASAP"
              : data.priority === "Hight"
              ? "label_warning"
              : "label_online"
          }
        >
          {data.priority}
        </div>
      </td>
      <td className="text-center">
        {formatDDmmYYYY(data.createAt)},{" "}
        {new Date(data.createAt).toLocaleTimeString()}
      </td>
    </tr>
  );
};
const Assignee = ({ data, option }) => {
  const [src, setSrc] = useState(null);
  const [name, setName] = useState(null);
  return (
    <>
      <div className="row">
        <div className="col-6">
          <div className="work-image-box-1">
            <div className="work-image-box-2 work-img-admin">
              <img
                className="work-img-inner"
                src={sourceImgUpload(src)}
                alt="Không có Ảnh"
              />
            </div>
            <div className="work-name-admin text-center">
              <span style={{ fontSize: 16, fontWeight: "bold" }}>{name}</span>
            </div>
          </div>
        </div>
        <div className="col-6">
          <SingleSelect
            data={data}
            src={setSrc}
            name={setName}
            option={option}
          />
        </div>
      </div>
    </>
  );
};
const SingleSelect = ({ data, option, src, name }) => {
  const [currentOption, setCurrentOption] = useState();
  const defaultValue =
    option && option.filter((ele) => data.id_admin === ele.value.id);
  console.log(defaultValue);
  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      defaultValue={defaultValue}
      isDisabled={false}
      isLoading={false}
      isClearable={true}
      isRtl={false}
      isSearchable={false}
      name="admin"
      options={option}
      getOptionValue={(option) => {
        src(option.value.url_img);
        name(option.label);
        setCurrentOption(option);
      }}
      onInputChange={() => {
        const token = localStorage.getItem("token");
        const res = workAPI.assignForStaff(token, {
          id_request: data.id_request,
          id_admin: currentOption.value.id,
        });
        console.log(res.data);
      }}
    />
  );
};
export default TableWork;
