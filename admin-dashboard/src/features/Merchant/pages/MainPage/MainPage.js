import React from "react";
import TableMerchant from "features/Merchant/components/TableMerchant/TableMerchant";
import TableMerchantNotWork from "../MerchantNotWork/TableMerchantNotWork";

function MainPage() {
  return (
    <div className="row">
      <div className="col-12" style={{ padding: "unset" }}>
        <TableMerchant />
      </div>
      <div className="col-12" style={{ padding: "unset" }}>
        <hr />
        <div className="row">
          <div className="card-title col-6" style={{ padding: "unset" }}>
            <div>
              <span>Hàng Chờ</span>
              <span className="desc-title">
                Danh sách{" "}
                <span
                  style={{ fontSize: 16, textTransform: "uppercase" }}
                  className="bold"
                >
                  đối tác
                </span>{" "}
                đang được chờ phê duyệt trên hệ thống .
              </span>
            </div>
          </div>
          <div className="card-title col-6" style={{ padding: "unset" }}>
            <div>
              <span>Không Hoạt Động</span>
              <span className="desc-title">
                Danh sách{" "}
                <span
                  style={{ fontSize: 16, textTransform: "uppercase" }}
                  className="bold"
                >
                  đối tác
                </span>{" "}
                không hoạt động trên hệ thống .
              </span>
            </div>
            <TableMerchantNotWork />
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainPage;
