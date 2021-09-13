import merchantAPI from "api/merchantAPI";
import { setSelectedProduct } from "features/Merchant/merchantSlice";
import { useEffect, useState } from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { priceWithDiscount } from "service/_checkDiscount";
import { sourceImg } from "service/_readSourceImg";
import "../../assets/css/food.css";
export default function MerchantItemDetail() {
  const selected = useSelector((state) => state.merchant.current);
  const data = useSelector((state) => state.merchant.current_product);
  const nextId = useSelector((state) => state.merchant.nextId);
  const prevId = useSelector((state) => state.merchant.prevId);
  const length = useSelector((state) => state.merchant.length);
  const index = useSelector((state) => state.merchant.index);
  const [tag, setTag] = useState([]);
  let { id_product } = useParams();
  const dispatch = useDispatch();
  console.log(tag);
  useEffect(() => {
    (async () => {
      try {
        let data = await selected.products.filter(
          (item) => item.id_product === id_product
        );
        dispatch(setSelectedProduct(data[0]));
      } catch (error) {}
    })();
  }, [selected.products, id_product, dispatch]);
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await merchantAPI.getTagOfProduct(token, id_product);
        setTag(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id_product]);
  return (
    <div
      className="_card-food "
      style={{
        position: "relative",
        width: 1180,
        height: 650,
        margin: "auto",
      }}
    >
      <div className="row">
        <div style={{ position: "absolute", left: 0, top: 0 }}>
          <a href="/food" style={{ textDecoration: "none" }}>
            <div className="return-effect">
              <span className="effect-2 pr-1">
                <AiIcons.AiOutlineArrowLeft />
              </span>
              Quay lại
            </div>
          </a>
        </div>
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <a
            href={`/food-update/${data.id_product}`}
            style={{ textDecoration: "none" }}
          >
            <div className="update-effect">
              Cập Nhật Thông Tin
              <span className="pl-1 effect-2">
                <AiIcons.AiOutlineArrowRight />
              </span>
            </div>
          </a>
        </div>
        <div className="col-6" style={{ marginTop: 40 }}>
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
        <div className="col-6" style={{ marginTop: 40 }}>
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
              <span style={{ fontSize: 18, color: "#5e5e5e" }}>Giá : </span>
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
            <span
              style={{ fontSize: 18, color: "#5e5e5e", fontWeight: "bold" }}
            >
              Thương Hiệu :{" "}
            </span>
            {selected.nameBrand}
          </div>
          <div className="product-tag pt-3">
            <span
              style={{ fontSize: 18, color: "#5e5e5e", fontWeight: "bold" }}
            >
              Nhãn của món :{" "}
            </span>
            {tag.length > 0 ? (
              tag.map((item, index) => (
                <span key={index} className="label_online mr-2">
                  {item.tag_name}
                </span>
              ))
            ) : (
              <span style={{ fontWeight: 700 }}>Không Có Nhãn</span>
            )}
          </div>
          <div className="pt-3" style={{ color: "#5e5e5e" }}>
            <span
              style={{ fontSize: 18, color: "#5e5e5e", fontWeight: "bold" }}
            >
              Mô Tả :{" "}
            </span>
            {data.dicriptions}
          </div>
        </div>
        <div className="left-right">
          <div className="row" style={{ padding: "unset" }}>
            <div
              className="col-6  d-flex flex-row"
              style={{
                marginBottom: "unset",
                maxHeight: 50,
                paddingLeft: "unset",
              }}
            >
              <Prev length={length} index={index} prevId={prevId} />
            </div>
            <div
              className="col-6 d-flex flex-row-reverse "
              style={{
                marginBottom: "unset",
                maxHeight: 50,
                paddingRight: "unset",
              }}
            >
              <Next length={length} index={index} nextId={nextId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const Prev = ({ prevId, length, index }) => {
  return (
    <a
      className={index === 0 || length === 1 ? "disable" : ""}
      href={`/food/${prevId}`}
    >
      <span
        className={index !== null && index === 0 ? "a1 disable" : "a1"}
        style={{ fontSize: 40 }}
      >
        <IoIcons.IoMdArrowDropleft />
        <span style={{ fontSize: 25 }}>Trước</span>
      </span>
    </a>
  );
};
const Next = ({ nextId, length, index }) => {
  return (
    <a
      className={index === length - 1 || length === 1 ? "disable" : ""}
      href={`/food/${nextId}`}
    >
      <span className="a1" style={{ fontSize: 40 }}>
        <span style={{ fontSize: 25 }}>Sau</span>
        <IoIcons.IoMdArrowDropright />
      </span>
    </a>
  );
};
