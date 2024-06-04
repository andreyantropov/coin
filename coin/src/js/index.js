import '../css/normalize.css';
import '../css/fonts.css';
import '../css/style.css';

import { createAuthFormView } from './modules/create-auth-form-view.js';

const main = document.getElementById('main');

createAuthFormView(main);

