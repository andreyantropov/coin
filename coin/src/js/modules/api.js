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

  static async getAccount(id) {
    const token = localStorage.getItem('coin-auth-token');
    const response = await fetch(`${process.env.SERVER}/account/${id}`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    const data = await response.json();
    return data.payload;
  }

  static async createAccount() {
    const token = localStorage.getItem('coin-auth-token');
    const response = await fetch(`${process.env.SERVER}/create-account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
    });
    const data = await response.json();
    return data.payload;
  }

  static async transferFunds(from, to, amount) {
    const token = localStorage.getItem('coin-auth-token');
    const response = await fetch(`${process.env.SERVER}/transfer-funds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify({
        from: from,
        to: to,
        amount: amount,
      }),
    });
    const data = await response.json();
    return data.payload;
  }

  static async getCurrenciesList() {
    const token = localStorage.getItem('coin-auth-token');
    const response = await fetch(`${process.env.SERVER}/currencies`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    const data = await response.json();
    return Object.values(data.payload);
  }

  static async getBankList() {
    const response = await fetch(`${process.env.SERVER}/banks`);
    const data = await response.json();
    return data.payload;
  }
}
