import axiosClient from "./axiosClient";

const workAPI = {
  getAllRequest(token) {
    const url = "/base-admin/request-for-administrator";
    return axiosClient.get(url, { headers: { Authorization: token } });
  },
  getRequestUpdateFood(token) {
    const url = "/base-admin/request-update-food";
    return axiosClient.get(url, { headers: { Authorization: token } });
  },
  getAllAdminIMG(token) {
    const url = "/base-admin/get-img-admin";
    return axiosClient.get(url, { headers: { Authorization: token } });
  },
  assignForStaff(token, data) {
    const url = "/base-admin/assign-for-staff";
    return axiosClient.post(url, data, { headers: { Authorization: token } });
  },
  assignUpdateFood(token, data) {
    const url = "/base-admin/assign-update-food";
    return axiosClient.post(url, data, { headers: { Authorization: token } });
  },
};

export default workAPI;
