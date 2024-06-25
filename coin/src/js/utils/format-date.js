export default function formatDate(inputDate) {
  const date = new Date(inputDate);
  return `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()} г.`;
}

function getMonthName(monthIndex) {
  const monthNames = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  return monthNames[monthIndex];
}

// export default function formatDate(inputDate) {
//   const date = new Date(inputDate);
//   const options = { day: 'numeric', month: 'long', year: 'numeric' };
//   return date.toLocaleDateString(navigator.language, options);
// }
