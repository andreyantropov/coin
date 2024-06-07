function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
  }

function formatMoney(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

module.exports = { formatDate, formatMoney };
