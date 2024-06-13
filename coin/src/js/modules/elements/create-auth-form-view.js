import '../../../css/form.css'
import '../../../css/auth.css'

import { el } from 'redom';

export default function createAuthFormView({ onAuthSubmit }) {
  const form = el(
    'form',
    {
      class: 'auth form auth-form',
      onsubmit: (e) => {
        e.preventDefault();

        const login = document.getElementById('auth-login').value.trim();
        const password = document.getElementById('auth-password').value.trim();

        onAuthSubmit(login, password);
      },
    },
    [
      el('h2', 'Вход в аккаунт', { class: 'form__title auth-form-title' }),
      el('label', 'Логин', { class: 'form__label form__label_login label' }),
      el('input', {
        class: 'form__control form__control_login control',
        id: 'auth-login',
        type: 'text',
        placeholder: 'Логин',
        minlength: 6,
        required: true,
      }),
      el('label', 'Пароль', {
        class: 'form__label form__label_password label',
      }),
      el('input', {
        class: 'form__control form__control_password control',
        id: 'auth-password',
        type: 'password',
        placeholder: 'Пароль',
        minlength: 6,
        required: true,
      }),
      el('button', 'Войти', {
        class: 'form__submit-btn primary-btn btn-reset auth-form-submit',
      }),
    ],
  );

  return form;
}
