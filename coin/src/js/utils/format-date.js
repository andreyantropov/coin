export default function formatDate(inputDate) {
  const date = new Date(inputDate);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('ru-RU', options);
}
