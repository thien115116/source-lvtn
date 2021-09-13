import axiosClient from "./axiosClient";

const attributeAPI = {
  getAll(token) {
    const url = `/web/attribute`;
    return axiosClient.get(url, {
      headers: { Authorization: token },
    });
  },
  addNew(token, data) {
    const url = `/web/attribute/add`;
    return axiosClient.post(url, data, {
      headers: { Authorization: token },
    });
  },
  update(token, data) {
    const url = `/web/attribute/edit`;
    return axiosClient.put(url, data, {
      headers: { Authorization: token },
    });
  },
  delete(data, token) {
    const url = `/web/attribute/${data}`;
    return axiosClient.delete(url, {
      headers: { Authorization: token },
    });
  },
};
export default attributeAPI;
