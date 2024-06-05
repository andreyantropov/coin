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
      createAccountsSectionView(main, await API.getAccountList());
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
