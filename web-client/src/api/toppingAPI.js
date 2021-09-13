import axiosClient from "./axiosClient";

const toppingAPI = {
  getAll(token) {
    const url = `/web/get-topping`;
    return axiosClient.get(url, {
      headers: { Authorization: token },
    });
  },
  addNew(token, data) {
    const url = `/web/topping/add`;
    return axiosClient.post(url, data, {
      headers: { Authorization: token },
    });
  },
  update(token, data) {
    const url = `/web/topping/edit`;
    return axiosClient.put(url, data, {
      headers: { Authorization: token },
    });
  },
  delete(data, token) {
    const url = `/web/topping/${data}`;
    return axiosClient.delete(url, {
      headers: { Authorization: token },
    });
  },
};
export default toppingAPI;
