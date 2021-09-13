import React, { useState } from "react";
import PropTypes from "prop-types";
import Popup from "reactjs-popup";
export default () => (
  <Popup trigger={<button className="button"> Open Modal </button>} modal>
    {(close) => (
      <div className="row">
        <div className="col-12 mb-5 text-center" style={{ fontSize: 18 }}>
          Bạn chắc chắn thực hiện thao tác ?
        </div>
        <div className="col-6 d-flex justify-content-center">
          <button
            onClick={() => close()}
            type="button"
            className="btn btn-primary"
          >
            Xác nhận
          </button>
        </div>
        <div className="col-6 d-flex justify-content-center">
          <button
            onClick={() => close()}
            type="button"
            className="btn btn-warning"
          >
            Hủy
          </button>
        </div>
      </div>
    )}
  </Popup>
);
