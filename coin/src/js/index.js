import '../css/normalize.css';
import '../css/fonts.css';
import '../css/style.css';

import Navigo from 'navigo';
import API from './modules/api/api.js';
import createHeaderView from './modules/elements/create-header-view.js';
import createAuthFormView from './modules/elements/create-auth-form-view.js';
import createAccountsSectionView from './modules/elements/create-accounts-section-view.js';
import createMapSectionView from './modules/elements/create-map-section-view.js';
import createAccountDataSectionView from './modules/elements/create-account-data-section-view.js';
import createTransactionsHistorySectionView from './modules/elements/create-transactions-history-section-view.js';
import createCurrenciesSectionView from './modules/elements/create-currencies-section-view.js';
import { mount } from 'redom';

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

router
  .on({
    '/': () => {
      checkAuth(async () => {
        header.innerHTML = '';
        const headerContainer = createHeaderView([
          { text: 'Банкоматы', href: '/banks', isActive: false },
          { text: 'Счета', href: '/', isActive: true },
          { text: 'Валюта', href: '/currencies', isActive: false },
          { text: 'Выйти', href: '/logout', isActive: false },
        ]);
        mount(header, headerContainer);

        main.innerHTML = '';
        let accountList = await API.getAccountList();
        const section = createAccountsSectionView({
          accountList: accountList,
          onaccountBtnClick: (id) => {
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
        mount(main, section);
      });
    },
    '/accounts/:id': ({ data }) => {
      checkAuth(async () => {
        const id = data.id;

        header.innerHTML = '';
        const headerContainer = createHeaderView([
          { text: 'Банкоматы', href: '/banks', isActive: false },
          { text: 'Счета', href: '/', isActive: false },
          { text: 'Валюта', href: '/currencies', isActive: false },
          { text: 'Выйти', href: '/logout', isActive: false },
        ]);
        mount(header, headerContainer);

        main.innerHTML = '';
        let account = await API.getAccount(id);
        const section = createAccountDataSectionView({
          account: account,
          onBackBtnClick: () => {
            router.navigate('/');
          },
          onTransactionFormSubmit: async (from, to, amount) => {
            const res = await API.transferFunds(from, to, amount);
            account.balance = res.balance;
            account.transactions.push(res.transactions.pop());
          },
          onTransactionsTableClick: () => {
            router.navigate(`/history/${id}`);
          },
        });
        mount(main, section);
      });
    },
    '/history/:id': ({ data }) => {
      checkAuth(async () => {
        const id = data.id;

        header.innerHTML = '';
        const headerContainer = createHeaderView([
          { text: 'Банкоматы', href: '/banks', isActive: false },
          { text: 'Счета', href: '/', isActive: false },
          { text: 'Валюта', href: '/currencies', isActive: false },
          { text: 'Выйти', href: '/logout', isActive: false },
        ]);
        mount(header, headerContainer);

        main.innerHTML = '';
        const section = createTransactionsHistorySectionView({
          account: await API.getAccount(id),
          onBackBtnClick: () => {
            router.navigate(`/accounts/${id}`);
          },
        });
        mount(main, section);
      });
    },
    '/currencies': () => {
      checkAuth(async () => {
        header.innerHTML = '';
        const headerContainer = createHeaderView([
          { text: 'Банкоматы', href: '/banks', isActive: false },
          { text: 'Счета', href: '/', isActive: false },
          { text: 'Валюта', href: '/currencies', isActive: true },
          { text: 'Выйти', href: '/logout', isActive: false },
        ]);
        mount(header, headerContainer);

        main.innerHTML = '';
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
          },
        });
        mount(main, section);
      });
    },
    '/banks': () => {
      checkAuth(async () => {
        header.innerHTML = '';
        const headerContainer = createHeaderView([
          { text: 'Банкоматы', href: '/banks', isActive: true },
          { text: 'Счета', href: '/', isActive: false },
          { text: 'Валюта', href: '/currencies', isActive: false },
          { text: 'Выйти', href: '/logout', isActive: false },
        ]);
        mount(header, headerContainer);

        main.innerHTML = '';
        const section = createMapSectionView({
          markerList: await API.getBankList(),
        });
        mount(main, section);
      });
    },
    '/auth': () => {
      checkNotAuth(() => {
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
      });
    },
    '/logout': () => {
      API.logout();
      router.navigate('/auth');
    },
  })
  .resolve();
