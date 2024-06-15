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
    { text: 'Валюта', href: '/currencies', isActive: activeRoute === '/currencies' },
    { text: 'Выйти', href: '/logout', isActive: false },
  ]);
  mount(header, headerContainer);
};

const renderAccountsView = async () => {
  renderHeaderView('/');

  const skeleton = createAccountsSectionSkeleton();
  main.innerHTML = '';
  mount(main, skeleton);

  let accountList = await API.getAccountList();
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
    },
  });
  main.innerHTML = '';
  mount(main, section);
}

const renderAccountsDataView = async (id) => {
  renderHeaderView('');

  const skeleton = createAccountDataSectionSkeleton();
  main.innerHTML = '';
  mount(main, skeleton);

  let account = await API.getAccount(id);
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

      const isExistInAutocomplete = numbers.find(element => element.label === to);
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
      router.navigate(`/history/${id}`);
    },
  });
  main.innerHTML = '';
  mount(main, section);
}

const renderHistoryView = async (id) => {
  renderHeaderView('');

  const skeleton = createTransactionsHistorySectionSkeleton();
  main.innerHTML = '';
  mount(main, skeleton);

  const section = createTransactionsHistorySectionView({
    account: await API.getAccount(id),
    onBackBtnClick: () => {
      router.navigate(`/accounts/${id}`);
    },
  });
  main.innerHTML = '';
  mount(main, section);
}

const renderCurrenciesView = async () => {
  renderHeaderView('/currencies');

  const skeleton = createCurrenciesSectionSkeleton();
  main.innerHTML = '';
  mount(main, skeleton);

  let currenciesList = await API.getCurrenciesList();
  const section = createCurrenciesSectionView({
    allCurrenciesList: await API.getAllCurrenciesList(),
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
}

const renderBanksView = async () => {
  renderHeaderView('/banks');

  const skeleton = createMapSectionSkeleton();
  main.innerHTML = '';
  mount(main, skeleton);

  const section = createMapSectionView({
    markerList: await API.getBankList(),
  });
  main.innerHTML = '';
  mount(main, section);
}

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
}

router
  .on({
    '/': () => {
      checkAuth(async () => {
        try {
          await renderAccountsView();
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
          await renderAccountsDataView(id);
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
          await renderHistoryView(id);
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
          await renderCurrenciesView();
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
          await renderBanksView();
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
