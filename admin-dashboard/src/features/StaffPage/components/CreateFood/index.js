import { CreateFoodForm } from "features/StaffPage/components/CreateFood/CreateFood";
import * as AiIcons from "react-icons/ai";
export const CreateFood = () => {
  return (
    <div className="_card-food " style={{ position: "relative" }}>
      <div style={{ position: "absolute" }}>
        <a href="/staff" style={{ textDecoration: "none" }}>
          <div className="return-effect">
            <span className="effect-2" style={{ color: "white" }}>
              <AiIcons.AiOutlineArrowLeft />
            </span>
            Return
          </div>
        </a>
      </div>
      <CreateFoodForm />
    </div>
  );
};
