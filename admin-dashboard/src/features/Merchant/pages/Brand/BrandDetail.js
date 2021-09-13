import merchantAPI from "api/merchantAPI";
import { setBrandDetail } from "features/Merchant/merchantSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import TableBrandDetail from "./TableBrandDetail";
function BrandDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await merchantAPI.getBrandDetail(id, token);
        dispatch(setBrandDetail(res.data));
      } catch (error) {}
    })();
  }, [id, dispatch]);
  return (
    <>
      <div>
        <Link to="/merchant" style={{ fontSize: 18 }}>
          Merchant
        </Link>
        <span style={{ fontSize: 18 }}> / </span>
        <Link to="/merchant/brand" style={{ fontSize: 18 }}>
          Brand
        </Link>
        <span style={{ fontSize: 18 }}> / </span> Chi Tiết
      </div>
      <div>
        <Link to="/merchant/brand">Quay Lại</Link>
      </div>
      <div className="text-center pb-3">
        <h3>Các Cửa Hàng Của Thương Hiệu</h3>
      </div>
      <div>
        <TableBrandDetail id={id} />
      </div>
    </>
  );
}

export default BrandDetail;
