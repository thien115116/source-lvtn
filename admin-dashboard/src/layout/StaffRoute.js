import { Route, Redirect } from "react-router-dom";
import StaffTemplate from "./StaffTemplate";
export default function StaffRoute(props) {
  const token = localStorage.getItem("token");
  var role = null;
  return (
    <Route
      path={props.path}
      {...props.exact}
      render={() => {
        if (token === null && role === null) {
          return <Redirect to="/login" />;
        }
        if (localStorage.getItem("user") !== null) {
          role = JSON.parse(localStorage.getItem("user")).role;
          if (role === 2) {
            return <Redirect to="/" />;
          } else if (role === 1) {
            return (
              <StaffTemplate>
                <props.component />
              </StaffTemplate>
            );
          }
        }
      }}
    />
  );
}
