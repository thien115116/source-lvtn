import merchantAPI from "api/merchantAPI";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ConvertTime, RevertTime } from "service/checkTime_Service";

function EditBusinessTime(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await merchantAPI.updateHourOpen(token, arrayHour);
        console.log(res);
      } catch (error) {}
    })();
  };
  const data = useSelector((state) => state.merchant.openTime);
  const [setIsOpen] = useState(false);
  const [arrayHour, setArrayHour] = useState([]);
  console.log(arrayHour);
  const checkData = (value) => {
    console.log(value);
    if (value.dayOfWeek === "Sunday") {
      value.dayIndex = 1;
    }
    if (arrayHour.length === 0 && value.isOpenDay === true) {
      value.from = RevertTime(value.from, true);
      value.to = RevertTime(value.to, false);
      setArrayHour([...arrayHour, value]);
    } else if (arrayHour.length > 0 && value.isOpenDay === true) {
      let newArray = arrayHour.filter(
        (item) => item.dayIndex === value.dayIndex
      );
      if (newArray.length === 0) {
        value.from = RevertTime(value.from, true);
        value.to = RevertTime(value.to, false);
        setArrayHour([...arrayHour, value]);
      } else if (newArray.length > 0) {
        arrayHour.forEach((element) => {
          if (element.dayIndex === value.dayIndex) {
            if (!value.isOpenDay) {
              let arrayHourX = arrayHour.filter(
                (item) => item.dayIndex !== value.dayIndex
              );
              setArrayHour(arrayHourX);
            }
            value.from = RevertTime(value.from, true);
            value.to = RevertTime(value.to, false);
            element.from = value.from;
            element.to = value.to;
            console.log("Element sau update", element);
          }
        });
      }
    } else if (arrayHour.length > 0 && value.isOpenDay === false) {
      console.log(value.dayIndex);
      let arrayHourX = arrayHour.filter(
        (item) => item.dayIndex !== value.dayIndex
      );
      setArrayHour(arrayHourX);
    }
  };
  return (
    <form>
      {data &&
        data.map((item, index) => {
          return (
            <EditRow
              key={index}
              index={index}
              data={item}
              checkData={checkData}
              setIsOpen={setIsOpen}
              isOpen={item.isOpenDay}
            />
          );
        })}
      <div className="col-12">
        <div className="d-flex justify-content-center align-items-center">
          <button
            type="button"
            style={{ width: 200 }}
            onClick={handleSubmit}
            className="btn btn-info"
          >
            Lưu
          </button>
        </div>
      </div>
    </form>
  );
}
const EditRow = ({ data, setIsOpen, isOpen, index, checkData }) => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [isShowEdit, setIsShowEdit] = useState(isOpen ? true : false);
  let timeFrom = "";
  timeFrom = ConvertTime(data.from);
  let timeTo = "";
  timeTo = ConvertTime(data.to);

  return (
    <>
      <div className="form-group">
        <div className="row">
          <div className="col-2">{data.dayOfWeek}</div>
          <div className="col-3">
            <div className="d-flex justify-content-center">
              <label className="checkbox-label">
                <input
                  onClick={(e) => {
                    setIsShowEdit(!isShowEdit);
                    if (e.target.checked) {
                      setIsShowEdit(true);
                    } else {
                      setIsShowEdit(false);
                      checkData({
                        dayIndex: index + 2,
                        dayOfWeek: "123",
                        from: "123",
                        to: "123",
                        isOpenDay: false,
                      });
                    }
                  }}
                  class="checkbox-button"
                  type="checkbox"
                  name="social"
                  defaultChecked={isShowEdit ? true : false}
                />
                <i className="chk-button"></i>
              </label>
            </div>
          </div>
          {isShowEdit ? (
            <div className="col-7">
              <div className="d-flex">
                <input
                  className="input-time"
                  onChange={(e) => {
                    setFrom(e.target.value);
                    if (e.target.value !== null && to !== null) {
                      checkData({
                        dayIndex: index + 2,
                        dayOfWeek: data.dayOfWeek,
                        from: e.target.value,
                        to: to,
                        isOpenDay: isShowEdit,
                      });
                    }
                  }}
                  name="from"
                  type="time"
                  defaultValue={timeFrom}
                  placeholder="hrs:mins"
                  pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                />{" "}
                :{" "}
                <input
                  className="input-time"
                  name="to"
                  onChange={(e) => {
                    setTo(e.target.value);
                    if (e.target.value !== null && from !== null) {
                      checkData({
                        dayIndex: index + 2,
                        dayOfWeek: data.dayOfWeek,
                        from: from,
                        to: e.target.value,
                        isOpenDay: isShowEdit,
                      });
                    }
                  }}
                  type="time"
                  defaultValue={timeTo}
                  placeholder="hrs:mins"
                  pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                />
              </div>
            </div>
          ) : (
            <div className="col-7">Đóng cửa</div>
          )}
        </div>
      </div>
    </>
  );
};
export default EditBusinessTime;
