import TableWork from "features/Work-View/components/Table";
import TableUpdateFood from "features/Work-View/components/TableUpdateFood";
import React from "react";

function WorkView(props) {
  return (
    <div className="_card-food table-card">
      <div className="card-title">
        <span>Yêu cầu mở cửa hàng và tạo món</span>
        <span className="desc-title">
          Công việc mặc định được giao cho bạn vui lòng lựa chọn nhân viên để
          phân công công việc cho họ.
        </span>
      </div>
      <TableWork />
      <hr />
      <div className="card-title">
        <span>Yêu cầu xác nhận cập nhật thông tin món ăn</span>
        <span className="desc-title">
          Lựa chọn nhân viên để phân công công việc cập nhật thông tin món ăn.
        </span>
      </div>
      <TableUpdateFood />
    </div>
  );
}

WorkView.propTypes = {};

export default WorkView;
