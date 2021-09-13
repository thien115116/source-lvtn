import { DateRangePicker } from "react-dates";
import { GLOBAL_VARIABLE } from "app.global";
import "react-dates/lib/css/_datepicker.css";
import "./Banner.css";
import { ErrorToast, SuccessToast, WarningToast } from "services/_ToastService";
import axios from "axios";
import { sourceImgUpload } from "services/_readSourceImg";
import { useState } from "react";
import "./Banner.css";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { initialBanner } from "../bannerSlice";
import bannerAPI from "api/bannerAPI";

export const UpdateBanner = (props) => {
  const [dateStart, setdateStart] = useState(null);
  const [dateEnd, setdateEnd] = useState(null);
  const [img, setImg] = useState([]);
  const [imgPath] = useState(props.data.url_image);
  const [imgSrc, setImgSrc] = useState(null);
  const [focused, setFocused] = useState(null);
  const [change, setChange] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dateStart === null || dateEnd === null) {
      ErrorToast("Bạn Nhập Thiếu Thông Tin!!!");
    } else {
      if (window.confirm("Bạn Chắc Chắn Thực Hiện Thao Tác ?")) {
        let formdata = new FormData();
        if (!img) {
          alert("Phải thay đổi hình ảnh, hoặc chọn lại ảnh cũ");
        } else {
          formdata.append("images", img);
          formdata.append("id", props.data.id_banner);
          formdata.append("publicAt", new Date(dateStart));
          formdata.append("privateAt", new Date(dateEnd));
          axios
            .post(
              `${GLOBAL_VARIABLE.BASE_URL}/base-admin/update-banner`,
              formdata,
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
              SuccessToast("Update Banner Thành Công");

              (async () => {
                const token = localStorage.getItem("token");
                const res = await bannerAPI.getAllBanner(token);
                dispatch(initialBanner(res.data.data));
              })();
            })
            .catch((err) => {
              ErrorToast("Update Banner Không Thành Công");
            });
        }
      } else {
        WarningToast("Thao Tác Bị Hủy !!");
      }
    }
  };
  return (
    <div className="form-card">
      <div className="form-card-title">
        <span>Sửa Banner</span>
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
                setChange(!change);
                setImg(e.target.files[0]);
                let reader = new FileReader();

                reader.onloadend = () => {
                  setImgSrc(reader.result);
                };
                reader.readAsDataURL(e.target.files[0]);
                console.log(imgSrc);
              }}
              accept="image/*"
            />
          </div>
          <div className="">
            {change ? (
              <img
                className="form-review-img-small"
                src={imgSrc}
                alt="No img"
              />
            ) : (
              <img
                className="form-review-img-small"
                src={imgSrc == null ? sourceImgUpload(imgPath) : imgSrc}
                alt="No img"
              />
            )}
          </div>

          <button
            style={{ width: "100%", marginTop: 30 }}
            type="submit"
            class="btn btn-primary"
          >
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
};
