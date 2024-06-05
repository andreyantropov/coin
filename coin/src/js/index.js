import '../css/normalize.css';
import '../css/fonts.css';
import '../css/style.css';

import Navigo from 'navigo';
import API from './modules/api.js';
import createAuthFormView from './modules/create-auth-form-view.js';
import createAccountsSectionView from './modules/create-accounts-section-view.js';
import createMapSectionView from './modules/create-map-section-view.js';

const router = new Navigo(null, true);

const nav = document.getElementById('nav');
const banksBtn = document.getElementById('banks-btn');
const logoutBtn = document.getElementById('logout-btn');
const main = document.getElementById('main');

banksBtn.addEventListener('click', (e) => {
  e.preventDefault();

  router.navigate('/banks');
});
logoutBtn.addEventListener('click', (e) => {
  e.preventDefault();

  API.logout();
  router.navigate('/auth');
});

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
  .on('/', () => {
    checkAuth(async () => {
      nav.style.display = 'block';
      main.innerHTML = '';

      let accountList = await API.getAccountList();
      createAccountsSectionView(main, accountList, {
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
                  return new Date(a.transactions[0].date) - new Date(b.transactions[0].date);
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
    });
  })
  .on('/banks', () => {
    checkAuth(async () => {
      nav.style.display = 'block';
      main.innerHTML = '';
      createMapSectionView(main, await API.getBankList());
    });
  })
  .on('/auth', () => {
    checkNotAuth(() => {
      nav.style.display = 'none';
      main.innerHTML = '';
      createAuthFormView(main, {
        onAuthSubmit: async (login, password) => {
          if (await API.login(login, password)) router.navigate('/');
        },
      });
    });
  })
  .resolve();
