import { Route, Redirect } from "react-router-dom";
import checkRole from "../services/_checkRoles";
import AdminTemplate from "./AdminTemplate";
export default function AdminRoute(props) {
  return (
    <Route
      path={props.path}
      {...props.exact}
      render={() => {
        const token = localStorage.getItem("token");
        var role = null;
        if (localStorage.getItem("user") !== null) {
          role = JSON.parse(localStorage.getItem("user")).role;
          if (!checkRole(role)) {
            return <Redirect to="/staff" />;
          }
        }
        if (token === null && role === null) {
          return <Redirect to="/login" />;
        }

        return (
          <AdminTemplate>
            <props.component />
          </AdminTemplate>
        );
      }}
    />
  );
}
