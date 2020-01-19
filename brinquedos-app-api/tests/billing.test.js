import { calculateCost } from "../libs/billing-lib";

test("Lowest tier", () => {
  const finalPrice = 10;

  const cost = 50;
  const expectedCost = calculateCost(finalPrice);

  expect(cost).toEqual(expectedCost);
});

test("Middle tier", () => {
  const finalPrice = 100;

  const cost = 100;
  const expectedCost = calculateCost(finalPrice);

  expect(cost).toEqual(expectedCost);
});

test("Highest tier", () => {
  const finalPrice = 101;

  const cost = 101;
  const expectedCost = calculateCost(finalPrice);

  expect(cost).toEqual(expectedCost);
});