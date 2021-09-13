import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";

import { ErrorToast, SuccessToast, WarningToast } from "service/_ToastService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import toppingAPI from "api/toppingAPI";
import { addTopping } from "features/Topping Manager/toppingSlice";

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
    let regex = new RegExp(/[A-Za-z0-9]+$/);
    if (regex.test(form.name)) {
      if (window.confirm(`Xác nhận thêm topping ${form.name}`)) {
        try {
          (async () => {
            const token = localStorage.getItem("token");
            const res = await toppingAPI.addNew(token, form);
            console.log(res);
            SuccessToast(`Thêm topping ${form.name} thành công`);
            dispatch(addTopping(res.data));
            document.getElementById("add-topping-form").reset();
          })();
        } catch (error) {
          ErrorToast(`Thêm topping ${form.name} thất bại`);
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
            <Link to="/merchant-topping">
              <div className="return-effect">
                <span className="effect-2">
                  <AiIcons.AiOutlineArrowLeft />
                </span>
                Return
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
                Add Topping
              </div>
            </div>
            <form id="add-topping-form" onSubmit={(e) => handleSubmit(e)}>
              <div className="form-field">
                <input
                  type="text"
                  name="name"
                  placeholder=" "
                  className="form-input"
                  onChange={inputOnChange}
                />
                <label className="form-label-focus">Topping Name</label>
              </div>
              <div className="form-field mt-4">
                <input
                  type="nummber"
                  min="0"
                  step="1000"
                  name="price"
                  placeholder=" "
                  className="form-input"
                  onChange={inputOnChange}
                />
                <label className="form-label-focus">Topping Price</label>
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

Add.propTypes = {};

export default Add;
