import { defaultImg, sourceImg } from "services/_readSourceImg";
import "./../components/CreateFood/CreateFood.css";
const MerchantCard = (props) => {
  let data = props.data;
  function checkType(type) {
    if (type === 1) {
      return "Đồ Ăn";
    } else if (type === 2) {
      return "Thức Uống";
    } else if (type === 3) {
      return "Tổng Hợp";
    }
    return "";
  }
  return (
    <>
      <div className="item-info">
        <img src={data.img ? sourceImg(data.img) : defaultImg()} alt="Rỗng" />
        <div className="item-name">
          <div className="product-name">{data.name_merchant}</div>
          <div className="text-second">{checkType(data.type_business)}</div>
        </div>
      </div>
      <div className="item-sale-info ">
        <div className="text-second">Giá trung bình</div>
        <div className="product-sales">
          {data.TotalPrice
            ? new Intl.NumberFormat("it-IT", {
                style: "currency",
                currency: "VND",
              }).format(data.TotalPrice)
            : "Rỗng"}
        </div>
      </div>
    </>
  );
};

export const TopMerchantField = (props) => {
  let data = props.data;
  return (
    <div className="box-body">
      <ul className="product-list">
        {typeof data !== "undefined" &&
          data.map((item, index) => {
            return item.TotalPrice > 0 ? (
              <li className="product-list-item" key={index}>
                <MerchantCard data={item} />
              </li>
            ) : (
              <></>
            );
          })}
      </ul>
    </div>
  );
};
