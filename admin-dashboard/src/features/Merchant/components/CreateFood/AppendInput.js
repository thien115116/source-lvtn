import React, { useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";
function AppendInput({ setOption, option, att }) {
  const [value, setValue] = useState([]);
  // const [option, setOption] = useState([]);
  // console.log("option", option);
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
            <legend className="scheduler-border">Option Name</legend>
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
          {/* <button
            onClick={() => returnValue(option)}
            type="button"
            className="btn btn-secondary"
          >
            Xác Nhận
          </button> */}
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
      <div className="_card">
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
    <p>
      {option.map((element, index) => {
        if (item.name === element.nameAtt) {
          return (
            <FormGroup>
              <div className="row">
                <div className="col-3">
                  <Label>Tên thuộc tính:</Label>
                  <Input
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
                    onChange={(e) => {
                      changeValue(e, index);
                    }}
                    value={element.value === "" ? null : element.value}
                    type="number"
                    placeholder="Giá trị"
                  />
                </div>
                <div className="col-3">
                  <Label>Action</Label>
                  <button
                    onClick={(e) => deleteOption(e, index)}
                    type="button"
                    className="btn btn-warning"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </FormGroup>
          );
        } else return <></>;
      })}
    </p>
  );
};
AppendInput.propTypes = {};

export default AppendInput;
