import React from "react";
import { useSelector } from "react-redux";

function TableTime() {
  const data = useSelector((state) => state.merchant.openTime);
  console.log(data);
  return (
    <table className="mt-3 table " style={{ minWidth: "unset" }}>
      <thead>
        <tr className="text-center font-weight-bold">
          <td>Thứ</td>
          <td>Thời gian</td>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((item, index) => {
            return (
              <tr className="m-2 text-center" key="index">
                <td>
                  <span
                    className={
                      item.isOpenDay ? "label_online" : "label_offline"
                    }
                  >
                    {" "}
                    {item.dayIndex === 1
                      ? "Chủ nhật"
                      : "Thứ " + item.dayIndex}{" "}
                    ({item.dayOfWeek})
                  </span>
                </td>
                <td>
                  <span
                    style={{ fontWeight: "bold", textTransform: "uppercase" }}
                  >
                    {item.from}
                  </span>{" "}
                  :{" "}
                  <span
                    style={{ fontWeight: "bold", textTransform: "uppercase" }}
                  >
                    {item.to}
                  </span>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default TableTime;
