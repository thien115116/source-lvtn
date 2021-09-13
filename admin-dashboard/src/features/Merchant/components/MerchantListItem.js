import { React } from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Media, Card, CardBody } from "reactstrap";
import { priceWithDiscount } from "services/_checkDiscount";
import {
  defaultImg,
  sourceImg,
  sourceImgUpload,
} from "services/_readSourceImg";
import { setSelectedProduct } from "../merchantSlice";
import "./Merchant.css";

export default function MerchantListFood(props) {
  const dispatch = useDispatch();
  function handleClick(value) {
    try {
      dispatch(setSelectedProduct(value));
    } catch (error) {}
  }
  const handleDisableFood = (value) => {
    console.log(value);
    alert("This function will disable food, and is upcoming soon !");
  };
  const checkData = () => {
    if (typeof props.product !== "undefined") {
      return (
        <>
          {props.product.map((item, index) => {
            return (
              <Row className="mt-4" key={index}>
                <Col xs="12">
                  <Card
                    className="_card-food"
                    style={{ position: "relative " }}
                  >
                    {item.discount !== 0 && (
                      <img
                        className="promo_img"
                        width="150"
                        height="100"
                        src={sourceImgUpload("promo_contrian.png")}
                        alt=""
                      />
                    )}
                    <button
                      type="button"
                      className="btn--disable"
                      onClick={() => handleDisableFood(item.id_product)}
                    />
                    <CardBody
                      onClick={() => handleClick(props.product[index])}
                      style={{ cursor: "pointer" }}
                    >
                      <Media className="d-flex justify-content-center align-items-center">
                        <Media style={{ marginRight: 30 }} left href="#">
                          <Media
                            className="food__image"
                            object
                            src={
                              item.list[0]
                                ? sourceImg(item.list[0])
                                : defaultImg()
                            }
                            alt="Không có ảnh"
                          />
                        </Media>
                        <Media body>
                          <Media heading>{item.name_product}</Media>
                          <Media>
                            <span className="product-desc">
                              {item.dicriptions}
                            </span>
                          </Media>
                          <Media className="mt-3 d-flex flex-row-reverse">
                            <span style={{ textDecoration: "line-through" }}>
                              {item.price
                                ? new Intl.NumberFormat("it-IT", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(item.price)
                                : "Rỗng"}
                            </span>
                          </Media>
                          {item.discount !== 0 && (
                            <Media className="d-flex">
                              <div>
                                <span className="discount-product">
                                  {item.discount}%
                                </span>
                              </div>
                              <div>
                                {new Intl.NumberFormat("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(
                                  priceWithDiscount(item.discount, item.price)
                                )}
                              </div>
                            </Media>
                          )}
                        </Media>
                      </Media>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            );
          })}
        </>
      );
    }
  };

  return (
    <div
      className="item-merchant--border"
      style={{
        padding: 20,
        overflowY: "auto",
        overflowX: "hidden",
        height: "auto",
        minHeight: 500,
        maxHeight: 525,
        borderTopRightRadius: "unset",
        borderBottomRightRadius: "unset",
      }}
    >
      <div className="d-flex">
        <div>
          <h3>Danh sách các món ăn</h3>
        </div>
      </div>
      {checkData()}
    </div>
  );
}
