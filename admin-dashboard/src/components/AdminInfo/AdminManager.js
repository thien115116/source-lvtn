import { React, useEffect, useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";

import classnames from "classnames";
import AdminGI from "./AdminGI";
import AdminPassword from "./AdminPassword";
const AdminManager = (props) => {
  const [activeTab, setActiveTab] = useState("1");
  const dataRaw = localStorage.getItem("user");
  const data = JSON.parse(dataRaw);
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const getData = () => {};
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              Generate Information
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
            >
              Password
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "3" })}
              onClick={() => {
                toggle("3");
              }}
            >
              Setting
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <AdminGI profile={data} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <div className="container-fluid pt-2">
                  <AdminPassword />
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12 p-5">
                <h3>Feature upcoming soon !</h3>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};
export default AdminManager;
