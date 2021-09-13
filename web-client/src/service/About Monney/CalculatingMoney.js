//Hàm  tính toán tổng tiền từ trước đến nay của app
export const moneyOfToday = (arrayOrder) => {
  let money = 0;
  if (Array.isArray(arrayOrder)) {
    arrayOrder.forEach((element) => {
      money += element.subtotal;
    });
  } else {
    money = arrayOrder.subtotal;
  }
  return money;
};
