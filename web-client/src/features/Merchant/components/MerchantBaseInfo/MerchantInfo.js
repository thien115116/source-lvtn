import React, { useEffect, useState } from "react";

import { sourceImg, defaultImg } from "service/_readSourceImg";
import * as FcIcons from "react-icons/fc";
import BusinessTime from "./BusinessTime";
import EditBusinessTime from "./EditBusinessTime";

function MerchantInfo({ data }) {
  const [edit, setEdit] = useState(true);
  useEffect(() => {
    (async () => {
      const a = document.getElementById("123");
      if (a) {
        a.firstChild.setAttribute("fill", "#13c2b4");
        a.lastChild.setAttribute("fill", "#fff");
      }
    })();
  }, []);

  return (
    <div className="row">
      <div
        className="col-12 d-flex justify-content-center pb-2"
        style={{ padding: "unset" }}
      >
        <div className="merchant-img-box">
          <img
            src={data.cover ? sourceImg(data.cover) : defaultImg()}
            alt="No img"
            className="merchant-img"
          />
        </div>
      </div>
      <div className="col-12  pb-2">
        <div className="d-flex justify-content-center align-items-center text-center">
          <FcIcons.FcApproval id="123" />
          <span
            style={{
              fontSize: 18,
              color: "#13c2b4",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginLeft: 5,
            }}
          >
            Đối tác Boo
          </span>
        </div>
      </div>
      <div className="col-12 pr-3 pl-3">
        <div className="merchant-title ">{data.name_merchant}</div>
        <div className="mt-3">
          <span style={{ fontWeight: "bold", fontSize: 18 }}>Địa chỉ:</span>{" "}
          {data.locations}
        </div>
        <div className="mt-2 mb-2">
          <span style={{ fontWeight: "bold", fontSize: 18 }}>
            Phone Number:
          </span>{" "}
          {data.phone ? data.phone : "Rỗng"}
        </div>

        <div className="divine mt-3">
          <div className="business-cube">
            <div className="cube">
              <div className="cube-face business-time">Mở / Đóng</div>
              <div
                onClick={() => setEdit(!edit)}
                className="cube-face business-time-edit"
              >
                Chỉnh Sửa
              </div>
            </div>
          </div>
          <div className="business-time-content pt-2">
            {edit ? <BusinessTime /> : <EditBusinessTime />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MerchantInfo;
