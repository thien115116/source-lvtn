import { configureStore } from "@reduxjs/toolkit";
import bannerReducer from "features/Banner/bannerSlice";
import employeeReducer from "features/Employee/employeeSlice";
import dashboardReducer from "features/DashBoard/dashboardSlice";
import locationReducer from "features/Location/locationSlice";
import sidebarReducer from "components/Sidebar/sidebarReducer";
import merchantReducer from "features/Merchant/merchantSlice";
import workReducer from "features/Work-View/workSlice";
import staffReducer from "features/StaffPage/staffSlice";

const store = configureStore({
  reducer: {
    banner: bannerReducer,
    employee: employeeReducer,
    dashboard: dashboardReducer,
    location: locationReducer,
    sidebar: sidebarReducer,
    merchant: merchantReducer,
    work: workReducer,
    staff: staffReducer,
  },
});
export default store;
