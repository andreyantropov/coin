export default function formatMoney(number) {
  const roundedNumber = parseFloat(Number(number).toFixed(2));
  return roundedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}