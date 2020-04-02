
export const promoPrice = (cost, discount) => {
  const conditionIfProperArgs = 
  !isNaN(cost) && 
  !isNaN(discount) &&
  cost > 0 &&
  discount > 0;
  if (conditionIfProperArgs) {
    return cost * ((100 - discount)/100);
  } else {
    return null;
  }
};