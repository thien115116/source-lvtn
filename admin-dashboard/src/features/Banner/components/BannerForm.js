import { React, useState } from "react";
import "react-dates/initialize";
import "app.global";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "./Banner.css";
import { useDispatch } from "react-redux";
import { defaultImg } from "services/_readSourceImg";
import bannerAPI from "api/bannerAPI";
import { addBanner } from "../bannerSlice";
import { ErrorToast, SuccessToast, WarningToast } from "services/_ToastService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BannerForm = (props) => {
  const [dateStart, setdateStart] = useState(null);
  const [dateEnd, setdateEnd] = useState(null);
  const [img, setImg] = useState([]);
  const [imgSrc, setImgSrc] = useState(null);
  const [focused, setFocused] = useState(null);
  //
  const dispatch = useDispatch();
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    if (dateStart === null || dateEnd === null || img.length === 0) {
      ErrorToast("Bạn Nhập Thiếu Thông Tin!!!");
    } else {
      if (window.confirm("Bạn Chắc Chắn Thực Hiện Thao Tác ?")) {
        let formData = new FormData();
        formData.append("images", img);
        formData.append("publicAt", new Date(dateStart));
        formData.append("privateAt", new Date(dateEnd));
        (async () => {
          try {
            const token = localStorage.getItem("token");
            const res = await bannerAPI.addBanner(token, formData);
            SuccessToast("Thêm Banner Thành Công ");
            dispatch(addBanner(res.data.banner));
          } catch (error) {
            ErrorToast("Có Lỗi Trong Việc Lấy Dữ Liệu");
          }
        })();
      } else {
        WarningToast("Thao Tác Bị Hủy !!");
      }
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="row">
        <div className="col-4" style={{ paddingLeft: "unset" }}>
          <div className="form-card">
            <div className="form-card-title">
              <span>Tạo Banner</span>
              <span className="desc-title">
                Vui lòng chọn ngày mở và đóng cùng với hình ảnh để tạo banner .
              </span>
            </div>
            <div className="form-card-content">
              <form onSubmit={handleSubmit}>
                <div className="pb-2">
                  <span className="form-label">
                    Chọn ngày mở và đóng của banner :
                  </span>
                </div>
                <div style={{ paddingBottom: 40 }}>
                  <DateRangePicker
                    startDate={dateStart} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={dateEnd} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => {
                      setdateStart(startDate);
                      setdateEnd(endDate);
                    }} // PropTypes.func.isRequired,
                    focusedInput={focused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={(focusedInput) => setFocused(focusedInput)} // PropTypes.func.isRequired,
                  />
                </div>

                <div className="form-group">
                  <span className="form-label">Chọn Ảnh :</span>
                  <input
                    type="file"
                    class="form-control-file"
                    onChange={(e) => {
                      setImg(e.target.files[0]);
                      let reader = new FileReader();

                      reader.onloadend = () => {
                        setImgSrc(reader.result);
                      };
                      reader.readAsDataURL(e.target.files[0]);
                    }}
                    accept="image/*"
                  />
                </div>
                <div style={{ paddingBottom: 20 }}>
                  <img
                    className="form-review-img-small"
                    src={imgSrc !== null ? imgSrc : defaultImg()}
                    alt="No img"
                  />
                </div>

                <button
                  style={{ width: "100%" }}
                  type="submit"
                  class="btn btn-primary bold"
                >
                  Thêm
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-8" style={{ paddingRight: "unset" }}>
          <div className="form-card">
            <div className="form-card-title">
              <span>Review Request</span>
            </div>
            <div className="row">
              <div
                className="col-6"
                style={{ paddingRight: "unset", paddingLeft: "unset" }}
              >
                <span className="form-label">Ngày Mở:</span>{" "}
                <span style={{ fontWeight: "bold", fontSize: 20 }}>
                  {dateStart && new Date(dateStart).toLocaleDateString()}
                </span>
              </div>
              <div className="col-6">
                <span className="form-label"> Ngày Đóng:</span>{" "}
                <span style={{ fontWeight: "bold", fontSize: 20 }}>
                  {dateEnd && new Date(dateEnd).toLocaleDateString()}
                </span>
              </div>
              <div
                style={{
                  paddingRight: "unset",
                  paddingLeft: "unset",
                  paddingTop: 20,
                }}
                className="col-12"
              >
                <img
                  className="form-review-img-big"
                  src={imgSrc !== null ? imgSrc : defaultImg()}
                  alt="No img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerForm;
