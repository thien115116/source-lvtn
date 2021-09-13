import * as FcIcons from "react-icons/fc";

import { Card, Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { GLOBAL_VARIABLE } from "app.global";
import axios from "axios";

import Select from "react-select";
import { ErrorToast, SuccessToast } from "services/_ToastService";
const MerchantPending = (props) => {
  let option = [
    {
      label: "⏰ Pending",
      value: "Pending",
    },
    {
      label: "✔️ Done",
      value: "Done",
    },
  ];
  return (
    <Accordion key={props.index}>
      <div className="row mb-2 mt-2">
        <div className="col-6">
          <div style={{ padding: "10px 0px" }}>
            <span className="bold">Type: </span>
            <span className="label_ASAP">{"Merchant"}</span> {" || "}
            <span className="bold">Label: </span>
            <span className="label_online">{"Duyệt Cửa Hàng"}</span>
          </div>
        </div>
        <div className="col-6">
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={option[0]}
            isDisabled={false}
            isLoading={false}
            isClearable={false}
            isRtl={false}
            isSearchable={false}
            name="state"
            options={option}
          />
        </div>
      </div>
      <Card>
        <Accordion.Toggle
          className="btn__workview--plus"
          as={Button}
          variant="link"
          eventKey="0"
        >
          <Card.Header>
            <table
              style={{ minWidth: "unset !important" }}
              className="table table-striped"
            >
              <thead>
                <tr>
                  <td>
                    <span>Tên Cửa Hàng:</span>
                  </td>

                  <td>
                    <span>Chủ Sở Hữu:</span>
                  </td>
                  <td>
                    <span>Xem</span>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{props.item.name_merchant}</td>

                  <td>{props.item.athor}</td>
                  <td>
                    <span style={{ fontSize: 20 }}>
                      <FcIcons.FcOpenedFolder />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </Card.Header>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="_card-food" style={{ padding: 20 }}>
                    <div
                      className="title__card text-center"
                      style={{ textTransform: "capitalize" }}
                    >
                      <h3>{props.item.name_merchant}</h3>
                    </div>
                    <div className="card__contact mt-2">
                      <div className="contact__phone d-flex">
                        <span style={{ fontSize: 25 }}>
                          <i className="fa fa-phone" />
                        </span>
                        <span style={{ fontSize: 20 }}>{props.item.phone}</span>
                      </div>
                      <div className="contact__address mt-3 d-flex">
                        <div className="col-10">
                          <span style={{ fontSize: 25 }}>
                            <i className="fa fa-map-marker" />
                          </span>
                          <span style={{ fontSize: 20 }}>
                            {props.item.locations}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6  ">
                  <div className="d-flex justify-content-center align-items-center">
                    <button
                      onClick={async () => {
                        let data1 = {
                          id_merchant: props.item.id_merchant,
                          id_request: props.item.id_request,
                          note: "Test",
                          phoneNumber: props.item.phone,
                          author: props.item.athor,
                          mailTo: props.item.email,
                        };
                        try {
                          await axios
                            .post(
                              `${GLOBAL_VARIABLE.BASE_URL}/base-admin/accept-merchant`,
                              data1,
                              {
                                headers: {
                                  Authorization: localStorage.getItem("token"),
                                },
                              }
                            )
                            .then((res) => {
                              SuccessToast("Duyệt");
                            });
                        } catch (error) {
                          ErrorToast("Lỗi Duyệt");
                        }
                      }}
                      className="btn btn-primary "
                      type="button"
                    >
                      Accept
                    </button>
                  </div>
                </div>
                <div className="col-md-6  ">
                  <div className="d-flex justify-content-center align-items-center">
                    <button
                      onClick={async () => {
                        let data1 = {
                          id_merchant: props.item.id_merchant,
                          id_request: props.item.id_request,
                        };
                        try {
                          await axios
                            .post(
                              `${GLOBAL_VARIABLE.BASE_URL}/base-admin/denied-merchant`,
                              data1,
                              {
                                headers: {
                                  Authorization: localStorage.getItem("token"),
                                },
                              }
                            )
                            .then((res) => {
                              SuccessToast("Hủy Duyệt");
                            });
                        } catch (error) {
                          ErrorToast("Lỗi Hủy Duyệt");
                        }
                      }}
                      className="btn btn-warning "
                      type="button"
                    >
                      Denied
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default MerchantPending;
