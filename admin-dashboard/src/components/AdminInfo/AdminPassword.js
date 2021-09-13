import { React, useState } from "react";
import axios from "axios";
import { GLOBAL_VARIABLE } from "../../app.global";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";

const AdminPassword = (props) => {
  const [oldPass, setoldPass] = useState("");
  const [newPass, setnewPass] = useState("");
  const [confirmNewPass, setconfirmNewPass] = useState("");

  const successToastUpdate = () => {
    toast.success("Đổi mật khẩu thành công", {
      draggable: true,
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
      transition: Zoom,
    });
  };
  const warningToastUpdate = () => {
    toast.warning("Xác nhận mật khẩu không đúng", {
      draggable: true,
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
      transition: Bounce,
    });
  };
  const errorToastUpdate = () => {
    toast.error("Mật khẩu cũ không đúng, hoặc lỗi không rõ !", {
      draggable: true,
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
      transition: Bounce,
    });
  };
  const checkduplicatePass = (_Pass, _confirmPass) => {
    let ret = _Pass === _confirmPass ? true : false;
    return ret;
  };

  const handleChangePass = async (e) => {
    e.preventDefault();
    let chk = checkduplicatePass(newPass, confirmNewPass);
    if (chk === true) {
      const data = await {
        password: oldPass,
        newPassword: newPass,
      };
      axios
        .post(`${GLOBAL_VARIABLE.BASE_URL}/base-admin/change-password`, data, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          successToastUpdate();
        })
        .catch((err) => {
          errorToastUpdate();
        });
    } else {
      warningToastUpdate();
    }
  };
  return (
    <>
      <ToastContainer />
      <form onSubmit={handleChangePass} style={{ minWidth: 500 }}>
        <div class="form-group pb-2 row">
          <div className="col-sm-4 d-flex align-items-center">
            <span className="bold ">Old Password:</span>
          </div>
          <div className="col-sm-8">
            <input
              type="password"
              class="form-control"
              placeholder="Old Password"
              onChange={(e) => setoldPass(e.target.value)}
            />
          </div>
        </div>
        <div class="form-group pb-2 row">
          <div className="col-sm-4 d-flex align-items-center">
            <span className="bold ">Password:</span>
          </div>
          <div className="col-sm-8">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              onChange={(e) => setnewPass(e.target.value)}
            />
          </div>
        </div>
        <div class="form-group row">
          <div className="col-sm-4 d-flex align-items-center">
            <span className="bold ">Confirm Password:</span>
          </div>
          <div className="col-sm-8">
            <input
              type="password"
              class="form-control"
              placeholder="Confirm Password"
              onChange={(e) => setconfirmNewPass(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm d-flex justify-content-center">
            <button type="submit" class="btn btn-primary">
              Save
            </button>
          </div>
          <div className="col-sm d-flex justify-content-center">
            <button type="submit" class="btn btn-warning">
              Cancle
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default AdminPassword;
