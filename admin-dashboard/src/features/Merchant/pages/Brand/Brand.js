import React from "react";
import { Link } from "react-router-dom";
import TableBrand from "features/Merchant/pages/Brand/TableBrand";
function Brand() {
  return (
    <div>
      <Link to="/merchant" style={{ fontSize: 18 }}>
        Merchant
      </Link>
      <span style={{ fontSize: 18 }}> / </span>
      Brand
      <div>
        <Link to="/merchant">Quay Lại</Link>
      </div>
      <div className="text-center pb-3">
        <h3>Danh Sách Thương Hiệu</h3>
      </div>
      <TableBrand />
    </div>
  );
}
export default Brand;
