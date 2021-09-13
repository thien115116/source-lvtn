import axiosClient from "./axiosClient";

const menuAPI = {
  getAllMenu(token) {
    const url = "/menu";
    return axiosClient.get(url, { headers: { Authorization: token } });
  },
  getFoodOfMenu(token, data) {
    const url = `/menu/has-food/${data}`;
    return axiosClient.get(url, { headers: { Authorization: token } });
  },
  addNew(token, data) {
    const url = "/menu";
    return axiosClient.post(url, data, { headers: { Authorization: token } });
  },
  addNewFood(token, data) {
    const url = "/menu/add-product";
    return axiosClient.post(url, data, { headers: { Authorization: token } });
  },
  deleteMenu(token, data) {
    const url = `/menu/delete-menu/${data}`;
    return axiosClient.delete(url, { headers: { Authorization: token } });
  },
  deleteFood(token, data) {
    const url = `/menu/delete-food`;
    return axiosClient.delete(url, {
      params: { id_menuItem: data },
      headers: { Authorization: token },
    });
  },
  updateMenuInfo(token, data) {
    const url = `/menu/${data.id_menu}`;
    return axiosClient.put(url, data, {
      headers: { Authorization: token },
    });
  },
};
export default menuAPI;
