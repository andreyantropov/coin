import 'toastify-js/src/toastify.css';
import '../css/normalize.css';
import '../css/fonts.css';
import '../css/style.css';
import '../css/icons.css';

import Navigo from 'navigo';
import { mount } from 'redom';
import Toastify from 'toastify-js';
import API from './modules/api/api.js';
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

router
  .on({
    '/': () => {
      checkAuth(async () => {
        try {
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
          mount(main, section);
        } catch (error) {
          Toastify({
            text: error,
            duration: 10000,
            gravity: 'bottom',
            position: 'right',
            stopOnFocus: true,
            style: {
              color: '#fff',
              background: '#fd4e5d',
            },
          }).showToast();
        }
      });
    },
    '/accounts/:id': ({ data }) => {
      checkAuth(async () => {
        try {
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
          // localStorage.removeItem('coin-recipient-accounts')
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
                text: 'Успешно!',
                duration: 10000,
                gravity: 'bottom',
                position: 'right',
                stopOnFocus: true,
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
          mount(main, section);
        } catch (error) {
          Toastify({
            text: error,
            duration: 10000,
            gravity: 'bottom',
            position: 'right',
            stopOnFocus: true,
            style: {
              color: '#fff',
              background: '#fd4e5d',
            },
          }).showToast();
        }
      });
    },
    '/history/:id': ({ data }) => {
      checkAuth(async () => {
        try {
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
        } catch (error) {
          Toastify({
            text: error,
            duration: 10000,
            gravity: 'bottom',
            position: 'right',
            stopOnFocus: true,
            style: {
              color: '#fff',
              background: '#fd4e5d',
            },
          }).showToast();
        }
      });
    },
    '/currencies': () => {
      checkAuth(async () => {
        try {
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

              Toastify({
                text: 'Успешно!',
                duration: 10000,
                gravity: 'bottom',
                position: 'right',
                stopOnFocus: true,
                style: {
                  color: '#fff',
                  background: '#76ca66',
                },
              }).showToast();
            },
          });
          mount(main, section);
        } catch (error) {
          Toastify({
            text: error,
            duration: 10000,
            gravity: 'bottom',
            position: 'right',
            stopOnFocus: true,
            style: {
              color: '#fff',
              background: '#fd4e5d',
            },
          }).showToast();
        }
      });
    },
    '/banks': () => {
      checkAuth(async () => {
        try {
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
        } catch (error) {
          Toastify({
            text: error,
            duration: 10000,
            gravity: 'bottom',
            position: 'right',
            stopOnFocus: true,
            style: {
              color: '#fff',
              background: '#fd4e5d',
            },
          }).showToast();
        }
      });
    },
    '/auth': () => {
      checkNotAuth(() => {
        try {
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
        } catch (error) {
          Toastify({
            text: error,
            duration: 10000,
            gravity: 'bottom',
            position: 'right',
            stopOnFocus: true,
            style: {
              color: '#fff',
              background: '#fd4e5d',
            },
          }).showToast();
        }
      });
    },
    '/logout': () => {
      try {
        API.logout();
        router.navigate('/auth');
      } catch (error) {
        Toastify({
          text: error,
          duration: 10000,
          gravity: 'bottom',
          position: 'right',
          stopOnFocus: true,
          style: {
            color: '#fff',
            background: '#fd4e5d',
          },
        }).showToast();
      }
    },
  })
  .resolve();
