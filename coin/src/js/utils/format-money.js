export default function formatMoney(number) {
  const roundedNumber = parseFloat(number.toFixed(2));
  return roundedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}