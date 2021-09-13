import { React, useState, useEffect, useRef } from "react";
import "./CreateFood.css";
import axios from "axios";
import { GLOBAL_VARIABLE } from "app.global";

import MultiSelect from "react-multi-select-component";
import * as MdIcons from "react-icons/md";
import { Form, FormGroup, Input, Label } from "reactstrap";
import AppendInput from "./AppendInput";
import merchantAPI from "api/merchantAPI";
import {
  getAttByType,
  setAttValue,
  setTagOfMerchant,
  setToppingOfMerchantToMultiSelect,
} from "../../merchantSlice";
import { useDispatch, useSelector } from "react-redux";
import { RequestTable } from "./RequestTable";

export const CreateFoodForm = () => {
  const [id, setId] = useState(null);
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
  const attValue = useSelector((state) => state.merchant.attValue);
  console.log(attValue);
  const dispatch = useDispatch();
  // Khai báo kết thúc
  function getID(id) {
    setId(id);
  }
  const option = useSelector((state) => state.merchant.tag);
  const option1 = useSelector((state) => state.merchant.topping);
  console.log("Topping", option1);
  console.log(selected1);
  console.log("att----------------", attArray);
  console.log("optionArr", optionArr);
  const handleSubmit = (e) => {
    e.preventDefault();
    setAttArrValue(optionArr);
    let dataForm = new FormData();
    // if (id === null) {
    //   Toast.WarningToast("Thao tác hủy, vui lòng chọn ID-Cửa hàng");
    //   return;
    // }
    Array.from(img).forEach((img) => {
      dataForm.append("images", img);
    });

    dataForm.append("id_merchant", id);
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
      .post(`${GLOBAL_VARIABLE.BASE_URL}/base-admin/create-food`, dataForm, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        setDescription("");
        setGroup("");
        setImg(null);
        setImgSrc("");
        setPrice("");
        setSelected([]);
        setSelected1([]);
        setName("");
        setTypeFood(null);
        // Toast.SuccessToast("Tạo món thành công");
      })
      .catch((err) => {
        // Toast.ErrorToast("Tạo món thất bại !");
        console.log(err);
      });
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
        console.log("Complete Array", completeArray);
        // console.log("raw array   $$$" + index, rawArray);
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
      const id_user = "MC-1624261905285-c126ade62e4644234fc";
      const res = await merchantAPI.getTopingOfFood(token, id_user);
      console.log(res.data);
      dispatch(setToppingOfMerchantToMultiSelect(res.data));
    })();
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <div className="d-flex">
        <div className="col-3">
          <h4 className="bold">Bạn nhận được một số yêu cầu tạo món:</h4>
          <div></div>
        </div>
        <div className="col-9">
          <RequestTable id={getID} />
        </div>
      </div>
      <hr></hr>
      <div className="formCreateFood">
        <div className="text-center">
          <h2 style={{ textDecoration: "underline" }}>Form Tạo Món</h2>
        </div>
        <form id="form-food" onSubmit={handleSubmit}>
          <div className="form-group d-flex">
            <div className="col-2">
              <label>Mã Cửa Hàng</label>
            </div>
            <div className="col-3">
              <input
                value={id !== null ? id : ""}
                className="form-control-plaintext"
                type="text"
                readOnly
              />
            </div>
            <div className="col-7 d-flex justify-content-start align-items-center">
              <button
                onClick={() => setId(null)}
                type="button"
                className="btn__cancel"
              >
                <MdIcons.MdCancel style={{ fontSize: 25 }} />
              </button>
            </div>
          </div>
          <div className="form-group d-flex">
            <div className="col-2">
              <label>Tên món </label>
            </div>
            <div className="col-10">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                type="text"
              ></input>
            </div>
          </div>
          <div className="form-group d-flex">
            <div className="col-2">Chọn Tag:</div>
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
            <div className="col-2">Chọn Nhóm:</div>
            <div className="col-10">
              <FormGroup check style={{ marginBottom: 20 }}>
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
                  <span className="_label food">Food</span>
                </Label>
              </FormGroup>
              <FormGroup check>
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
                          console.log(res);
                          dispatch(getAttByType(res.data.message));
                        })();
                      }
                    }}
                    value="drink"
                    type="radio"
                    name="type_food"
                  />
                  <span className="_label drink">Drink</span>
                </Label>
              </FormGroup>
            </div>
          </div>
          <div className="form-group d-flex">
            <div className="col-2">Chọn Loại:</div>
            <div className="col-10">
              <FormGroup check style={{ marginBottom: 20 }}>
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
                  <span className="_label food">Món Chính</span>
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={(e) => {
                      setGroup(e.target.value);
                    }}
                    value="submain"
                    type="radio"
                    name="group"
                  />
                  <span className="_label drink">Món Phụ</span>
                </Label>
              </FormGroup>
            </div>
          </div>
          <div className="form-group d-flex">
            <div className="col-2">
              <label>Option </label>
            </div>
            <div className="col-10">
              <div className="">
                <div className="">
                  <span className="_label option">Option</span>
                </div>
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
              <label>Topping </label>
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
              <label>Giá </label>
            </div>
            <div className="col-10">
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="form-control"
                type="number"
              ></input>
            </div>
          </div>
          <div className="form-group d-flex">
            <div className="col-2">
              <label>Discount </label>
            </div>
            <div className="col-10">
              <input
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                className="form-control "
                type="number"
              ></input>
            </div>
          </div>

          <div className="form-group d-flex">
            <div className="col-2">
              <label>Giới thiệu </label>
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
              <label>Chọn ảnh:</label>
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

          <button
            style={{ marginLeft: 15 }}
            type="submit"
            className="btn btn-primary"
          >
            Thêm
          </button>
        </form>
      </div>
    </div>
  );
};
