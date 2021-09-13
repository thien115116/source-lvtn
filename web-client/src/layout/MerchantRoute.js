import { Route, Redirect } from "react-router-dom";
import { getToken } from "utils/Common";
import MerchantTemplate from "./MerchantTemplate";
export default function MerchantRoute(props) {
  return (
    <Route
      path={props.path}
      {...props.exact}
      render={() => {
        const token = getToken();
        if (token === null) {
          return <Redirect to="/login" />;
        }

        return (
          <MerchantTemplate>
            <props.component />
          </MerchantTemplate>
        );
      }}
    />
  );
}
