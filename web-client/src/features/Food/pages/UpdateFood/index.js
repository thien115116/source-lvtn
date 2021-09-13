import foodAPI from "api/foodAPI";
import merchantAPI from "api/merchantAPI";
import {
  emptyMerchant,
  setMerchantByID,
} from "features/Merchant/merchantSlice";
import * as AiIcons from "react-icons/ai";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getToken } from "utils/Common";
import "../../assets/css/food.css";
import "react-toastify/dist/ReactToastify.css";
import { ErrorToast, SuccessToast } from "service/_ToastService";
function UpdateFood() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        dispatch(emptyMerchant());
        const token = getToken();
        const res = await merchantAPI.getMerchant(token);
        dispatch(setMerchantByID(res.data));
      } catch (error) {}
    })();
  }, [dispatch]);
  const arrayFood = useSelector((state) => state.merchant.current.products);
  const { id_product } = useParams();
  let data = useMemo(() => {
    let array = arrayFood;
    let result = [];
    if (Array.isArray(arrayFood)) {
      result = array.filter((item) => item.id_product === id_product);
    }
    return result[0];
  }, [arrayFood, id_product]);
  console.log(form);
  console.log(data);
  const inputOnChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;

    setForm({
      ...form,
      [name]: value,
    });
  };
  const checkDefault = () => {
    if (typeof form.name_product === "undefined") {
      form.name_product = data.name_product;
    }
    if (typeof form.priceNew === "undefined") {
      form.priceNew = data.price;
    }
    if (typeof form.discountNew === "undefined") {
      form.discountNew = data.discount;
    }
    if (typeof form.dicriptionsNew === "undefined") {
      form.dicriptionsNew = data.dicriptions;
    }
    form.id_product = data.id_product;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    checkDefault();
    console.log(form);
    if (window.confirm("Xác nhận việc cập nhật ?")) {
      (async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await foodAPI.updateFood(token, form);
          console.log(res);
          SuccessToast("Gửi yêu cầu cập nhật thành công");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } catch (error) {
          ErrorToast("Gửi yêu cầu cập nhật thất bại");
        }
      })();
    }
  };

  return (
    <div
      className="_card-food min-height d-flex justify-content-center align-items-center"
      style={{ position: "relative" }}
    >
      <ToastContainer />
      <div style={{ position: "absolute", left: 0, top: 0 }}>
        <Link to={`/food/${id_product}`}>
          <div className="return-effect">
            <span className="effect-2">
              <AiIcons.AiOutlineArrowLeft />
            </span>
            Quay lại
          </div>
        </Link>
      </div>
      {data && (
        <form onSubmit={handleSubmit} className="update-form">
          <div className="pb-3">
            <div className="food-title text-center" style={{ fontSize: 25 }}>
              Cập Nhật Thông Tin Món Ăn
            </div>
          </div>
          <div className="form-field">
            <input
              type="text"
              name="name_product"
              placeholder=" "
              className="form-input"
              defaultValue={data.name_product}
              onChange={inputOnChange}
            />
            <label className="form-label-focus">Tên Mới</label>
          </div>
          <div className="form-field mt-3">
            <input
              type="number"
              min="0"
              step="1000"
              name="priceNew"
              placeholder=" "
              className="form-input"
              defaultValue={data.price}
              onChange={inputOnChange}
            />
            <label className="form-label-focus">Giá Mới</label>
          </div>
          <div className="form-field mt-3">
            <input
              type="number"
              min="0"
              step="1"
              name="discountNew"
              placeholder=" "
              className="form-input"
              defaultValue={data.discount}
              onChange={inputOnChange}
            />
            <label className="form-label-focus">Giảm Giá Mới</label>
          </div>
          <div className="form-field mt-3">
            <textarea
              style={{ height: 100, paddingTop: 10 }}
              type="text"
              name="dicriptionsNew"
              placeholder=" "
              className="form-input"
              defaultValue={data.dicriptions}
              onChange={inputOnChange}
            />
            <label className="form-label-focus">Mô Tả Mới</label>
          </div>
          <div className="form-field mt-3">
            <textarea
              style={{ height: 100, paddingTop: 10 }}
              type="text"
              name="note"
              placeholder=" "
              className="form-input"
              onChange={inputOnChange}
            />
            <label className="form-label-focus">Ghi Chú</label>
          </div>

          <div className="text-center mt-3">
            <button
              disabled={data.state === "Processing" ? true : false}
              type="submit"
              class="btn btn-primary"
            >
              Cập nhật
            </button>
            <span className="update-note">
              <span style={{ color: "red" }}>*</span> Lưu ý bạn sẽ không thể cập
              nhật ngay, bạn cần được sự kiểm duyệt từ Administrator .
            </span>
            <span
              style={
                data.state !== "Processing"
                  ? { display: "none" }
                  : { display: "block" }
              }
              className="update-note"
            >
              <span style={{ color: "red" }}>*</span> Yêu cầu cập nhật món ăn
              này của bạn đang được xử lý .
            </span>
          </div>
        </form>
      )}
    </div>
  );
}

export default UpdateFood;
