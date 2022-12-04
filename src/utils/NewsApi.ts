//e29b3d47eadf4a839ff4f93c8675b4a1

// add api key to the end of the url
class NewsApi {
  _url: string;
  _apiKey: string;

  constructor(options: { baseUrl: string; apiKey: string }) {
    this._url = options.baseUrl;
    this._apiKey = options.apiKey;
  }

  getNews(keyword) {
    return fetch(`${this._url}${keyword}&apiKey=${this._apiKey}`).then(
      (res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      }
    );
  }
}

const newsApi = new NewsApi({
  baseUrl: 'https://newsapi.org/v2/everything?q=',
  apiKey: '3433daf6d8f744a3a55bff265b7aa764',
});

export default newsApi;
