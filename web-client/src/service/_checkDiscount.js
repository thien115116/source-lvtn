export const priceWithDiscount = (discount, price) => {
  return price - price * (discount / 100);
};
