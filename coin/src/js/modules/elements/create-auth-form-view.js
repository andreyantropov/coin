import '../../../css/form.css'
import '../../../css/auth.css'

import { el } from 'redom';

export default function createAuthFormView({ onAuthSubmit }) {
  const title = el('h2', 'Вход в аккаунт', { class: 'form__title auth-form-title' });
  const error = el('span', 'Некорректный логин или пароль: пароли и логины длиной менее 6 символов и с пробелами не поддерживаются', { class: 'form__error hidden auth-error', });
  const loginLabel = el('label', 'Логин', { class: 'form__label form__label_login label' });
  const loginControl = el('input', {
    class: 'form__control form__control_login control',
    id: 'auth-login',
    type: 'text',
    placeholder: 'Логин',
    onfocus: () => {
      error.classList.add('hidden');
    },
  });
  const passwordLabel = el('label', 'Пароль', {
    class: 'form__label form__label_password label',
  });
  const passwordControl = el('input', {
    class: 'form__control form__control_password control',
    id: 'auth-password',
    type: 'password',
    placeholder: 'Пароль',
    onfocus: () => {
      error.classList.add('hidden');
    },
  });
  const submitBtn = el('button', 'Войти', {
    class: 'form__submit-btn primary-btn btn-reset auth-form-submit',
  });

  const form = el(
    'form',
    {
      class: 'auth form auth-form',
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
