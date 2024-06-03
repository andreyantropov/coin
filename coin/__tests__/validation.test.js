import { isValid, isSecurityCodeValid } from "creditcard.js";

test("Should pass correct card number", () => {
  expect(isValid("4627100101654724")).toBe(true);
});

test("Should not pass a card number with non-numeric characters", () => {
  expect(isValid("qq271001016547zz")).toBe(false);
  expect(isValid("46271фб1016547zz")).toBe(false);
  expect(isValid("46,71фб1016]47zz")).toBe(false);
  expect(isValid("462 10_10165 724")).toBe(false);
});

test("Should not pass a card number with insufficient number of digits", () => {
  expect(isValid("46271001")).toBe(false);
  expect(isValid("46271001016547")).toBe(false);
  expect(isValid("")).toBe(false);
});

test("Should not pass a card number with too many digits", () => {
  expect(isValid("462710010165472446271001016547244627100101654724")).toBe(
    false,
  );
  expect(isValid("46271001016547241234")).toBe(false);
});

test("Should pass a CVV/CVC with three numeric characters", () => {
  expect(isSecurityCodeValid("4627100101654724", "123")).toBe(true);
});

test("Should not pass a CVV/CVC with 1-2 numeric characters", () => {
  expect(isSecurityCodeValid("4627100101654724", "13")).toBe(false);
  expect(isSecurityCodeValid("4627100101654724", "1")).toBe(false);
  expect(isSecurityCodeValid("4627100101654724", "")).toBe(false);
});

test("Should not pass a CVV/CVC with 4+ numeric characters", () => {
  expect(isSecurityCodeValid("4627100101654724", "123123")).toBe(false);
  expect(isSecurityCodeValid("4627100101654724", "3216")).toBe(false);
});

test("Should not pass a CVV/CVC with non-numeric characters", () => {
  expect(isSecurityCodeValid("4627100101654724", "abc")).toBe(false);
  expect(isSecurityCodeValid("4627100101654724", "12ф")).toBe(false);
  expect(isSecurityCodeValid("4627100101654724", ",2a")).toBe(false);
  expect(isSecurityCodeValid("4627100101654724", "- -")).toBe(false);
});
