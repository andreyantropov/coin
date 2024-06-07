import { el } from 'redom';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
} from 'chart.js';
import { chartAreaBorder } from './chart-plugins';

export default function createTransactionsPlotView(
  { cssClass, balance, transactionList, monthCount, onClick, }
) {
  Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title);

  const lastSixMonthsTransactions = transactionList.filter((transaction) => {
    const date = new Date(transaction.date);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - monthCount);
    return date >= sixMonthsAgo;
  });

  const groupedTransactions = groupTransactionsByMonth(
    lastSixMonthsTransactions
  );
  const balanceList = balanceByMonth(balance, groupedTransactions);

  const labels = balanceList.map((item) => item.month);
  const data = balanceList.map((item) => item.amount);

  const chartCanvas = el('canvas', { class: `${cssClass} plot`, onclick: () => { onClick(); } });
  const myChart = new Chart(chartCanvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Динамика баланса',
          data: data,
          backgroundColor: 'rgba(17, 106, 204, 1)',
          borderColor: 'rgba(17, 106, 204, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          position: 'right',
          beginAtZero: true,
          ticks: {
            count: 2,
            font: {
              size: 20,
              weight: 'bold',
            },
          },
        },
        x: {
          ticks: {
            font: {
              size: 20,
              weight: 'bold',
            },
          },
          reverse: true,
        },
      },
      plugins: {
        chartAreaBorder: {
          borderColor: 'black',
          borderWidth: 2,
        },
        title: {
          display: true,
          align: 'start',
          text: 'Динамика баланса',
          font: {
            size: 24,
            weight: 'bold',
          },
        },
      },
    },
    plugins: [chartAreaBorder],
  });

  return chartCanvas;

  function groupTransactionsByMonth(transactionList) {
    const groupedTransactions = [];
    const today = new Date();

    for (let i = 0; i < monthCount; i++) {
      const month = today.toLocaleString('default', { month: 'long' });
      groupedTransactions.push({
        amount: 0,
        month: month,
      });
      today.setMonth(today.getMonth() - 1);
    }

    transactionList.forEach((transaction) => {
      const date = new Date(transaction.date);
      const month = date.toLocaleString('default', { month: 'long' });

      const monthIndex = groupedTransactions.findIndex(
        (item) => item.month === month
      );
      if (monthIndex !== -1) {
        groupedTransactions[monthIndex].amount += transaction.amount;
      }
    });
    return groupedTransactions;
  }

  function balanceByMonth(balance, transactionList) {
    const balanceList = [];
    let difference = 0;
    transactionList.forEach((transaction) => {
      balanceList.push({
        month: transaction.month,
        amount: balance - difference,
      });
      difference += transaction.amount;
    });
    return balanceList;
  }
}
