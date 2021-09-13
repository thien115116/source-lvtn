import merchantAPI from "api/merchantAPI";
import { setReqFromMerchant } from "features/Merchant/merchantSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import Merchant from "../MerchantDetail";

export const RequestTable = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.merchant.list_req);
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await merchantAPI.getReqFromMerchant(token);
        dispatch(setReqFromMerchant(res.data));
        console.log(res);
      } catch (error) {}
    })();
  }, [dispatch]);

  return (
    <>
      <TableData id={props.id} reqData={data} />
    </>
  );
};
const TableData = (props) => {
  let data = props.reqData;
  return (
    <table className="table">
      <thead className="thead-dark">
        <tr className="bold">
          <td className="text-center">Mã Cửa Hàng</td>
          <td className="text-center">Ghi Chú</td>
          <td className="text-center">Hành động</td>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((item, index) => {
            return (
              <tr key={index}>
                <td className="text-center">{item.id_merchant}</td>
                <td className="text-center">{item.note}</td>
                <td className="d-flex justify-content-center ">
                  <div className="col-4 d-flex justify-content-center">
                    <Popup
                      modal
                      trigger={
                        <button
                          type="button"
                          className="btn btn-secondary d-inline-block"
                        >
                          Chi tiết cửa hàng
                        </button>
                      }
                    >
                      <Merchant id={item.id_merchant} />
                    </Popup>
                  </div>
                  <div className="col-4 d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-primary d-inline-block"
                      onClick={() => {
                        props.id(item.id_merchant);
                      }}
                    >
                      Đồng ý
                    </button>
                  </div>
                  <div className="col-4 d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-warning d-inline-block"
                    >
                      Từ chối
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
