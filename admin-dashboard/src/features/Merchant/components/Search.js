import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import SearchField from "./SeachField";
import Merchant from "./MerchantDetail";
function Search(props) {
  let { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route exact path="/merchant-search">
          <SearchField />
        </Route>
        <Route exact path={`${path}/:id_merchant`} component={Merchant}></Route>
      </Switch>
    </div>
  );
}

Search.propTypes = {};

export default Search;
