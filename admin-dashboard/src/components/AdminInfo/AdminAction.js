import { useState } from "react";
import { useHistory } from "react-router";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import checkRole from "../../services/_checkRoles";
import { defaultImg, sourceImgUpload } from "../../services/_readSourceImg";
import "./AdminInfo.css";

const AdminAction = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const role = JSON.parse(localStorage.getItem("user")).role;
  const history = useHistory();
  function handleLogout() {
    localStorage.clear();
    history.push("/login");
  }
  return (
    <>
      <Dropdown direction="down" isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle
          tag="span"
          data-toggle="dropdown"
          aria-expanded={dropdownOpen}
          style={{ cursor: "pointer" }}
        >
          <img
            className="admin__img"
            width={50}
            height={50}
            src={
              localStorage.getItem("user") !== null
                ? sourceImgUpload(
                    JSON.parse(localStorage.getItem("user")).url_img
                  )
                : defaultImg()
            }
            alt="Không có ảnh"
          />
        </DropdownToggle>
        <DropdownMenu style={{ padding: 20 }}>
          <DropdownItem className="bold" header>
            Admin Manager
          </DropdownItem>
          <DropdownItem
            href={checkRole(role) ? "/profile" : "/staff-profile"}
            className="btn btn-primary text-center"
          >
            Profile
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem
            className="btn btn-warning text-center"
            onClick={handleLogout}
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <div style={{ paddingLeft: 10 }}>
        <span style={{ fontSize: 20 }} className="bold">
          {JSON.parse(localStorage.getItem("user")).displayName}
        </span>
        <span className="bold" style={{ display: "block", color: "#2f4cdd" }}>
          {JSON.parse(localStorage.getItem("user")).role === 2
            ? "Super Admin"
            : "Staff"}
        </span>
      </div>
    </>
  );
};

export default AdminAction;
