import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import attributeAPI from "api/attributeAPI";
import { ErrorToast, SuccessToast, WarningToast } from "service/_ToastService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { updateAtt } from "features/Attribute Manager/attributeSlice";
function Edit() {
  const [form, setForm] = useState({});
  const { id_attr } = useParams();
  const attArray = useSelector((state) => state.att.att);
  const dispatch = useDispatch();
  let data = useMemo(() => {
    let array = attArray;
    let result = array.filter((item) => item.id_attr === id_attr);
    return result[0];
  }, [id_attr, attArray]);
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
    if (regex.test(form.name)) {
      if (typeof form.name === "undefined") {
        form.name = data.name;
      }
      if (typeof form.type === "undefined") {
        form.type = data.type;
      }
      try {
        (async () => {
          const token = localStorage.getItem("token");
          form.id = data.id_attr;

          const res = await attributeAPI.update(token, form);
          console.log(res);
          SuccessToast(`Sửa attribute ${form.name} thành công`);
          dispatch(
            updateAtt({
              name: form.name,
              type: form.type,
              id_attr: form.id,
            })
          );
        })();
      } catch (error) {
        ErrorToast(`Sửa attribute ${form.name} thất bại`);
      }
    } else {
      WarningToast("Lỗi chứa ký tự đặc biệt");
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
                Update Attribute
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
                <label className="form-label-focus">Attribute Name</label>
              </div>
              <div class="form-group">
                <label>Nhóm</label>
                <select
                  onChange={inputOnChange}
                  class="form-control"
                  name="type"
                >
                  <option
                    selected={data.type === "food" ? true : false}
                    value="food"
                  >
                    Food
                  </option>
                  <option
                    selected={data.type === "drink" ? true : false}
                    value="drink"
                  >
                    Drink
                  </option>
                </select>
              </div>
              <div className="d-flex justify-content-center">
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
