import { React, useState, useEffect } from "react";
import "./CreateFood.css";
import MultiSelect from "react-multi-select-component";
import * as AiIcons from "react-icons/ai";
import axios from "axios";
import { GLOBAL_VARIABLE } from "constants/global";

import { FormGroup, Input, Label } from "reactstrap";
import AppendInput from "./AppendInput";
import merchantAPI from "api/merchantAPI";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "reactstrap";
import {
  getAttByType,
  setAttValue,
  setTagOfMerchant,
  setToppingOfMerchantToMultiSelect,
} from "features/Merchant/merchantSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ErrorToast, SuccessToast, WarningToast } from "service/_ToastService";
import { ToastContainer } from "react-toastify";
import { checkVietnamese } from "service/RegexVietnamese/RegexVietnamese";

export const CreateFoodForm = () => {
  const [img, setImg] = useState([]);
  const [imgSrc, setImgSrc] = useState(null);
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [typeFood, setTypeFood] = useState(null);
  const [group, setGroup] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [description, setDescription] = useState(null);
  const [optionArr, setOptionArr] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selected1, setSelected1] = useState([]);
  const [attArray] = useState([]);
  const att = useSelector((state) => state.merchant.att);
  const dispatch = useDispatch();
  const option = useSelector((state) => state.merchant.tag);
  const option1 = useSelector((state) => state.merchant.topping);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);
  let { id_merchant } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && price && discount && description && typeFood && group) {
      if (checkVietnamese(name)) {
        if (window.confirm("Xác nhận thêm ?")) {
          setAttArrValue(optionArr);
          let dataForm = new FormData();
          Array.from(img).forEach((img) => {
            dataForm.append("images", img);
          });
          dataForm.append("id_merchant", id_merchant);
          dataForm.append("name_product", name);
          dataForm.append("price", price);
          dataForm.append("attributes", JSON.stringify(attArray));
          dataForm.append("discount", discount);
          dataForm.append("dicriptions", description);
          dataForm.append("type_food", typeFood);
          dataForm.append("group", group);
          Array.from(selected).forEach((tag) => {
            dataForm.append("tags", JSON.stringify(tag));
          });

          Array.from(selected1).forEach((topping) => {
            dataForm.append("topping", JSON.stringify(topping));
          });
          axios
            .post(
              `${GLOBAL_VARIABLE.BASE_URL}/base-admin/create-food`,
              dataForm,
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
              SuccessToast("Thêm thành công");
              setTimeout(() => {
                window.close();
              }, 2000);
            })
            .catch((err) => {
              ErrorToast("Thêm thất bại");
            });
        } else {
          WarningToast("Hủy thêm");
        }
      } else {
        WarningToast("Lỗi chứa ký tự đặc biệt");
      }
    } else {
      ErrorToast("Thiếu thông tin");
    }
  };

  const setAttArrValue = (value) => {
    for (let index = 0; index < att.length; index++) {
      const element = att[index];
      const newArray = value.filter((item) => item.id_attr === element.id_attr);
      let valueArray = [];
      newArray.forEach((item) => {
        valueArray.push({ name: item.name, price: item.value });
      });
      if (valueArray.length > 0) {
        let completeArray = {
          id_attr: element.id_attr,
          nameAttr: element.name,
          value: valueArray,
        };

        dispatch(setAttValue(completeArray));
        attArray.push(completeArray);
      }
    }
  };
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      const res = await merchantAPI.getTagOfMerchant(token);
      dispatch(setTagOfMerchant(res.data));
    })();
    (async () => {
      const token = localStorage.getItem("token");
      const res = await merchantAPI.getTopingOfFood(token);
      console.log(res);
      dispatch(setToppingOfMerchantToMultiSelect(res.data));
    })();
  }, [dispatch]);

  return (
    <div
      className="_card-food"
      style={{ padding: "unset", position: "relative" }}
    >
      <div style={{ position: "absolute" }}>
        <a href="/food" style={{ textDecoration: "none" }}>
          <div className="return-effect">
            <span className="effect-2">
              <AiIcons.AiOutlineArrowLeft />
            </span>
            Quay Lại
          </div>
        </a>
      </div>
      <div className="formCreateFood ">
        <div className="text-center">
          <h2 style={{ textTransform: "uppercase" }}>Thêm Món Ăn</h2>
        </div>
        <form id="form-food">
          <div className="form-group d-flex">
            <div className="col-2">
              <label>Mã Cửa Hàng (*)</label>
            </div>
            <div className="col-3">
              <input
                value={id_merchant !== null ? id_merchant : ""}
                className="form-control-plaintext"
                type="text"
                style={{ pointerEvents: "none" }}
                readOnly
              />
            </div>
          </div>
          <div className="form-group d-flex">
            <div className="col-2">
              <label>
                <span id="tooltipName"> Tên món (*)</span>
                <Tooltip
                  placement="right"
                  isOpen={tooltipOpen}
                  autohide={false}
                  target="tooltipName"
                  toggle={toggle}
                >
                  Không nhập ký tự đặc biệt
                </Tooltip>
              </label>
            </div>
            <div className="col-10">
              <input
                // pattern="^(?:[A-Za-z0-9]+)$"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                type="text"
                onInvalid={() => alert("hello")}
              />
            </div>
          </div>
          <div className="form-group d-flex">
            <div className="col-2">
              <span id="tooltipTag">Chọn Tag: (*)</span>
              <Tooltip
                placement="right"
                isOpen={tooltipOpen}
                autohide={false}
                target="tooltipTag"
                toggle={toggle}
              >
                Có thể chọn không chọn, chọn một, chọn nhiều và chọn tất cả !
              </Tooltip>
            </div>
            <div className="col-10">
              <MultiSelect
                options={option}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
              />
            </div>
          </div>
          <div className="form-group d-flex">
            <div className="col-2">Chọn Nhóm: (*)</div>
            <div className="col-10">
              <FormGroup
                className="d-inline"
                check
                style={{ marginBottom: 20 }}
              >
                <Label check>
                  <Input
                    className=""
                    onChange={(e) => {
                      setTypeFood(e.target.value);
                      if (att !== null) {
                        (async () => {
                          const token = localStorage.getItem("token");
                          const res = await merchantAPI.getAttByType(
                            token,
                            e.target.value
                          );
                          console.log(res);
                          dispatch(getAttByType(res.data.message));
                        })();
                      }
                    }}
                    type="radio"
                    name="type_food"
                    value="food"
                  />{" "}
                  <span className="label_online pointer">Đồ Ăn</span>
                </Label>
              </FormGroup>
              <FormGroup className="d-inline ml-2" check>
                <Label check>
                  <Input
                    onChange={(e) => {
                      setTypeFood(e.target.value);
                      if (att !== null) {
                        (async () => {
                          const token = localStorage.getItem("token");
                          const res = await merchantAPI.getAttByType(
                            token,
                            e.target.value
                          );
                          dispatch(getAttByType(res.data.message));
                        })();
                      }
                    }}
                    value="drink"
                    type="radio"
                    name="type_food"
                  />
                  <span className="label_non_enable pointer">Thức Uống</span>
                </Label>
              </FormGroup>
            </div>
          </div>
          <div className="pt-2 form-group d-flex">
            <div className="col-2">Chọn Loại: (*)</div>
            <div className="col-10">
              <FormGroup
                className="d-inline mr-2"
                check
                style={{ marginBottom: 20 }}
              >
                <Label check>
                  <Input
                    className=""
                    onChange={(e) => {
                      setGroup(e.target.value);
                    }}
                    type="radio"
                    name="group"
                    value="main"
                  />{" "}
                  <span className="label_confirm_email pointer">Món Chính</span>
                </Label>
              </FormGroup>
              <FormGroup className="d-inline" check>
                <Label check>
                  <Input
                    onChange={(e) => {
                      setGroup(e.target.value);
                    }}
                    value="submain"
                    type="radio"
                    name="group"
                  />
                  <span className="label_non_confirm_email pointer">
                    Món Phụ
                  </span>
                </Label>
              </FormGroup>
            </div>
          </div>
          <div className="pt-2 form-group d-flex">
            <div className="col-2">
              <label>Tùy Chọn </label>
            </div>
            <div className="col-10">
              <div className="">
                <div className="_card-food">
                  <AppendInput
                    option={optionArr}
                    setOption={setOptionArr}
                    // returnValue={returnValue}
                    att={att}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group d-flex">
            <div className="col-2">
              <label>Topping (*)</label>
            </div>
            <div className="col-10">
              <MultiSelect
                options={option1}
                value={selected1}
                onChange={setSelected1}
                labelledBy="Select"
              />
            </div>
          </div>
          <div className="form-group d-flex">
            <div className="col-2">
              <label>
                <span id="tooltipPrice"> Giá (*)</span>
                <Tooltip
                  placement="right"
                  isOpen={tooltipOpen}
                  autohide={false}
                  target="tooltipPrice"
                  toggle={toggle}
                >
                  Mỗi lần nhập bé nhất là 500 đồng
                </Tooltip>
              </label>
            </div>
            <div className="col-10">
              <input
                min="1000"
                step="500"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="form-control"
                type="number"
              ></input>
            </div>
          </div>
          <div className="form-group d-flex">
            <div className="col-2">
              <label>Discount (*)</label>
            </div>
            <div className="col-10">
              <input
                min="0"
                max="50"
                step="1"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                className="form-control "
                type="number"
              ></input>
            </div>
          </div>

          <div className="form-group d-flex">
            <div className="col-2">
              <label>Giới thiệu (*)</label>
            </div>
            <div className="col-10">
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                class="form-control"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div className="form-group d-flex">
            <div className="col-2">
              <label>Chọn ảnh: (*)</label>
            </div>
            <div className="col-10">
              <input
                multiple
                type="file"
                class="form-control-file"
                onChange={(e) => {
                  setImg(e.target.files);
                  if (e.target.files) {
                    /* Get files in array form */
                    const files = Array.from(e.target.files);
                    console.log(files);

                    /* Map each file to a promise that resolves to an array of image URI's */
                    Promise.all(
                      files.map((file) => {
                        return new Promise((resolve, reject) => {
                          const reader = new FileReader();
                          reader.addEventListener("load", (ev) => {
                            resolve(ev.target.result);
                          });
                          reader.addEventListener("error", reject);
                          reader.readAsDataURL(file);
                        });
                      })
                    ).then(
                      (images) => {
                        /* Once all promises are resolved, update state with image URI array */
                        setImgSrc(images);
                      },
                      (error) => {
                        console.error(error);
                      }
                    );
                  }
                }}
                accept="image/*"
              />
            </div>
          </div>
          <div className="form-group">
            {imgSrc ? (
              imgSrc.map((item, index) => {
                return (
                  <img
                    key="index"
                    className="imgReview"
                    width="200"
                    height="200"
                    src={item}
                    alt="No img"
                    style={{ marginRight: 10 }}
                  />
                );
              })
            ) : (
              <></>
            )}
          </div>
        </form>
      </div>
      <ToastContainer />
      <div
        className="effect-3 d-flex justify-content-center"
        onClick={handleSubmit}
      >
        Thêm
      </div>
    </div>
  );
};
