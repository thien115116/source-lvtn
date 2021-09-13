import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import attributeAPI from "api/attributeAPI";
import { ErrorToast, SuccessToast, WarningToast } from "service/_ToastService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addAtt } from "features/Attribute Manager/attributeSlice";
import { checkVietnamese } from "service/RegexVietnamese/RegexVietnamese";
function Add() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
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
    console.log(form);
    if (checkVietnamese(form.name)) {
      try {
        (async () => {
          const token = localStorage.getItem("token");
          const res = await attributeAPI.addNew(token, form);
          console.log(res);
          SuccessToast(`Thêm attribute ${form.name} thành công`);
          dispatch(addAtt(res.data));
          document.getElementById("form").reset();
        })();
      } catch (error) {
        ErrorToast(`Thêm attribute ${form.name} thất bại`);
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
            <Link to="/merchant-attribute">
              <div className="return-effect">
                <span className="effect-2">
                  <AiIcons.AiOutlineArrowLeft />
                </span>
                Quay lại
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
              <div className="food-title text-center" style={{ fontSize: 25 }}>
                Thêm Attribute
              </div>
            </div>
            <form id="form" onSubmit={(e) => handleSubmit(e)}>
              <div className="form-field">
                <input
                  type="text"
                  name="name"
                  placeholder=" "
                  className="form-input"
                  onChange={inputOnChange}
                />
                <label className="form-label-focus">Tên Attribute</label>
              </div>
              <div class="form-group">
                <label>Nhóm</label>
                <select
                  onChange={inputOnChange}
                  className="form-control"
                  name="group"
                >
                  <option value="" selected disabled hidden>
                    Lựa Chọn
                  </option>
                  <option value="food">Đồ Ăn</option>
                  <option value="drink">Thức Uống</option>
                </select>
              </div>
              <div className="d-flex justify-content-center">
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

Add.propTypes = {};

export default Add;
