import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FormGroup, Input, Label } from "reactstrap";
function AppendInput({ setOption, option }) {
  const att = useSelector((state) => state.merchant.att);
  const [value, setValue] = useState([]);

  const appendForm = (e, index) => {
    if (value.length === 0) {
    }
    for (let index = 0; index < value.length; index++) {
      if (value[index].name === e.target.value) {
        return;
      }
    }
    setValue([...value, { name: e.target.value, id: att[index].id_attr }]);
  };
  const deleteForm = (e, index) => {
    let newArr = value.filter((item) => item.name !== e.target.value);
    setValue(newArr);
  };
  return (
    <div>
      <div className="row">
        <div className="col-3">
          <fieldset className="scheduler-border">
            <legend className="scheduler-border">Tên Tùy Chọn</legend>
            {att !== null
              ? att.map((item, index) => {
                  return (
                    <>
                      <FormGroup check>
                        <Label check>
                          <Input
                            onChange={(e) => {
                              if (e.target.checked) {
                                appendForm(e, index);
                              } else {
                                deleteForm(e, index);
                              }
                            }}
                            type="checkbox"
                            name="type_option"
                            value={item.name}
                          />{" "}
                          {item.name}
                        </Label>
                      </FormGroup>
                    </>
                  );
                })
              : ""}
            <div className="d-flex justify-content-center align-items-center">
              <Link
                to="/merchant-attribute"
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontFamily: "baemin",
                }}
                target="_blank"
              >
                Thêm Attribute +
              </Link>
            </div>
          </fieldset>
        </div>
        <div className="col-9">
          {value.map((item, index) => {
            return (
              <Field
                option={option}
                setOption={setOption}
                index={index}
                item={item}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
const Field = ({ index, item, option, setOption }) => {
  // const [option, setOption] = useState([]);
  const deleteOption = (e, index) => {
    let newArr = option.filter((item) => item.name !== option[index].name);
    setOption(newArr);
  };
  const changeValue = (e, index) => {
    option[index].value = e.target.value;
    setOption(option);
  };
  const changeName = (e, index) => {
    option[index].name = e.target.value;
    setOption(option);
  };
  return (
    <fieldset key={index} className="scheduler-border">
      <legend className="scheduler-border">{item.name}</legend>
      <button
        style={{ marginBottom: 5 }}
        onClick={() => {
          const name = item.name;
          const id = item.id;
          setOption([
            ...option,
            { id_attr: id, nameAtt: name, name: "", value: "" },
          ]);
        }}
        type="button"
        className="btn btn-secondary"
      >
        Thêm
      </button>
      <hr style={{ marginBottom: 5 }}></hr>
      <div className=" _card-food" style={{ padding: 10 }}>
        <Option
          item={item}
          changeName={changeName}
          changeValue={changeValue}
          deleteOption={deleteOption}
          option={option}
        />
      </div>
    </fieldset>
  );
};
const Option = ({ option, changeName, changeValue, deleteOption, item }) => {
  return (
    <>
      {option.map((element, index) => {
        if (item.name === element.nameAtt) {
          return (
            <FormGroup>
              <div className="row">
                <div className="col-3">
                  <Label>Tên thuộc tính:</Label>
                  <Input
                    pattern="[a-zA-Z0-9]+"
                    onChange={(e) => {
                      changeName(e, index);
                    }}
                    onLoad={(e) => (e.target.value = element.name)}
                    value={element.name === "" ? null : element.name}
                    type="text"
                    placeholder="Tên thuộc tính"
                  />
                </div>
                <div className="col-6">
                  <Label>Giá trị:</Label>
                  <Input
                    min="0"
                    step="500"
                    onChange={(e) => {
                      changeValue(e, index);
                    }}
                    value={element.value === "" ? null : element.value}
                    type="number"
                    placeholder="Giá trị"
                  />
                </div>
                <div className="col-3">
                  <div
                    style={{ height: "100%" }}
                    className=" row justify-content-center align-items-center"
                  >
                    <button
                      onClick={(e) => deleteOption(e, index)}
                      type="button"
                      className="btn btn-warning"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </FormGroup>
          );
        } else return <></>;
      })}
    </>
  );
};
AppendInput.propTypes = {};

export default AppendInput;
