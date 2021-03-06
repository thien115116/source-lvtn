import { Redirect, Route } from "react-router";
import { getToken } from "./Common";

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return !getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        );
      }}
    ></Route>
  );
};
export default PublicRoute;
