import FoodCard from "features/Food/components/FoodCard/FoodCard";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function MainPage(props) {
  const data = useSelector((state) => state.merchant.current);
  const [searchKey, setSearchKey] = useState(null);
  const listFood = useMemo(() => {
    let food = data.products;
    let newSearchResult = [];
    if (searchKey) {
      let string = searchKey.trim().replace(/\s+/g, " ").toLowerCase();
      newSearchResult = food.filter(
        (item) => item.name_product.toLowerCase().indexOf(string) > -1
      );
      return newSearchResult;
    }
    return food;
  }, [data, searchKey]);
  return (
    <div
      className="_card-food food-padding min-height"
      style={{ boxShadow: "none" }}
    >
      <div className="food-title">Các món ăn của bạn</div>
      <div className="row">
        <div className="col-12 food-header">
          <div className="pt-2">
            <Link to={`/food/add/${data.id_merchant}`} target="_blank">
              <span className="food-add">Thêm món +</span>
            </Link>
          </div>
          <div className="d-flex flex-row-reverse pb-2">
            <div className="form-field">
              <input
                type="text"
                name="search"
                placeholder=" "
                className="form-input"
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <label className="form-label-focus">Tìm Kiếm</label>
            </div>
          </div>
        </div>
        <div className="row mt-2" style={{ height: "100%", width: "100%" }}>
          {Array.isArray(listFood) && listFood.length ? (
            listFood.map((item, index) => {
              return (
                <div key={index} className="col-3 mb-1 mt-3">
                  <FoodCard data={item} index={index} />
                </div>
              );
            })
          ) : (
            <div
              style={{ height: "100%", width: "100%" }}
              className="d-flex justify-content-center align-items-center"
            >
              Cửa hàng của bạn chưa có món, vui lòng đến tạo món tại
              <span
                style={{
                  paddingLeft: 5,
                }}
              >
                <Link to={`/food/add/${data.id_merchant}`} target="_blank">
                  đây.
                </Link>
              </span>
              .
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

MainPage.propTypes = {};

export default MainPage;
