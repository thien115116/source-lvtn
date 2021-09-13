import menuAPI from "api/menuAPI";
import { addNew, updateMenuInfo } from "features/Menu/menuSlice";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ErrorToast, SuccessToast, WarningToast } from "service/_ToastService";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
function EditInfoMenu() {
  const menu = useSelector((state) => state.menu.menu);

  const { id_menu } = useParams();
  const data = useMemo(() => {
    let array = menu.filter((item) => item.id_menu === id_menu);
    return array[0];
  }, [id_menu, menu]);
  console.log(data);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    let regex = new RegExp(/[A-Za-z0-9]+$/);
    if (regex.test(form.name)) {
      if (
        window.confirm(
          `Xác nhận sửa tên thực đơn thành c và hiện thị nằm ${
            typeof form.view === "undefined"
              ? data.view === 1
                ? "dọc"
                : "ngang"
              : form.view === "true"
              ? "dọc"
              : "ngang"
          }`
        )
      ) {
        try {
          (async () => {
            const token = localStorage.getItem("token");
            form.id_menu = id_menu;
            console.log(form.view);
            if (typeof form.name_menu === "undefined") {
              form.name_menu = data.name_menu;
            }
            if (typeof form.view === "undefined") {
              data.view === 1 ? (form.view = true) : (form.view = false);
            } else if (form.view === "true") {
              form.view = true;
            } else {
              form.view = false;
            }
            const res = await menuAPI.updateMenuInfo(token, form);
            console.log(res);
            SuccessToast(
              `Sửa thực đơn ${form.name_menu || data.name_menu} thành công`
            );

            console.log({
              view:
                typeof form.view === "undefined"
                  ? data.view
                  : form.view === true
                  ? 1
                  : 0,
            });
            dispatch(
              updateMenuInfo({
                id_menu: id_menu,
                name_menu:
                  typeof form.name_menu === "undefined"
                    ? data.name_menu
                    : form.name_menu,
                view:
                  typeof form.view === "undefined"
                    ? data.view
                    : form.view === true
                    ? 1
                    : 0,
              })
            );
            document.getElementById("add-menu-form").reset();
          })();
        } catch (error) {
          ErrorToast(
            `Sửa Thực Đơn ${form.name_menu || data.name_menu} thất bại`
          );
        }
      } else {
        WarningToast("Hủy Sửa !!");
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
                Sửa Thực Đơn
              </div>
            </div>
            <form id="add-menu-form" onSubmit={(e) => handleSubmit(e)}>
              <div className="form-field">
                <input
                  type="text"
                  name="name_menu"
                  placeholder=" "
                  className="form-input"
                  onChange={inputOnChange}
                  defaultValue={data && data.name_menu}
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
                      value={false}
                      onChange={inputOnChange}
                      defaultChecked={data && data.view === 0 ? true : false}
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
                      value={true}
                      onChange={inputOnChange}
                      id="rdo2"
                      defaultChecked={data && data.view === 1 ? true : false}
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
                  Sửa
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditInfoMenu;
