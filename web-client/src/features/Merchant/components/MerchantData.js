import React from "react";
import { useSelector } from "react-redux";
import MerchantInfo from "./MerchantBaseInfo/MerchantInfo";

const MerchantData = () => {
  const data = useSelector((state) => state.merchant.current);
  return (
    data && (
      <div className="_card-food food-padding min-height">
        <div className="row">
          <div className="col-6" style={{ padding: "unset" }}>
            <MerchantInfo data={data} />
          </div>
          <div className="col-6 ">
            <div className="row">
              <div
                className="col-12 d-flex justify-content-center align-items-center"
                style={{ minHeight: 470 }}
              >
                Feature is upcoming soon !!
              </div>
              <div
                className="col-12 d-flex justify-content-center align-items-center"
                style={{ minHeight: 470 }}
              >
                Feature is upcoming soon !!
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

MerchantData.propTypes = {};

export default MerchantData;
