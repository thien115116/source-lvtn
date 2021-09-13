import { useState } from "react";
import { useHistory } from "react-router";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import { getUser } from "utils/Common";

const AdminAction = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
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
            src={getUser().avatar}
            alt="Không có ảnh"
          />
        </DropdownToggle>
        <DropdownMenu style={{ padding: 20 }}>
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
          Client
        </span>
      </div>
    </>
  );
};

export default AdminAction;
