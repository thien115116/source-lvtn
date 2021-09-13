import axiosClient from "./axiosClient";

const employeeAPI = {
  deleteStaff(data, token) {
    const url = `/base-admin/delete-staff/${data}`;
    return axiosClient.delete(url, { headers: { Authorization: token } });
  },
};

export default employeeAPI;
