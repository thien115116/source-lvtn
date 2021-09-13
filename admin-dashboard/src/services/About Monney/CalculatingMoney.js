//Hàm  tính toán tổng tiền từ trước đến nay của app
export const totalMoneyEver = (arrayOrder, type) => {
  let array = filterOrder(arrayOrder, type);
  const VAT = 0.1; // 10%
  let money = 0;
  if (Array.isArray(array)) {
    array.forEach((order) => {
      if (order.coupon !== 0) {
        //Trường hợp không có Coupon
        //Công thức:
        // tiền = tổng tiền món x (1 - VAT) x 25% + tổng tiền ship x ( 1 - (VAT - 9/100)) x 20%
        let preMoney = 0;
        preMoney =
          order.subtotal * (1 - VAT) * 0.25 +
          order.applicableFee * (1 - (VAT - 9 / 100)) * 0.2;
        money = money + preMoney;
      } else {
        //Có coupon
        let coupon = JSON.parse(order.coupon);
        if (
          typeof coupon.brand_id === "undefined" &&
          typeof coupon.paymentMethod_id === "undefined"
        ) {
          //Trường hợp này là voucher của App nên sẽ tính tiền bằng cthuc khác
          let preMoney = 0;
          preMoney =
            order.subtotal * (1 - VAT) * 0.25 +
            order.applicableFee * (1 - (VAT - 9 / 100)) * 0.2 -
            coupon.expPrice;
          money = money + preMoney;
        }
      }
    });
  }
  return money;
};

export const filterOrder = (arrayOrder, type) => {
  // console.log(arrayOrder);
  switch (type) {
    case 1:
      //Filter ngày hiện tại
      if (Array.isArray(arrayOrder)) {
        // console.log(new Date(arrayOrder[0].createAt).getDate());
        return arrayOrder.filter(
          (item) => new Date(item.createAt).getDate() === new Date().getDate()
        );
      }
      break;
    case 7:
      let now = new Date();
      let dayOfWeek = now.getDay(); //0-6
      console.log(dayOfWeek);
      let numDay = now.getDate();

      let start = new Date(now); //copy
      start.setDate(numDay - dayOfWeek);
      start.setHours(0, 0, 0, 0);

      let end = new Date(now); //copy
      end.setDate(numDay + (7 - dayOfWeek));
      end.setHours(0, 0, 0, 0);
      console.log(start + ":" + end);
      if (Array.isArray(arrayOrder)) {
        return arrayOrder.filter(
          (item) =>
            new Date(item.createAt).getMonth() === new Date().getMonth() &&
            new Date(item.createAt).getFullYear() ===
              new Date().getFullYear() &&
            new Date(item.createAt).getDate() >= new Date(start).getDate() &&
            new Date(item.createAt).getDate() <= new Date(end).getDate()
        );
      }
      break;
    case 30:
      if (Array.isArray(arrayOrder)) {
        return arrayOrder.filter(
          (item) => new Date(item.createAt).getMonth() === new Date().getMonth()
        );
      }
      break;

    default:
      break;
  }
};
