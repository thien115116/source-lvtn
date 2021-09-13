import AdminAction from "../components/AdminInfo/AdminAction";
import Sidebar from "../components/Sidebar/StaffSidebar/Sidebar";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import "./Admin.css";
const StaffTemplate = (props) => {
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
                    <Notify />
                    <Mail />
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
    <div>
      <a href="/#">
        <span style={{ fontSize: 25, marginRight: 20 }}>
          <IoIcons.IoMdNotificationsOutline />
        </span>
      </a>
    </div>
  );
};
const Mail = (props) => {
  return (
    <div>
      <a href="/#">
        <span style={{ fontSize: 25, marginRight: 20 }}>
          <AiIcons.AiOutlineMail />
        </span>
      </a>
    </div>
  );
};

export default StaffTemplate;
