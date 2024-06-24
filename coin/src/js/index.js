import 'toastify-js/src/toastify.css';
import '../css/normalize.css';
import '../css/fonts.css';
import '../css/style.css';
import '../css/icons.css';
import '../css/skeleton.css';

import Navigo from 'navigo';
import { mount } from 'redom';
import Toastify from 'toastify-js';
import API from './api/api.js';
import toastConfig from './configs/toast-config.js';

import createCurrenciesSectionSkeleton from './skeletons/create-currencies-section-skeleton.js';
import createMapSectionSkeleton from './skeletons/create-map-section-skeleton.js';
import createTransactionsHistorySectionSkeleton from './skeletons/create-transactions-history-section-skeleton.js';
import createAccountDataSectionSkeleton from './skeletons/create-account-data-section-skeleton.js';
import createAccountsSectionSkeleton from './skeletons/create-accounts-section-skeleton.js';

import createHeaderView from './elements/header/create-header-view.js';
import createAuthFormView from './elements/auth-form/create-auth-form-view.js';
import createAccountsSectionView from './elements/accounts-section/create-accounts-section-view.js';
import createMapSectionView from './elements/map-section/create-map-section-view.js';
import createAccountDataSectionView from './elements/account-data-section/create-account-data-section-view.js';
import createTransactionsHistorySectionView from './elements/transactions-history-section/create-transactions-history-section-view.js';
import createCurrenciesSectionView from './elements/currencies-section/create-currencies-section-view.js';

const router = new Navigo('/', { linksSelector: 'a', hash: true });

const header = document.getElementById('header');
const main = document.getElementById('main');

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

const renderSkeleton = (skeletonCreator) => {
  const skeleton = skeletonCreator();
  main.innerHTML = '';
  mount(main, skeleton);
};

const renderView = (viewCreator, data) => {
  const section = viewCreator(data);
  main.innerHTML = '';
  mount(main, section);
};

const renderAccountsSectionView = (accountList) => {
  renderView(createAccountsSectionView, {
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
      localStorage.setItem(
        'coin-account-list',
        JSON.stringify(accountList)
      );
    },
  });
}

const renderAccauntDataSectionView = (account, numbers) => {
  renderView(createAccountDataSectionView, {
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
}

const renderTransactionsHistorySectionView = (account) => {
  renderView(createTransactionsHistorySectionView, {
    account,
    onBackBtnClick: () => {
      router.navigate(`/accounts/${account.account}`);
    },
  });
}

const renderCurrenciesSectionView = (currenciesList, websocket) => {
  renderView(createCurrenciesSectionView, {
    allCurrenciesList: currenciesList,
    currenciesList,
    webSocket: websocket,
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
}

const renderMapSectionView = (markerList) => {
  renderView(createMapSectionView, { markerList });
}

const renderAuthFormView = () => {
  renderView(createAuthFormView, {
    onAuthSubmit: async (login, password) => {
      if (await API.login(login, password)) router.navigate('/');
    },
  });
}

const showError = (errorMessage) => {
  Toastify({
    ...toastConfig,
    text: errorMessage,
  }).showToast();
  main.innerHTML = '';
}

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

router
  .on({
    '/': () => {
      checkAuth(async () => {
        try {
          renderHeaderView('/');
          renderSkeleton(createAccountsSectionSkeleton);
          let accountList =
            JSON.parse(localStorage.getItem('coin-account-list')) ?? [];
          if (accountList != []) {
            renderAccountsSectionView(accountList);
          }
          accountList = await API.getAccountList();
          renderAccountsSectionView(accountList);
        } catch (error) {
          showError(error.message);
        }
      });
    },
    '/accounts/:id': ({ data }) => {
      checkAuth(async () => {
        try {
          const id = data.id;
          renderHeaderView('');
          renderSkeleton(createAccountDataSectionSkeleton);
          const numbers =
            JSON.parse(localStorage.getItem('coin-recipient-accounts')) ?? [];
          let account = await API.getAccount(id);
          renderAccauntDataSectionView(account, numbers);
        } catch (error) {
          showError(error.message);
        }
      });
    },
    '/history/:id': ({ data }) => {
      checkAuth(async () => {
        try {
          renderHeaderView('');
          renderSkeleton(createTransactionsHistorySectionSkeleton);
          const account = await API.getAccount(data.id);
          renderTransactionsHistorySectionView(account);
        } catch (error) {
          showError(error.message);
        }
      });
    },
    '/currencies': () => {
      checkAuth(async () => {
        try {
          renderHeaderView('/currencies');
          renderSkeleton(createCurrenciesSectionSkeleton);
          let currenciesList = await API.getCurrenciesList();
          const websocket = API.currencyRate();
          renderCurrenciesSectionView(currenciesList, websocket);
        } catch (error) {
          showError(error.message);
        }
      });
    },
    '/banks': () => {
      checkAuth(async () => {
        try {
          renderHeaderView('/banks');
          renderSkeleton(createMapSectionSkeleton);
          let markerList =
            JSON.parse(localStorage.getItem('coin-marker-list')) ?? [];
          if (markerList != []) {
            renderMapSectionView(markerList);
          }
          markerList = await API.getBankList();
          renderMapSectionView(markerList);
          localStorage.setItem('coin-marker-list', JSON.stringify(markerList));
        } catch (error) {
          showError(error.message);
        }
      });
    },
    '/auth': () => {
      checkNotAuth(() => {
        try {
          header.innerHTML = '';
          const headerContainer = createHeaderView([]);
          mount(header, headerContainer);

          renderAuthFormView();
        } catch (error) {
          showError(error.message);
        }
      });
    },
    '/logout': () => {
      try {
        API.logout();
        router.navigate('/auth');
      } catch (error) {
        showError(error.message);
      }
    },
  })
  .resolve();
