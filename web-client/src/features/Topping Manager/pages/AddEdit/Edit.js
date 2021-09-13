import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import { ErrorToast, SuccessToast, WarningToast } from "service/_ToastService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import toppingAPI from "api/toppingAPI";
import { updateTopping } from "features/Topping Manager/toppingSlice";
function Edit() {
  const [form, setForm] = useState({});
  const { id_topping } = useParams();
  const toppingArray = useSelector((state) => state.topping.topping);
  console.log(toppingArray);
  const dispatch = useDispatch();
  let data = useMemo(() => {
    let array = toppingArray;
    let result = array.filter((item) => item.id_topping === id_topping);
    return result[0];
  }, [id_topping, toppingArray]);
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
  console.log(form);
  const handleSubmit = (e) => {
    e.preventDefault();
    let regex = new RegExp(/[A-Za-z0-9]+$/);
    if (typeof form.name === "undefined") {
      form.name = data.name;
    }
    if (typeof form.price === "undefined") {
      form.price = data.price;
    }
    if (regex.test(form.name)) {
      try {
        (async () => {
          const token = localStorage.getItem("token");
          form.id_topping = data.id_topping;

          const res = await toppingAPI.update(token, form);
          console.log(res);
          SuccessToast(`Sửa topping ${form.name} thành công`);
          dispatch(
            updateTopping({
              name: form.name,
              price: form.price,
              id_topping: form.id_topping,
            })
          );
        })();
      } catch (error) {
        ErrorToast(`Sửa topping ${form.name} thất bại`);
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
                Update Topping
              </div>
            </div>

            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form-field">
                <input
                  type="text"
                  name="name"
                  defaultValue={`${data.name}`}
                  placeholder=" "
                  className="form-input"
                  onChange={inputOnChange}
                />
                <label className="form-label-focus">Topping Name</label>
              </div>
              <div className="form-field mt-4">
                <input
                  type="number"
                  min="0"
                  step="1000"
                  name="price"
                  defaultValue={`${data.price}`}
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
                  Cập Nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Edit;
