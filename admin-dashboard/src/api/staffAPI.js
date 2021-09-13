import axiosClient from "./axiosClient";

const staffAPI = {
  getReqUpdate(token) {
    const url = "/base-admin/request-update-food-staff";
    return axiosClient.get(url, { headers: { Authorization: token } });
  },
  updateFood(data, token) {
    const url = "/base-admin/update-food";
    return axiosClient.post(url, data, { headers: { Authorization: token } });
  },
  ejectUpdateFood(data, token) {
    const url = `/base-admin/eject-update-food`;
    return axiosClient.put(url, data, { headers: { Authorization: token } });
  },
};

export default staffAPI;
