import menuAPI from "api/menuAPI";
import { addNew } from "features/Menu/menuSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ErrorToast, SuccessToast, WarningToast } from "service/_ToastService";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
function AddMenu(props) {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const inputOnChange = (e) => {
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
    console.log(form);
    let regex = new RegExp(/[A-Za-z0-9]+$/);
    if (regex.test(form.name)) {
      if (window.confirm(`Xác nhận thêm thực đơn ${form.name}`)) {
        try {
          (async () => {
            const token = localStorage.getItem("token");
            const res = await menuAPI.addNew(token, form);
            console.log(res);
            SuccessToast(`Thêm topping ${form.name} thành công`);
            dispatch(addNew(res.data.Menu));
            document.getElementById("add-menu-form").reset();
          })();
        } catch (error) {
          ErrorToast(`Thêm Thực Đơn ${form.name} thất bại`);
        }
      } else {
        WarningToast("Hủy thêm !!");
      }
    } else {
      WarningToast("Chứa ký tự đặc biệt");
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="row pt-1">
        <div className="col-12">
          <div style={{ position: "absolute", left: 0, top: 0 }}>
            <Link to="/menu">
              <div className="return-effect">
                <span className="effect-2">
                  <AiIcons.AiOutlineArrowLeft />
                </span>
                Trở Về
              </div>
            </Link>
          </div>
          <div
            style={{
              paddingTop: 100,
              maxWidth: 600,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div className="pb-3">
              <div className="food-title text-center" style={{ fontSize: 35 }}>
                Thêm Thực Đơn
              </div>
            </div>
            <form id="add-menu-form" onSubmit={(e) => handleSubmit(e)}>
              <div className="form-field">
                <input
                  type="text"
                  name="name"
                  placeholder=" "
                  className="form-input"
                  onChange={inputOnChange}
                />
                <label className="form-label-focus">Tên Thực Đơn</label>
              </div>
              <div className="mt-4 align-items-center justify-content-center d-flex">
                <div className="font-weight-bold form-group">
                  <div>Điều Chỉnh Hiển Thị</div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="view"
                      id="rdo1"
                      value="0"
                      onChange={inputOnChange}
                    />
                    <label
                      style={{ cursor: "pointer" }}
                      class="form-check-label"
                      for="rdo1"
                    >
                      Ngang
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="view"
                      value="1"
                      onChange={inputOnChange}
                      id="rdo2"
                    />
                    <label
                      style={{ cursor: "pointer" }}
                      class="form-check-label"
                      for="rdo2"
                    >
                      Dọc
                    </label>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <button
                  style={{ width: 200 }}
                  className="btn btn-primary"
                  type="submit"
                >
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddMenu;
