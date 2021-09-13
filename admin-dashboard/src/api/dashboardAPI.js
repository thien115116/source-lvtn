import axiosClient from "./axiosClient";

const dashboardAPI = {
  getAllOrder(token) {
    const url = "/base-admin/app-order";
    return axiosClient(url, { headers: { Authorization: token } });
  },
};
export default dashboardAPI;
