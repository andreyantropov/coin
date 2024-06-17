import formatDate from '../src/js/modules/utils/format-date';
import formatMoney from '../src/js/modules/utils/format-money';

test('Should format date', () => {
  expect(formatDate('2021-09-11T23:00:44.486Z')).toBe('12 сентября 2021 г.');
  expect(formatDate('2024-12-12T23:00:44.486Z')).toBe('13 декабря 2024 г.');
  expect(formatDate('2020-10-10T23:00:44.486Z')).toBe('11 октября 2020 г.');
});

test('Should format money', () => {
  expect(formatMoney('1000')).toBe('1 000');
  expect(formatMoney('1000000')).toBe('1 000 000');
  expect(formatMoney('1000000000')).toBe('1 000 000 000');
});
