import merchantAPI from "api/merchantAPI";
import { useEffect, useState } from "react";

function TableMerchantNotWork() {
  const [merchantNotWork, setMerchantNotWork] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await merchantAPI.getMerchantNotWorking(token);
        setMerchantNotWork(res.data);
      } catch (error) {}
    })();
  }, []);
  return (
    <>
      <table className="table table-striped" style={{ minWidth: "unset" }}>
        <thead>
          <tr className="text-center font-weight-bold">
            <td>#</td>
            <td>Tên Cửa Hàng</td>
            <td>Gửi Email Cảnh Báo</td>
          </tr>
        </thead>
        <tbody>
          {merchantNotWork &&
            merchantNotWork.map((item, index) => {
              return (
                <tr key={index} className="text-center">
                  <td>{index + 1}</td>
                  <td>{item.name_merchant}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning"
                      style={{ marginTop: "unset" }}
                    >
                      Gửi
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
export default TableMerchantNotWork;
