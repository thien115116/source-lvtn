import { useState } from "react";
import { defaultImg, sourceImgUpload } from "services/_readSourceImg";

const AdminImage = (props) => {
  const [imgSrc, setImgSrc] = useState(props.src);
  const [change, setChange] = useState(false);
  return (
    <>
      <div className="admin__img-box">
        <img
          className="img-fluid"
          src={
            imgSrc && change
              ? imgSrc
              : !change
              ? sourceImgUpload(imgSrc)
              : defaultImg()
          }
          alt="Không Load Được Ảnh"
        />

        <div className="upload-box" style={{ position: "relative" }}>
          <label className="label_upload" for="upload_photo">
            <i class="fa fa-camera"></i>
          </label>
          <input
            type="file"
            id="upload_photo"
            onChange={(e) => {
              setChange(true);
              props.setImg(e.target.files[0]);
              let reader = new FileReader();

              reader.onloadend = () => {
                setImgSrc(reader.result);
              };
              reader.readAsDataURL(e.target.files[0]);
            }}
            accept="image/*"
          />
        </div>
      </div>
    </>
  );
};
export default AdminImage;
