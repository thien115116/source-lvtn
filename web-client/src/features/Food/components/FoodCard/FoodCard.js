import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import Popup from "reactjs-popup";
import { sourceImg, sourceImgUpload } from "service/_readSourceImg";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import { priceWithDiscount } from "service/_checkDiscount";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  setSelectedProduct,
} from "features/Merchant/merchantSlice";
import foodAPI from "api/foodAPI";
import { ErrorToast, SuccessToast, WarningToast } from "service/_ToastService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function FoodCard({ data, index }) {
  const dispatch = useDispatch();
  const [able, setAble] = useState(false);
  const [word, setWord] = useState(null);
  return (
    <div>
      <ToastContainer />
      <Card className="card-food" style={{ position: "relative" }}>
        {data.discount !== 0 && (
          <img
            className="promo_img"
            width="150"
            height="100"
            src={sourceImgUpload("promo_contrian.png")}
            alt=""
          />
        )}
        <a href={`/food/${data.id_product}`} target="_self">
          <CardImg
            onClick={() => {
              dispatch(setSelectedProduct(data));
            }}
            top
            width="100%"
            src={sourceImg(data.img)}
            alt="Card image cap"
            className="img"
          />
        </a>
        <CardBody>
          <a href={`/food/${data.id_product}`} target="_self">
            <CardTitle
              onClick={() => {
                dispatch(setSelectedProduct(data));
              }}
              className="text-clame-1"
              style={{ color: "black" }}
              tag="h5"
            >
              {data.name_product}
            </CardTitle>

            <CardSubtitle
              onClick={() => {
                dispatch(setSelectedProduct(data));
              }}
              style={{ textTransform: "capitalize" }}
              tag="h6"
              className="mb-2 text-muted"
            >
              {data.type_food}
            </CardSubtitle>
            <CardText style={{ marginBottom: 10, color: "#fdd940" }}>
              <AiIcons.AiFillStar />
              <AiIcons.AiFillStar />
              <AiIcons.AiFillStar />
              <AiIcons.AiFillStar />
              <AiIcons.AiFillStar />
            </CardText>
            <CardText
              onClick={() => {
                dispatch(setSelectedProduct(data));
              }}
            >
              <div className="product-price pt-2">
                <span
                  style={{
                    fontSize: 20,
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
                          fontSize: 20,
                          fontWeight: "bold",
                          marginLeft: -10,
                          color: "black",
                        }
                      : { textDecoration: "line-through", color: "black" }
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
                    <span className="discount-product">
                      - {data.discount} %
                    </span>
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </CardText>
          </a>
          <CardText>
            <div className="d-flex effect flex-row-reverse">
              <a href={`/food/${data.id_product}`} target="_self">
                <div
                  className="effect-1 text-center"
                  style={{ display: "inline-block", zIndex: 10 }}
                >
                  <span style={{ fontSize: 25, color: "#fff", zIndex: 2 }}>
                    <BsIcons.BsBoxArrowInRight />
                  </span>
                </div>
              </a>
              <Popup
                modal
                closeOnDocumentClick={false}
                nested
                trigger={
                  <div
                    style={{ display: "inline-block", zIndex: 10 }}
                    onClick={() => {
                      setAble(false);
                    }}
                    className="delete-effect text-center"
                  >
                    Xóa
                  </div>
                }
              >
                {(close) => (
                  <div className="popup-confirm-delete">
                    <div className="col-12">
                      <span
                        style={{
                          color: "#ee7171",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        Delete Product
                      </span>
                    </div>
                    <div className="col-12">
                      <span>Please type the following to confirm:</span> <br />
                      <div
                        style={{
                          margin: "10px 0",
                          padding: 10,
                          background: "#d7d4d4",
                          borderRadius: 5,
                          display: "inline-block",
                          userSelect: "none",
                        }}
                      >
                        {data.name_product.toLowerCase()}
                      </div>
                    </div>
                    <div className="form-group col-12">
                      <input
                        onChange={(e) => {
                          setAble(false);
                          setWord(e.target.value);
                          if (
                            e.target.value === data.name_product.toLowerCase()
                          ) {
                            setAble(true);
                          }
                        }}
                        type="text"
                        placeholder="Confirm Name Food"
                        className="form-control"
                      ></input>
                    </div>
                    <div className="row">
                      <div className="col-6 d-flex justify-content-center">
                        <button
                          // disabled={!able}
                          style={
                            able ? { display: "block" } : { display: "none" }
                          }
                          type="button"
                          className="btn btn-warning"
                          onClick={() => {
                            if (word === data.name_product.toLowerCase()) {
                              try {
                                (async () => {
                                  const token = localStorage.getItem("token");
                                  const res = await foodAPI.deleteFood(
                                    token,
                                    data.id_product
                                  );
                                  console.log(res);
                                  SuccessToast("Xóa thành công");
                                  setAble(false);
                                  dispatch(deleteProduct(data.id_product));
                                  close();
                                })();
                              } catch (error) {
                                console.log(error);
                                ErrorToast("Xóa thành công");
                              }
                            } else {
                              WarningToast(
                                "Xin lỗi bạn không thể hủy vì chưa nhập xác thực món"
                              );
                            }
                          }}
                        >
                          Delete Now
                        </button>
                      </div>
                      <div className="col-6 d-flex justify-content-center">
                        <button
                          onClick={() => {
                            close();
                            setAble(false);
                          }}
                          type="button"
                          className="btn btn-info"
                        >
                          Cancle
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
}

export default FoodCard;
