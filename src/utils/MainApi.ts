class Api {
  _baseUrl: string;
  _headers: HeadersInit;

  constructor(baseUrl: string, headers: HeadersInit) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  login(data) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  register(data) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  saveArticle(article, token) {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(article),
    }).then(this._checkResponse);
  }

  getSavedArticles(token) {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  deleteArticle(id, token) {
    return fetch(`${this._baseUrl}/articles/${id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  getUserInfo = (token) => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };
}

// const baseUrl = 'http://localhost:3000';
const baseUrl = 'https://api.solomon-final.students.nomoredomainssbs.ru';

const api = new Api(baseUrl, {
  'Content-Type': 'application/json',
  Accept: 'application/json',
});

export default api;
