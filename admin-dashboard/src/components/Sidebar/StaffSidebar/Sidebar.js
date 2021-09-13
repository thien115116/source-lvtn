import { SidebarData } from "./SidebarData";
import SubMenu from "./Submenu";
import Logo from "../../../assets/images/icon_tran.png";
import { useLocation } from "react-router-dom";
import "./StaffSideBar.css";
import "../AdminSidebar/AdminSideBar.css";
const Sidebar = () => {
  const location = useLocation();
  return (
    <>
      {/* Sidebar Logo */}
      <div style={{ maxHeight: 80 }} className="d-flex justify-content-center">
        <a href="/staff">
          <img
            className="img__logo"
            style={{ maxHeight: 80 }}
            src={Logo}
            alt="Logo cannot loaded now"
          />
        </a>
      </div>
      <ul>
        {SidebarData.map((item, index) => {
          return (
            <li
              className={
                location.pathname === item.path
                  ? "active sidebar-item"
                  : "sidebar-item"
              }
            >
              <SubMenu item={item} key={index} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Sidebar;
