import { React, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./StaffSideBar.css";
const SidebarLink = styled(Link)`
  display: inline-block;
  width: 100%;
  height: 40px;
  justify-content: start;
  line-height: 40px;
  padding: 0 15px;
  margin-bottom: 10px;
`;
const SidebarLabel = styled.span`
  color: #000;
  font-weight: bold;
  font-size: 20px;
`;
const DropdownLink = styled(Link)`
  background: #fff;
  height: 30px;
  padding-left: 40px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000;
  font-size: 18px;
`;

const SubMenu = ({ item }) => {
  const [subNav, setSubNav] = useState(false);
  const showSubNav = () => {
    setSubNav(!subNav);
  };

  return (
    <>
      <SidebarLink
        className="sidebar-link"
        to={item.path}
        onClick={item.subNav && showSubNav}
      >
        <SidebarLabel style={{ paddingLeft: 20 }}>
          {item.icon}
          <span style={{ paddingRight: 10 }}></span>
          {item.title}

          {item.subNav && subNav
            ? item.iconOpen
            : item.subNav
            ? item.iconClosed
            : null}
        </SidebarLabel>
      </SidebarLink>
      {subNav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink
              to={item.path}
              key={index}
              style={{ background: "white" }}
            >
              <SidebarLabel
                className="subNav__item"
                style={{ fontSize: 16, marginLeft: 20 }}
              >
                {item.icon}
                <span style={{ marginRight: 20 }}></span>
                {item.title}
              </SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
