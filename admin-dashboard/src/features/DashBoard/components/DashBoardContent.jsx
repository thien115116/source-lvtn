import { AreaChart } from "components/Chart/AreaChart/AreaChart";
import { DoughnutChart } from "components/Chart/CircleChart/CircleChart";
import React from "react";
import { Row, Col } from "reactstrap";
import "./Dashboard.css";
import {
  TotalOrder,
  TotalProfit,
  DailyVisitor,
  CurrentOnline,
} from "./Statistic";
export const DashboardContent = (props) => {
  return (
    <>
      {/* Start Statistic */}
      <Row style={{ padding: "0 0 30px 0" }}>
        <Col xs="3">
          <TotalOrder />
        </Col>
        <Col xs="3">
          <TotalProfit />
        </Col>
        <Col xs="3">
          <DailyVisitor />
        </Col>
        <Col xs="3">
          <CurrentOnline />
        </Col>
      </Row>
      {/* End Statistic */}
      <Row>
        <Col xs="4">
          {/* CATEGORY CHART */}
          <div className="box f-height">
            <div style={{ padding: "0 20px" }}>
              <div className="box-header">Merchant Create New</div>
              <div className="box-header-sub">
                Biểu đồ thống kê số lượng các loại cửa hàng
              </div>
            </div>
            <div className="box-body">
              <div id="category-chart">
                <DoughnutChart />
              </div>
            </div>
          </div>
          {/* END CATEGORY CHART */}
        </Col>
        <Col xs="8">
          {/* CUSTOMERS CHART */}
          <div className="box f-height">
            <div style={{ padding: "0 20px" }}>
              <div className="box-header">Revenue</div>
              <div className="box-header-sub">
                {" "}
                Biểu đồ thống kê tổng thu và tổng chi
              </div>
            </div>
            <div className="box-body ">
              <AreaChart />
            </div>
          </div>
          {/* END CUSTOMERS CHART */}
        </Col>
      </Row>
    </>
  );
};
