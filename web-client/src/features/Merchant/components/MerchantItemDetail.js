import merchantAPI from "api/merchantAPI";
import { useEffect, useState } from "react";
import * as AiIcons from "react-icons/ai";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import { priceWithDiscount } from "service/_checkDiscount";
import { sourceImg, sourceImgUpload } from "service/_readSourceImg";

export default function MerchantItemDetail() {
  const selected = useSelector((state) => state.merchant.current);

  const data = useSelector((state) => state.merchant.current_product);
  const [tag, setTag] = useState(null);
  console.log("DATA", data.length);
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await merchantAPI.getTagOfProduct(token, data.id_product);
        console.log("tagg", res.data);
        setTag(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [data.id_product]);
  return (
    <div className="row">
      <div className="col-5">
        <div className="product-main-img-box">
          <img
            className="product-main-img"
            src={data.list && sourceImg(data.list[0])}
            alt=""
          />
        </div>
        <div className="product-subs-img-box row">
          <div className="col-3">
            <img
              className="product-sub-img"
              src={data.list && sourceImg(data.list[0])}
              alt=""
            />
          </div>
          <div className="col-3">
            <img
              className="product-sub-img"
              src={data.list && sourceImg(data.list[0])}
              alt=""
            />
          </div>
          <div className="col-3">
            <img
              className="product-sub-img"
              src={data.list && sourceImg(data.list[0])}
              alt=""
            />
          </div>
          <div className="col-3">
            <img
              className="product-sub-img"
              src={data.list && sourceImg(data.list[0])}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="col-7">
        <div className="product-detail-title">{data.name_product}</div>
        <div className="product-star-rating">
          <AiIcons.AiFillStar />
          <AiIcons.AiFillStar />
          <AiIcons.AiFillStar />
          <AiIcons.AiFillStar />
          <AiIcons.AiFillStar />
        </div>
        <div className="product-price pt-2">
          <span
            style={{
              fontSize: 30,
              fontWeight: "bold",
              paddingRight: 10,
              color: "#2f4cdd",
            }}
          >
            {data.discount !== 0 &&
              new Intl.NumberFormat("it-IT", {
                style: "currency",
                currency: "VND",
              }).format(priceWithDiscount(data.discount, data.price))}
          </span>
          <span
            style={
              data.discount === 0
                ? {
                    textDecoration: "unset",
                    fontSize: 30,
                    fontWeight: "bold",
                    marginLeft: -10,
                    color: "#2f4cdd",
                  }
                : { textDecoration: "line-through" }
            }
          >
            {data.price
              ? new Intl.NumberFormat("it-IT", {
                  style: "currency",
                  currency: "VND",
                }).format(data.price)
              : "Rỗng"}{" "}
          </span>
          {data.discount !== 0 ? (
            <span className="pl-2">
              <span className="discount-product">- {data.discount} %</span>
            </span>
          ) : (
            <></>
          )}
        </div>
        <div className="product-brand pt-2">
          <span style={{ fontSize: 18, color: "#5e5e5e" }}>Brand : </span>
          {selected.nameBrand}
        </div>
        <div className="product-tag pt-3">
          <span style={{ fontSize: 18, color: "#5e5e5e" }}>
            Product Tags :{" "}
          </span>
          {tag &&
            tag.map((item, index) => (
              <span key={index} className="label_online mr-2">
                {item.tag_name}
              </span>
            ))}
        </div>
        <div className="pt-3" style={{ color: "#5e5e5e" }}>
          {data.dicriptions}
        </div>
      </div>
    </div>
  );
}
