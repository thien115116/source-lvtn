import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { sourceImgUpload } from "services/_readSourceImg";
import * as FcIcons from "react-icons/fc";

function FavoriteMerchant({ url, title }) {
  return (
    <div>
      <Card className="_card-food" style={{ position: "relative" }}>
        <img
          className="promo_img"
          width="150"
          height="100"
          src={sourceImgUpload("promo_contrian.png")}
          alt=""
        />
        <CardImg
          top
          width="100%"
          src={sourceImgUpload(url)}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            Food
          </CardSubtitle>
          <CardText>
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
              999+ reviews
            </span>
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
}

export default FavoriteMerchant;
