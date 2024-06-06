import { el, mount } from 'redom';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
} from 'chart.js';

export default function createTransactionsPlotView(
  container,
  balance,
  transactionList
) {
  Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title);

  // Фильтруем транзакции за последние 6 месяцев
  const lastSixMonthsTransactions = transactionList.filter((transaction) => {
    const date = new Date(transaction.date);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return date >= sixMonthsAgo;
  });

  // Группируем транзакции по месяцам
  const groupedTransactions = groupTransactionsByMonth(
    lastSixMonthsTransactions
  );
  const balanceList = balanceByMonth(balance, groupedTransactions);

  // Подготавливаем данные для графика
  const labels = balanceList.map((item) => item.month);
  const data = balanceList.map((item) => item.amount);

  const chartAreaBorder = {
    id: 'chartAreaBorder',
    beforeDraw(chart, args, options) {
      const {
        ctx,
        chartArea: { left, top, width, height },
      } = chart;
      ctx.save();
      ctx.strokeStyle = options.borderColor;
      ctx.lineWidth = options.borderWidth;
      ctx.setLineDash(options.borderDash || []);
      ctx.lineDashOffset = options.borderDashOffset;
      ctx.strokeRect(left, top, width, height);
      ctx.restore();
    },
  };

  // Создаем график с помощью Chart.js
  const chartCanvas = el('canvas', { class: 'account-data__plot plot' });
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

  mount(container, chartCanvas);
  return chartCanvas;

  // Функция для группировки транзакций по месяцам
  function groupTransactionsByMonth(transactionList) {
    const groupedTransactions = [];
    const today = new Date();
  
    for (let i = 0; i < 6; i++) {
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
  
      // Find the matching month object in the array
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
