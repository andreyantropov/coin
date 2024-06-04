export default class API {
  constructor() {}

  static async login(login, password) {
    const response = await fetch(`${process.env.SERVER}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: login,
        password: password,
      }),
    });
    const data = await response.json();

    localStorage.setItem('coin-auth-token', data.token);

    return true;
  }

  static logout() {
    localStorage.removeItem('coin-auth-token');
  }
}
