export interface Article {
  _id: string;
  keyword?: string;
  title: string;
  text: string;
  date: string;
  source: string;
  link: string;
  image: string;
}

export interface UnformattedArticle {
  _id: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  title: string;
  description: string;
  content: string;
}
