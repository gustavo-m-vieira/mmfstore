export function calculateCost(finalPrice) {
  const rate = finalPrice <= 50
    ? 50
    : finalPrice;

  return rate * 1;
}