import axiosClient from "./axiosClient";

const userAPI = {
  getAdminAccount(token) {
    const url = "/base-admin/get-all";
    return axiosClient.get(url, { headers: { Authorization: token } });
  },

  addAdminAccount(token, data) {
    const url = "/base-admin/create-staff";
    return axiosClient.post(url, data, {
      headers: {
        Authorization: token,
      },
    });
  },
};

export default userAPI;
