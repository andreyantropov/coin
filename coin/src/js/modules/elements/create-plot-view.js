import '../../../css/plot.css';

import { el } from 'redom';
import {
  Chart,
  CategoryScale,
  BarController,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { getTransactionsForPeriod, groupTransactionsByMonth, groupBalanceByMonth, } from '../utils/chart-data-utils';
import chartConfig from '../configs/chart-config';

export function createBalancePlotView(
  { cssClass, account, monthCount, onClick, }
) {
  Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title);

  const lastTransactions = getTransactionsForPeriod(account.transactions, monthCount);
  const groupedTransactions = groupTransactionsByMonth(
    account.account,
    lastTransactions,
    monthCount
  );
  const balanceList = groupBalanceByMonth(account.balance, groupedTransactions);

  const labels = balanceList.map((item) => item.month);
  const data = balanceList.map((item) => item.amount);

  const chartCanvas = el('canvas', { class: `${cssClass} plot`, onclick: () => { onClick(); } });
  const chart = new Chart(chartCanvas, {
    ...chartConfig,
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
      ...chartConfig.options,
      plugins: {
        ...chartConfig.options.plugins,
        title: {
          ...chartConfig.options.plugins.title,
          text: 'Баланс',
        },
      },
    },
  });

  return chartCanvas;
}

export function createTransactionsPlotView(
  { cssClass, account, monthCount, onClick, }
) {
  Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title);

  const lastTransactions = getTransactionsForPeriod(account.transactions, monthCount);
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
  const chart = new Chart(chartCanvas, {
    ...chartConfig,
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
      ...chartConfig.options,
      plugins: {
        ...chartConfig.options.plugins,
        title: {
          ...chartConfig.options.plugins.title,
          text: 'Соотношение входящих выходящих транзакций',
        },
      },
    },
  });

  return chartCanvas;
}



