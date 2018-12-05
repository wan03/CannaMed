require("dotenv").config({ path: "../../../.env" });
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWSAPIKEY);
var today = new Date();
var article = [];

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
    for (let i = 0; i < 11; i++) {
      article[i] =
        response.articles[i].author +
        "\n" +
        response.articles[i].title +
        "\n" +
        response.articles[i].description +
        "\n" +
        response.articles[i].url +
        "\n";
      console.log("Article " + [i] + "\n" + article[i]);
    }
  });
