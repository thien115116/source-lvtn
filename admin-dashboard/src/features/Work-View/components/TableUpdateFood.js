import React, { useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import "features/Work-View/work.css";
import { sourceImgUpload } from "services/_readSourceImg";
import workAPI from "api/workviewAPI";
import Select from "react-select";
import { PaginationComponent } from "components/Paginate/Pagination";
import { formatDDmmYYYY } from "services/About_Date_And_Time/convertDate";

function TableUpdateFood() {
  const reqUpdate = useSelector((state) => state.work.reqUpdate);
  console.log(reqUpdate);
  const option = useSelector((state) => state.work.option);
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const dataReqUpdate = useMemo(() => {
    let sliceData = reqUpdate;

    return sliceData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [reqUpdate, currentPage]);
  return (
    <>
      <Table className="table-work" bordered hover variant="light">
        <thead className="thead-dark text-uppercase text-light bg-dark">
          <tr className="text-center bold">
            <td>#</td>
            <td>Nội Dung</td>
            <td>Phân Công</td>
            <td>Trạng Thái</td>
            <td>Ưu Tiên</td>
            <td>Ngày Tạo</td>
          </tr>
        </thead>
        <tbody>
          {dataReqUpdate &&
            dataReqUpdate.map((item, index) => {
              return (
                <TrData2
                  key={index}
                  option={option}
                  data={item}
                  index={index}
                />
              );
            })}
        </tbody>
      </Table>
      {reqUpdate && reqUpdate.length === 0 ? (
        <>
          <div className="text-center bold">
            Hiện tại chưa có request nào !!
          </div>
        </>
      ) : (
        <>
          <PaginationComponent
            total={reqUpdate.length}
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
const TrData2 = ({ data, index, option }) => {
  return (
    <tr>
      <td>
        {" "}
        <div className="d-flex justify-content-center align-items-center">
          {index}
        </div>
      </td>
      <td>
        <div className="d-flex justify-content-center align-items-center">
          <div
            className="label_merchant"
            style={{ width: 200, background: "rgb(93 135 160)" }}
          >
            Update Food
          </div>
        </div>
      </td>
      <td width="500">
        <Assignee option={option} data={data} />
      </td>
      <td>
        <div
          className={data.state === "New" ? "label_online" : "label_warning"}
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
      <td>
        <div className="d-flex justify-content-center align-items-center">
          {formatDDmmYYYY(data.createAt)},{" "}
          {new Date(data.createAt).toLocaleTimeString()}
        </div>{" "}
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
  console.log("Data -----------------------------", data);
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
        try {
          const token = localStorage.getItem("token");
          workAPI.assignUpdateFood(token, {
            id_request: data.id_request,
            id_admin: currentOption.value.id,
          });
        } catch (error) {
          console.log(error);
        }
      }}
    />
  );
};
export default TableUpdateFood;
