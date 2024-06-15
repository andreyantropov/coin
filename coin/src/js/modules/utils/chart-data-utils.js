export function getTransactionsForPeriod(transactions, monthCount) {
  return transactions.filter((transaction) => {
    const date = new Date(transaction.date);
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - monthCount);
    return date >= startDate;
  });
}

export function groupTransactionsByMonth(id, transactionList, monthCount) {
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

export function groupBalanceByMonth(balance, transactionList) {
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
