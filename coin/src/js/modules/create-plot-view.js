import { el } from 'redom';
import {
  Chart,
  CategoryScale,
  BarController,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { chartAreaBorder } from './chart-plugins';

export function createBalancePlotView(
  { cssClass, account, monthCount, onClick, }
) {
  Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title);

  const lastTransactions = account.transactions.filter((transaction) => {
    const date = new Date(transaction.date);
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - monthCount);
    return date >= startDate;
  });

  const groupedTransactions = groupTransactionsByMonth(
    account.account,
    lastTransactions,
    monthCount
  );
  const balanceList = balanceByMonth(account.balance, groupedTransactions);

  const labels = balanceList.map((item) => item.month);
  const data = balanceList.map((item) => item.amount);

  const chartCanvas = el('canvas', { class: `${cssClass} plot`, onclick: () => { onClick(); } });
  const myChart = new Chart(chartCanvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Баланс',
          data: data,
          backgroundColor: 'rgba(17, 106, 204, 1)',
          borderColor: 'rgba(17, 106, 204, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
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
}

export function createTransactionsPlotView(
  { cssClass, account, monthCount, onClick, }
) {
  Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title);

  const lastTransactions = account.transactions.filter((transaction) => {
    const date = new Date(transaction.date);
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - monthCount);
    return date >= startDate;
  });

  const groupedTransactions = groupTransactionsByMonth(
    account.account,
    lastTransactions,
    monthCount
  );

  const labels = groupedTransactions.map((item) => item.month);
  const data = groupedTransactions.map((item) => { return { positive: item.positive, negative: item.negative, } });
  const positiveData = data.map(item => item.positive);
  const negativeData = data.map(item => item.negative);

  const chartCanvas = el('canvas', { class: `${cssClass} plot`, onclick: () => { onClick(); } });
  const myChart = new Chart(chartCanvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Пополнение',
          data: positiveData,
          backgroundColor: 'rgba(118, 202, 102, 1)',
          borderColor: 'rgba(118, 202, 102, 1)',
          borderWidth: 1,
          stack: 'Stack 0',
        },
        {
          label: 'Списание',
          data: negativeData,
          backgroundColor: 'rgba(253, 78, 93, 1)',
          borderColor: 'rgba(253, 78, 93, 1)',
          borderWidth: 1,
          stack: 'Stack 0',
        },
      ],
    },
    options: {
      responsive: true,
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
          text: 'Соотношение входящих исходящих транзакций',
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
}

function groupTransactionsByMonth(id, transactionList, monthCount) {
  const groupedTransactions = [];
  const today = new Date();

  for (let i = 0; i < monthCount; i++) {
    const month = today.toLocaleString('default', { month: 'long' });
    groupedTransactions.push({
      positive: 0,
      negative: 0,
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
      if (transaction.to === id) {
        groupedTransactions[monthIndex].positive += transaction.amount;
        groupedTransactions[monthIndex].amount += transaction.amount;
      } else {
        groupedTransactions[monthIndex].negative += transaction.amount;
        groupedTransactions[monthIndex].amount -= transaction.amount;
      }
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
