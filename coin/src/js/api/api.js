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
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }

    localStorage.setItem('coin-auth-token', data.payload.token);
    return true;
  }

  static logout() {
    localStorage.removeItem('coin-auth-token');
  }

  static async getAccountList() {
    try {
      const token = localStorage.getItem('coin-auth-token');
      const response = await fetch(`${process.env.SERVER}/accounts`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      return data.payload;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAccount(id) {
    try {
      const token = localStorage.getItem('coin-auth-token');
      const response = await fetch(`${process.env.SERVER}/account/${id}`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      return data.payload;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async createAccount() {
    try {
      const token = localStorage.getItem('coin-auth-token');
      const response = await fetch(`${process.env.SERVER}/create-account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      return data.payload;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async transferFunds(from, to, amount) {
    try {
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
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      return data.payload;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAllCurrenciesList() {
    try {
      const response = await fetch(`${process.env.SERVER}/all-currencies`);
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      return data.payload;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getCurrenciesList() {
    try {
      const token = localStorage.getItem('coin-auth-token');
      const response = await fetch(`${process.env.SERVER}/currencies`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      return Object.values(data.payload);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async buyCurrency(from, to, amount) {
    try {
      const token = localStorage.getItem('coin-auth-token');
      const response = await fetch(`${process.env.SERVER}/currency-buy`, {
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
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      return data.payload;
    } catch (error) {
      throw new Error(error);
    }
  }

  static currencyRate() {
    const ws = new WebSocket(`${process.env.SERVER}/currency-feed`);

    ws.onopen = () => {
      console.log('Соединение с валютным стримом установлено');
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log('Получено сообщение:', data);
    };

    ws.onerror = (error) => {
      throw new Error(error);
    };

    ws.onclose = () => {
      console.log('Соединение с валютным стримом закрыто');
    };

    return ws;
  }

  static async getBankList() {
    try {
      const response = await fetch(`${process.env.SERVER}/banks`);
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      return data.payload;
    } catch (error) {
      throw new Error(error);
    }
  }
}
