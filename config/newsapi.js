require("dotenv").config({ path: "../.env" });
const NewsAPI = require("newsapi");
let apiKey = process.env.NEWSAPIKEY;
const newsapi = new NewsAPI(apiKey);
var today = new Date();
var article = [];

module.exports = newsApi = {
  getNews: () =>
    newsapi.v2
      .everything({
        q: "cannabis",
        from: "2018-11-20",
        to: today,
        language: "en",
        sortBy: "relevancy",
        page: 2
      })
      .then(response => {
        // console.log(response.articles[0].author);
        let topNews = [];
        for (let i = 0; i < 11; i++) {
          article[i] = {
            author: response.articles[i].author,
            title: response.articles[i].title,
            description: response.articles[i].description,
            url: response.articles[i].url
          };
          topNews.push(article[i]);
        }
        return topNews;
      })
};
