import { useState } from "react";
import commonAPI from "../../api/commonAPI";
import logo from "../../assets/images/icon_tran.png";
import { setUserLocalStorage } from "../../utils/Common";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { ToastContainer } from "react-toastify";
import { ErrorToast, SuccessToast } from "service/_ToastService";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  const [form, setForm] = useState({});
  const history = useHistory();
  const inputOnChange = (e) => {
    e.preventDefault();

    let name = e.target.name;
    let value = e.target.value;

    setForm({
      ...form,
      [name]: value,
    });
  };
  console.log(form);
  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const res = await commonAPI.signIn(form);
        let data = res.data;
        let user = {
          avatar: data.avatar,
          displayName: data.displayName,
          email: data.email,
        };
        setUserLocalStorage(res.data.token, user);
        history.push("/");
      } catch (error) {
        ErrorToast("Sai Tài Khoản Hoặc Mật Khẩu");
        console.log(error);
      }
    })();
  };
  return (
    <>
      <ToastContainer />
      <div className="wrapper d-flex justify-content-center align-items-center text-center">
        <div className="container-fluid">
          <div className="row d-flex justify-content-center align-items-center text-center">
            <div className="login">
              <div className="login-img">
                <img src={logo} width="100" height="100" alt="No available" />
              </div>
              <div className="login-title">
                <span className="login__title-main">Boo</span>
                <span className="login__title-sub">Merchant Management</span>
              </div>
              <div className="login-form mt-5">
                <form className="form-group">
                  <div className="form-field mt-3">
                    <input
                      onChange={inputOnChange}
                      name="phoneNumber"
                      placeholder=" "
                      type="text"
                      className="form-input"
                    />
                    <label className="form-label-focus">Số Điện Thoại *</label>
                  </div>
                  <div className="form-field mt-3">
                    <input
                      onChange={inputOnChange}
                      name="password"
                      placeholder=" "
                      type="password"
                      className="form-input"
                    />
                    <label className="form-label-focus">Mật Khẩu *</label>
                  </div>
                  <div className="submit-btn pt-4">
                    <button
                      style={{
                        width: "100%",
                        background: "#2ac1bc",
                        border: "none",
                      }}
                      type="btn"
                      className="btn btn-login btn-primary"
                      onClick={handleSubmit}
                    >
                      Đăng Nhập
                    </button>
                    <span className="circle"></span>
                    <span className="circle-2"></span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
