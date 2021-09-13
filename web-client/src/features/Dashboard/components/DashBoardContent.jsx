import { AreaChart } from "components/Chart/AreaChart/AreaChart";
import { DoughnutChart } from "components/Chart/CircleChart/CircleChart";
import { LineCLineChartOrderInWeek } from "components/Chart/LineChart/LineChartOrderInWeek";
import React from "react";
import { Row, Col } from "reactstrap";
import "./Dashboard.css";
import {
  TotalOrder,
  TotalProfit,
  DailyVisitor,
  CurrentOnline,
} from "./Statistic";
export const DashboardContent = () => {
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
        <Col xs="8" className=" ">
          {/* CATEGORY CHART */}
          <div
            className=" _card-food p-3"
            style={{ height: 618, boxShadow: "none" }}
          >
            <div className="box-header">Đơn Đặt Hàng Trong Tuần</div>
            <div className="box-header-sub">
              Biểu đồ thống kê số lượng đơn đặt hàng của cửa hàng trong tuần
              qua.
            </div>
            <div className="box-body">
              <div id="category-chart ">
                <LineCLineChartOrderInWeek />
              </div>
            </div>
          </div>
          {/* END CATEGORY CHART */}
        </Col>
        <Col xs="4" className="">
          <div
            className="_card-food p-3"
            style={{ height: 618, boxShadow: "none" }}
          >
            <div className="box-header">Số lượng món ăn của bạn</div>
            <div className="box-header-sub">
              Thống kế số món ăn đang khả dụng trong cửa hàng của bạn.
            </div>
            <DoughnutChart />
          </div>

          {/* END CATEGORY CHART */}
        </Col>
        <Col xs="12" className="mt-4">
          {/* CUSTOMERS CHART */}
          <div className="box f-height">
            <div className="box-header">Doanh Thu</div>
            <div className="box-header-sub">
              {" "}
              Biểu đồ thống kê tổng thu và tổng chi
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
