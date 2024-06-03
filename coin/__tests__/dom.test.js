import createCardFormView from "../src/js/modules/create-card-form-view.js";

test("Should return a DOM element with four input fields and correct placeholders", () => {
  const container = document.createElement("div");
  const CardElement = createCardFormView(container).form;

  expect(CardElement.querySelectorAll("input")).toHaveLength(4);

  const inputPlaceholders = Array.from(
    CardElement.querySelectorAll("input"),
  ).map((input) => input.placeholder);
  expect(inputPlaceholders).toContain("Card Number");
  expect(inputPlaceholders).toContain("MM/YY");
  expect(inputPlaceholders).toContain("CVC/CVV");
  expect(inputPlaceholders).toContain("Email");
});
