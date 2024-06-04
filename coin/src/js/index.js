import '../css/normalize.css';
import '../css/fonts.css';
import '../css/style.css';

import API from './modules/api.js';
import Navigo from 'navigo';
import createAuthFormView from './modules/create-auth-form-view.js';

const router = new Navigo(null, true);

const nav = document.getElementById('nav');
const main = document.getElementById('main');

router
  .on('/', () => {
    if (!isAuth()) {
      router.navigate('/auth');
    } else {
      nav.style.display = 'block';
    }
  })
  .on('/auth', () => {
    if (isAuth()) {
      router.navigate('/');
    } else {
      nav.style.display = 'none';
      createAuthFormView(main, {
        onAuthSubmit: async (login, password) => {
          if (await API.login(login, password)) router.navigate('/');
        },
      });
    }
  })
  .resolve();

createAuthFormView(main);

function isAuth() {
  return localStorage.getItem('coin-auth-token');
}
