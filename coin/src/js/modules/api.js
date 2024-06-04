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

    localStorage.setItem('coin-auth-token', data.payload.token);

    return true;
  }

  static logout() {
    localStorage.removeItem('coin-auth-token');
  }

  static async getAccountList() {
    const token = localStorage.getItem('coin-auth-token');
    const response = await fetch(`${process.env.SERVER}/accounts`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    const data = await response.json();
    return data.payload;
  }
}
