import 'toastify-js/src/toastify.css';
import '../css/normalize.css';
import '../css/fonts.css';
import '../css/style.css';
import '../css/icons.css';

import Navigo from 'navigo';
import { mount } from 'redom';
import Toastify from 'toastify-js';
import API from './modules/api/api.js';
import toastConfig from './modules/configs/toast-config.js';

import createCurrenciesSectionSkeleton from './modules/skeletons/create-currencies-section-skeleton.js';
import createMapSectionSkeleton from './modules/skeletons/create-map-section-skeleton.js';
import createTransactionsHistorySectionSkeleton from './modules/skeletons/create-transactions-history-section-skeleton.js';
import createAccountDataSectionSkeleton from './modules/skeletons/create-account-data-section-skeleton.js';
import createAccountsSectionSkeleton from './modules/skeletons/create-accounts-section-skeleton.js';

import createHeaderView from './modules/elements/create-header-view.js';
import createAuthFormView from './modules/elements/create-auth-form-view.js';
import createAccountsSectionView from './modules/elements/create-accounts-section-view.js';
import createMapSectionView from './modules/elements/create-map-section-view.js';
import createAccountDataSectionView from './modules/elements/create-account-data-section-view.js';
import createTransactionsHistorySectionView from './modules/elements/create-transactions-history-section-view.js';
import createCurrenciesSectionView from './modules/elements/create-currencies-section-view.js';

const router = new Navigo('/', { linksSelector: 'a', hash: true });

const header = document.getElementById('header');
const main = document.getElementById('main');

const checkAuth = (done) => {
  const isAuthenticated = localStorage.getItem('coin-auth-token');

  if (!isAuthenticated) {
    router.navigate('/auth');
  } else {
    done();
  }
};

const checkNotAuth = (done) => {
  const isAuthenticated = localStorage.getItem('coin-auth-token');

  if (isAuthenticated) {
    router.navigate('/');
  } else {
    done();
  }
};

const renderHeaderView = (activeRoute) => {
  header.innerHTML = '';
  const headerContainer = createHeaderView([
    { text: 'Банкоматы', href: '/banks', isActive: activeRoute === '/banks' },
    { text: 'Счета', href: '/', isActive: activeRoute === '/' },
    {
      text: 'Валюта',
      href: '/currencies',
      isActive: activeRoute === '/currencies',
    },
    { text: 'Выйти', href: '/logout', isActive: false },
  ]);
  mount(header, headerContainer);
};

const renderAccountsSkeleton = () => {
  const skeleton = createAccountsSectionSkeleton();
  main.innerHTML = '';
  mount(main, skeleton);
};

const renderAccountsView = (accountList) => {
  const section = createAccountsSectionView({
    accountList: accountList,
    onAccountBtnClick: (id) => {
      router.navigate(`/accounts/${id}`);
    },
    onSortSelectChange: (sortOption) => {
      switch (sortOption) {
        case 'По номеру':
          accountList.sort((a, b) => a.account - b.account);
          break;
        case 'По балансу':
          accountList.sort((a, b) => a.balance - b.balance);
          break;
        case 'По последней транзакции':
          accountList.sort((a, b) => {
            if (!a.transactions[0] && !b.transactions[0]) {
              return 0;
            } else if (!a.transactions[0]) {
              return -1;
            } else if (!b.transactions[0]) {
              return 1;
            } else {
              return (
                new Date(a.transactions[0].date) -
                new Date(b.transactions[0].date)
              );
            }
          });
          break;
        default:
          break;
      }
    },
    onNewBtnClick: async () => {
      const newAccount = await API.createAccount();
      accountList.push(newAccount);
      localStorage.setItem('coin-account-list', JSON.stringify(accountList));
    },
  });
  main.innerHTML = '';
  mount(main, section);
};

const renderAccountsDataSkeleton = () => {
  const skeleton = createAccountDataSectionSkeleton();
  main.innerHTML = '';
  mount(main, skeleton);

}

const renderAccountsDataView = (account) => {
  const numbers =
    JSON.parse(localStorage.getItem('coin-recipient-accounts')) ?? [];
  const section = createAccountDataSectionView({
    account: account,
    numbers: numbers,
    onBackBtnClick: () => {
      router.navigate('/');
    },
    onTransactionFormSubmit: async (from, to, amount) => {
      const res = await API.transferFunds(from, to, amount);
      account.balance = res.balance;
      account.transactions.push(res.transactions.pop());

      const isExistInAutocomplete = numbers.find(
        (element) => element.label === to
      );
      if (!isExistInAutocomplete) {
        numbers.push({ label: to });
        localStorage.setItem(
          'coin-recipient-accounts',
          JSON.stringify(numbers)
        );
      }

      Toastify({
        ...toastConfig,
        text: 'Успешно!',
        style: {
          color: '#fff',
          background: '#76ca66',
        },
      }).showToast();
    },
    onTransactionsTableClick: () => {
      router.navigate(`/history/${account.account}`);
    },
  });
  main.innerHTML = '';
  mount(main, section);
};

const renderHistorySkeleton = () => {
  const skeleton = createTransactionsHistorySectionSkeleton();
  main.innerHTML = '';
  mount(main, skeleton);
}

const renderHistoryView = (account) => {
  const section = createTransactionsHistorySectionView({
    account: account,
    onBackBtnClick: () => {
      router.navigate(`/accounts/${account.account}`);
    },
  });
  main.innerHTML = '';
  mount(main, section);
};

const renderCurrenciesSkeleton = () => {
  const skeleton = createCurrenciesSectionSkeleton();
  main.innerHTML = '';
  mount(main, skeleton);
}

const renderCurrenciesView = (currenciesList) => {
  const section = createCurrenciesSectionView({
    allCurrenciesList: currenciesList,
    currenciesList: currenciesList,
    webSocket: API.currencyRate(),
    onCurrencyFormSubmit: async (from, to, amount) => {
      const res = await API.buyCurrency(from, to, amount);
      currenciesList.length = 0;
      [...Object.values(res)].forEach((element) => {
        currenciesList.push(element);
      });

      Toastify({
        ...toastConfig,
        text: 'Успешно!',
        style: {
          color: '#fff',
          background: '#76ca66',
        },
      }).showToast();
    },
  });
  main.innerHTML = '';
  mount(main, section);
};

const renderBanksSkeleton = () => {
  const skeleton = createMapSectionSkeleton();
  main.innerHTML = '';
  mount(main, skeleton);
}

const renderBanksView = (markerList) => {
  const section = createMapSectionView({
    markerList: markerList,
  });
  main.innerHTML = '';
  mount(main, section);
};

const renderAuthView = () => {
  header.innerHTML = '';
  const headerContainer = createHeaderView([]);
  mount(header, headerContainer);

  main.innerHTML = '';
  const section = createAuthFormView({
    onAuthSubmit: async (login, password) => {
      if (await API.login(login, password)) router.navigate('/');
    },
  });
  mount(main, section);
};

router
  .on({
    '/': () => {
      checkAuth(async () => {
        try {
          renderHeaderView('/');
          renderAccountsSkeleton();
          let accountList =
            JSON.parse(localStorage.getItem('coin-account-list')) ?? [];
          if (accountList != []) {
            renderAccountsView(accountList);
          }
          accountList = await API.getAccountList();
          renderAccountsView(accountList);
        } catch (error) {
          Toastify({
            ...toastConfig,
            text: error.message,
          }).showToast();
          main.innerHTML = '';
        }
      });
    },
    '/accounts/:id': ({ data }) => {
      checkAuth(async () => {
        try {
          const id = data.id;
          renderHeaderView('');
          renderAccountsDataSkeleton();
          let account = await API.getAccount(id);
          await renderAccountsDataView(account);
        } catch (error) {
          Toastify({
            ...toastConfig,
            text: error.message,
          }).showToast();
          main.innerHTML = '';
        }
      });
    },
    '/history/:id': ({ data }) => {
      checkAuth(async () => {
        try {
          const id = data.id;
          renderHeaderView('');
          renderHistorySkeleton();
          let account = await API.getAccount(id);
          renderHistoryView(account);
        } catch (error) {
          Toastify({
            ...toastConfig,
            text: error.message,
          }).showToast();
          main.innerHTML = '';
        }
      });
    },
    '/currencies': () => {
      checkAuth(async () => {
        try {
          renderHeaderView('/currencies');
          renderCurrenciesSkeleton();
          let currenciesList = await API.getCurrenciesList();
          renderCurrenciesView(currenciesList);
        } catch (error) {
          Toastify({
            ...toastConfig,
            text: error.message,
          }).showToast();
          main.innerHTML = '';
        }
      });
    },
    '/banks': () => {
      checkAuth(async () => {
        try {
          renderHeaderView('/banks');
          renderBanksSkeleton();
          let markerList = JSON.parse( localStorage.getItem('coin-marker-list') ) ?? [];
          if (markerList != []) {
            renderBanksView(markerList);
          }
          markerList = await API.getBankList();
          renderBanksView(markerList);
          localStorage.setItem('coin-marker-list', JSON.stringify(markerList));
        } catch (error) {
          Toastify({
            ...toastConfig,
            text: error.message,
          }).showToast();
          main.innerHTML = '';
        }
      });
    },
    '/auth': () => {
      checkNotAuth(() => {
        try {
          renderAuthView();
        } catch (error) {
          Toastify({
            ...toastConfig,
            text: error.message,
          }).showToast();
          main.innerHTML = '';
        }
      });
    },
    '/logout': () => {
      try {
        API.logout();
        router.navigate('/auth');
      } catch (error) {
        Toastify({
          ...toastConfig,
          text: error.message,
        }).showToast();
        main.innerHTML = '';
      }
    },
  })
  .resolve();
