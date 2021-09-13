import { SidebarData } from "./SidebarData";
import SubMenu from "../MerchantSidebar/Submenu";
import Logo from "../../../assets/images/icon_tran.png";
import "./merchantSidebar.css";
const Sidebar = () => {
  return (
    <>
      {/* Sidebar Logo */}
      <div style={{ maxHeight: 80 }} className="d-flex justify-content-center">
        <a href="/">
          <img
            className="img__logo"
            style={{ maxHeight: 80 }}
            src={Logo}
            alt="Logo cannot loaded now"
          />
        </a>
      </div>
      <ul
        style={{
          marginTop: 20,
          listStyleType: "none",

          paddingLeft: "unset",
        }}
      >
        {SidebarData.map((item, index) => {
          return <SubMenu item={item} key={index} />;
        })}
      </ul>
    </>
  );
};

export default Sidebar;
