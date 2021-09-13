import React from "react";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";
import { sourceImgUpload } from "services/_readSourceImg";

function TopOrderMerchant({ url, title }) {
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
        </CardBody>
      </Card>
    </div>
  );
}

export default TopOrderMerchant;
