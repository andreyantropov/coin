import * as formStyles from  '../shared/form/form.module.css';
import * as styles from './auth-form.module.css'

import { el } from 'redom';

export default function createAuthFormView({ onAuthSubmit }) {
  const title = el('h2', 'Вход в аккаунт', { class: `${formStyles.title} ${styles.title}` });
  const error = el('span', 'Некорректный логин или пароль: пароли и логины длиной менее 6 символов и с пробелами не поддерживаются', { class: `${formStyles.error} hidden ${styles.error}`, });
  const loginLabel = el('label', 'Логин', { class: `${formStyles.label} ${styles.label_login} label` });
  const loginControl = el('input', {
    class: `${formStyles.control} ${styles.control_login} control`,
    type: 'text',
    placeholder: 'Логин',
    onfocus: () => {
      error.classList.add('hidden');
    },
  });
  const passwordLabel = el('label', 'Пароль', {
    class: `${formStyles.label} ${styles.label_password} label`,
  });
  const passwordControl = el('input', {
    class: `${formStyles.control} ${styles.control_password} control`,
    type: 'password',
    placeholder: 'Пароль',
    onfocus: () => {
      error.classList.add('hidden');
    },
  });
  const submitBtn = el('button', 'Войти', {
    class: `primary-btn btn-reset ${styles.submit}`,
  });

  const form = el(
    'form',
    {
      class: `${formStyles.form} ${styles.form}`,
      onsubmit: (e) => {
        e.preventDefault();

        const login = loginControl.value.trim();
        const password = passwordControl.value.trim();

        if (login.length < 6 || password.length < 6 || login.includes(' ') || password.includes(' ')) {
          error.classList.remove('hidden');
          return;
        }

        onAuthSubmit(login, password);
      },
    },
    [
      title, loginLabel, loginControl, passwordLabel, passwordControl, submitBtn, error,
    ],
  );

  return form;
}
