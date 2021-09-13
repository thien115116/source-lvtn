import AdminAction from "../components/AdminInfo/AdminAction";
import Sidebar from "../components/Sidebar/AdminSidebar/Sidebar";
import "./Admin.css";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
const AdminLayout = (props) => {
  return (
    <>
      <div className="wrapper-root">
        <div className="row">
          <div className="col-sm-2 side-bar">
            <Sidebar />
          </div>
          <div className="col-sm-10">
            <div className="row">
              <div className="col-sm-12">
                <div className="admin__menu">
                  <div className="col-md-2">
                    <span className="dashboard__title">BOO</span>
                  </div>
                  <div className="col-md-10 d-flex align-items-center justify-content-end">
                    <Mail />
                    <Notify />
                    <AdminAction />
                  </div>
                </div>
              </div>
              <div className="col-sm-12">
                <main className="admin__content">{props.children}</main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Notify = (props) => {
  return (
    <a
      href="/#"
      style={{
        fontSize: 25,
        marginRight: 20,
        position: "relative",
        padding: 10,
        color: "#000",
      }}
    >
      <IoIcons.IoMdNotificationsOutline />
      <div className="pulse-css"></div>
    </a>
  );
};
const Mail = (props) => {
  return (
    <a
      href="/#"
      style={{
        fontSize: 25,
        marginRight: 20,
        position: "relative",
        padding: 10,
        color: "#000",
      }}
    >
      <AiIcons.AiOutlineMail />
      <div className="pulse-css"></div>
    </a>
  );
};
export default AdminLayout;
