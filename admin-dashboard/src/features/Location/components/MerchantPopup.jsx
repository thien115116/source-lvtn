import React from "react";
import { defaultImg, sourceImg } from "services/_readSourceImg";
import { Card, Button } from "react-bootstrap";
import * as IoIcons from "react-icons/io";
function MerchantPopup({ data }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header>Merchant</Card.Header>
      <Card.Img
        width="200"
        height="200"
        variant="top"
        alt="No Img Suitable"
        src={data.cover ? sourceImg(data.cover) : defaultImg()}
      />
      <Card.Body>
        <Card.Title>{data.name_merchant}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <IoIcons.IoIosStar style={{ color: "#ffc125" }} /> Best Seller
        </Card.Subtitle>
        <Card.Text>Địa chỉ: {data.locations}</Card.Text>
        <Button variant="primary">
          <a style={{ color: "white" }} href={`/merchant/${data.id_merchant}`}>
            Chi Tiết
          </a>
        </Button>
      </Card.Body>
    </Card>
  );
}

MerchantPopup.propTypes = {};

export default MerchantPopup;
