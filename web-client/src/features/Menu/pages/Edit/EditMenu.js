import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import * as AiIcons from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { ErrorToast, SuccessToast } from "service/_ToastService";
import menuAPI from "api/menuAPI";
import {
  addFoodOfMenu,
  countFoodOfMenu,
  deleteFoodOfMenu,
  setFoodOfMenu,
} from "features/Menu/menuSlice";
import { PaginationComponent } from "components/Paginate/Pagination";

function EditMenu() {
  const foodOfMenu = useSelector((state) => state.menu.foodOfMenu);
  const menu = useSelector((state) => state.menu.menu);
  console.log(foodOfMenu);
  const dispatch = useDispatch();
  const [search, setSearch] = useState(null);
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const { id_menu } = useParams();
  const name = useMemo(() => {
    let array = menu.filter((item) => item.id_menu === id_menu);
    return array[0];
  }, [menu, id_menu]);
  const data = useMemo(() => {
    let dataSlice = foodOfMenu;
    if (search) {
      let string = search.trim().replace(/\s+/g, " ");
      console.log(string);
      dataSlice = dataSlice.filter(
        (list) =>
          list.name_product.toLowerCase().indexOf(string.toLowerCase()) > -1
      );
      return dataSlice.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
    } else {
      return dataSlice.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
    }
  }, [foodOfMenu, search, currentPage]);
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await menuAPI.getFoodOfMenu(token, id_menu);
        console.log(res.data);
        dispatch(setFoodOfMenu(res.data));
      } catch (error) {}
    })();
  }, [id_menu, dispatch]);
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
              paddingTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div className="pb-3">
              <div className="food-title text-center" style={{ fontSize: 35 }}>
                Danh Sách Món Ăn Trong Thực Đơn "{name && name.name_menu}"
              </div>
            </div>
            <div className="d-flex flex-row-reverse pb-2">
              <div className="form-field">
                <input
                  type="text"
                  name="search"
                  placeholder=" "
                  className="form-input"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <label className="form-label-focus">Tìm Kiếm</label>
              </div>
            </div>
            <>
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr className="font-weight-bold text-center">
                    <td>#</td>
                    <td>Tên Món</td>
                    <td>Có Trong Thực Đơn Chưa</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((item, index) => {
                      return (
                        <tr className="text-center" key={index}>
                          {console.log(item)}
                          <td>
                            {" "}
                            #
                            {currentPage === 1
                              ? index + 1
                              : ITEMS_PER_PAGE * (currentPage - 1) + index + 1}
                          </td>
                          <td>{item.name_product}</td>
                          <td className="d-flex justify-content-center">
                            {item.is_check ? (
                              <div
                                style={{
                                  width: 50,
                                  height: 30,
                                  background: "#3eb650",
                                  borderRadius: 10,
                                }}
                              ></div>
                            ) : (
                              <div
                                style={{
                                  width: 50,
                                  height: 30,
                                  background: "#ea6a47",
                                  borderRadius: 10,
                                }}
                              ></div>
                            )}
                          </td>
                          <td>
                            <div className="d-flex">
                              <button
                                style={{ width: "100%" }}
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                  (async () => {
                                    try {
                                      const token =
                                        localStorage.getItem("token");
                                      const res = await menuAPI.addNewFood(
                                        token,
                                        {
                                          id_product: item.id_product,
                                          id_menuItem: id_menu,
                                        }
                                      );
                                      if (res.data.status) {
                                        SuccessToast(
                                          `Thêm Thành Công Món ${
                                            item.name_product
                                          } vào thực đơn ${
                                            name && name.name_menu
                                          }`
                                        );
                                        dispatch(
                                          addFoodOfMenu(item.id_product)
                                        );
                                      }
                                    } catch (error) {}
                                  })();
                                }}
                              >
                                Thêm
                              </button>

                              <button
                                style={{ width: "50%", marginLeft: 10 }}
                                type="button"
                                className="btn btn-warning"
                                onClick={() => {
                                  (async () => {
                                    try {
                                      const token =
                                        localStorage.getItem("token");
                                      const res = await menuAPI.deleteFood(
                                        token,
                                        item.id_menu_item
                                      );
                                      if (res.data.status) {
                                        SuccessToast(
                                          `Xóa món ${
                                            item.name_product
                                          } khỏi thực đơn ${
                                            name && name.name_menu
                                          } thành công`
                                        );
                                        dispatch(
                                          deleteFoodOfMenu(item.id_product)
                                        );
                                        dispatch(countFoodOfMenu(id_menu));
                                      }
                                      console.log(res);
                                    } catch (error) {}
                                  })();
                                }}
                              >
                                Xóa
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <PaginationComponent
                total={foodOfMenu.length}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => {
                  setCurrentPage(page);
                }}
              />
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditMenu;
