import { React, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import "./AdminSideBar.css";

const SidebarLink = styled(Link)`
  display: inline-block;
  width: 100%;
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
  padding-left: 40px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000;
  font-size: 14px;
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const location = useLocation();
  return (
    <li
      className={
        location.pathname === item.path ? "active sidebar-item" : "sidebar-item"
      }
    >
      <SidebarLink
        className="sidebar-link"
        to={item.path}
        onClick={() => {
          if (item.subNav) {
            setSubnav(!subnav);
          }
        }}
      >
        <SidebarLabel style={{ paddingLeft: 30 }}>
          {item.icon}
          <span style={{ paddingRight: 10 }}></span>
          {item.title}

          {item.subNav && subnav
            ? item.iconOpen
            : item.subNav
            ? item.iconClosed
            : null}
        </SidebarLabel>
      </SidebarLink>
      <ul className="sub-item">
        {subnav &&
          item.subNav.map((item, index) => {
            return (
              <li key={index}>
                <DropdownLink to={item.path}>
                  <SidebarLabel className="subNav__item">
                    <span>{item.title}</span>
                  </SidebarLabel>
                </DropdownLink>
              </li>
            );
          })}
      </ul>
    </li>
  );
};

export default SubMenu;
