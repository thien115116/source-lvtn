import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { WarningToast } from "services/_ToastService";
import "react-toastify/dist/ReactToastify.css";
export const CreateForm = ({ addNewData }) => {
  const [form, setForm] = useState({});

  const inputOnChange = (e) => {
    e.preventDefault();

    let name = e.target.name;
    let value = e.target.value;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let regex = new RegExp(/[A-Za-z0-9]+$/);
    if (regex.test(form.full_name)) {
      if (form.email && form.full_name) {
        if (
          window.confirm(
            `Xác nhận thêm nhân viên ${e.target.value} vào hệ thống ?`
          )
        ) {
          addNewData(form);
          document.getElementById("form").reset();
        }
      } else {
        WarningToast("Vui lòng nhập đầy đủ thông tin !!");
      }
    } else {
      WarningToast("Chứa ký tự đặc biệt");
    }
  };

  return (
    <>
      <div style={{ height: "unset" }} className="">
        <div className="form-card-title">
          <span>Thêm Nhân Viên</span>
          <span className="desc-title">
            Điền đầy đủ thông tin nhân viên mới .
          </span>
        </div>
        <div className="form-card-content">
          <form id="form" onSubmit={handleSubmit}>
            <div className="form-field">
              <input
                onChange={inputOnChange}
                type="email"
                name="email"
                className="form-input"
                placeholder=" "
              />
              <label className="form-label-focus">Admin Email</label>
            </div>
            <div className="form-field mt-3 mb-3">
              <input
                name="full_name"
                onChange={inputOnChange}
                type="text"
                className="form-input"
                placeholder=" "
              />
              <label className="form-label-focus">Full Name</label>
            </div>
            <button
              style={{ width: "100%" }}
              className="btn btn-primary"
              type="submit"
              onClick={handleSubmit}
            >
              Thêm
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
