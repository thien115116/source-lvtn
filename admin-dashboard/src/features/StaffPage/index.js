import { Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import "./Workview.css";
function StaffWork() {
  return (
    <div>
      <Switch>
        <Route exact path="/staff" component={MainPage} />
      </Switch>
    </div>
  );
}
export default StaffWork;
