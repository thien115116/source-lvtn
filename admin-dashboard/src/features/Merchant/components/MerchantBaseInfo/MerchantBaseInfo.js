import React, { useEffect } from "react";
import { defaultImg, sourceImg } from "services/_readSourceImg";
import * as FcIcons from "react-icons/fc";
function MerchantBaseInfo({ data }) {
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
    <div>
      <div
        className="_card-food d-flex justify-content-center align-items-center"
        style={{ minHeight: 378 }}
      >
        <div className="row">
          <div className="col-12 d-flex justify-content-center pb-2">
            <span
              style={{
                fontSize: 18,
                color: "#13c2b4",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              <FcIcons.FcApproval id="123" /> Đối tác Boo
            </span>
          </div>
          <div className="col-4">
            <div className="merchant-img-box">
              <img
                src={data.cover ? sourceImg(data.cover) : defaultImg()}
                alt="No img"
                className="merchant-img"
              />
            </div>
          </div>
          <div className="col-8">
            <div className="merchant-title ">{data.name_merchant}</div>
            <div className="merchant-heart">
              <FcIcons.FcLike />
              <FcIcons.FcLike />
              <FcIcons.FcLike />
              <FcIcons.FcLike />
              <FcIcons.FcLikePlaceholder />{" "}
              <span
                style={{
                  fontSize: 18,
                  color: "rgba(0,0,0,0.6)",
                  fontWeight: "bold",
                }}
              >
                100+ Đánh giá
              </span>
            </div>
            <div className="pt-3">
              <span style={{ fontWeight: "bold", fontSize: 18 }}>Địa chỉ:</span>{" "}
              {data.locations}
            </div>
            <div className="pt-3">
              <span style={{ fontWeight: "bold", fontSize: 18 }}>
                Giá trung bình:
              </span>{" "}
              {data.total
                ? new Intl.NumberFormat("it-IT", {
                    style: "currency",
                    currency: "VND",
                  }).format(data.total)
                : "Rỗng"}
            </div>
            <div className="pt-3 pb-3">
              <span style={{ fontWeight: "bold", fontSize: 18 }}>
                Phone Number:
              </span>{" "}
              {data.phone ? data.phone : "Rỗng"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

MerchantBaseInfo.propTypes = {};

export default MerchantBaseInfo;
