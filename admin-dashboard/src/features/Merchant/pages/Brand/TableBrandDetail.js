import merchantAPI from "api/merchantAPI";
import {
  decreaseMerchantCount,
  deleteMerchantFromBrand,
} from "features/Merchant/merchantSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorToast, SuccessToast, WarningToast } from "services/_ToastService";
function TableBrandDetail({ id }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.merchant.brandDetail);
  return (
    <>
      <ToastContainer />
      <table className="table table-striped">
        <thead>
          <tr className="text-center">
            <td>#</td>
            <td>Tên Cửa Hàng</td>
            <td>Hành Động</td>
          </tr>
        </thead>
        <tbody>
          {state &&
            state.map((item, index) => {
              return (
                <tr className="text-center" key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name_merchant}</td>
                  <td>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            `Chắc chắn xóa cửa hàng ${item.name_merchant} khỏi thương hiệu này ?`
                          )
                        ) {
                          (async () => {
                            try {
                              const token = localStorage.getItem("token");
                              const res =
                                await merchantAPI.deleteMerchantFromBrand(
                                  item.id_merchant,
                                  token
                                );
                              if (res.data.status) {
                                SuccessToast("Xóa thành công");
                                dispatch(
                                  deleteMerchantFromBrand(item.id_merchant)
                                );
                                dispatch(decreaseMerchantCount(id));
                              } else {
                                ErrorToast("Xóa thất bại");
                              }
                            } catch (error) {}
                          })();
                        } else {
                          WarningToast("Hủy thao tác");
                        }
                      }}
                      style={{ marginTop: "unset" }}
                      type="button"
                      className="btn btn-warning"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
export default TableBrandDetail;
