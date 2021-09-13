const { CreateFoodForm } = require("./CreateFood");

export const CreateFood = () => {
  return (
    <div>
      <div>
        <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>
          Giao diện tạo món ăn
        </h2>
      </div>
      <CreateFoodForm />
    </div>
  );
};
