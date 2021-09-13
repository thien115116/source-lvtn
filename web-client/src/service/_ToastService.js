import { toast, Zoom } from "react-toastify";

export const SuccessToast = (message) => {
  toast.success(message, {
    draggable: true,
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2000,
    transition: Zoom,
  });
};
export const WarningToast = (message) => {
  toast.warning(message, {
    draggable: true,
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2000,
    transition: Zoom,
  });
};
export const ErrorToast = (message) => {
  toast.error(message, {
    draggable: true,
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2000,
    transition: Zoom,
  });
};
