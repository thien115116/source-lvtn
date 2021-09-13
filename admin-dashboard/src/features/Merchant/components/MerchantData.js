import React from "react";
import MerchantListFood from "./MerchantListItem";
import { useSelector } from "react-redux";
import { LineChart } from "components/Chart/LineChart/LineChart";
import MerchantBaseInfo from "./MerchantBaseInfo/MerchantBaseInfo";
import MerchantItemDetail from "./MerchantItemDetail";
const MerchantData = () => {
  const data = useSelector((state) => state.merchant.current);
  return (
    data && (
      <>
        <div className="row">
          <div className="col-6">
            <div className="_card-food">
              <LineChart />
            </div>
          </div>
          <div className="col-6" style={{ position: "relative" }}>
            <div style={{ position: "absolute", bottom: 0 }}>
              <MerchantBaseInfo data={data} />
            </div>
          </div>

          <div className="col-5 pt-4">
            <div className="_card-food">
              <MerchantListFood product={data.products} />
            </div>
          </div>
          <div className="col-7 pt-4">
            <div
              className="_card-food"
              style={{ paddingBottom: 30, minHeight: 500 }}
            >
              {/* {current_product.length > 0 ||
                (current_product.id_product && <MerchantItemDetail />)} */}
              <MerchantItemDetail />
            </div>
          </div>
        </div>
      </>
    )
  );
};

MerchantData.propTypes = {};

export default MerchantData;
