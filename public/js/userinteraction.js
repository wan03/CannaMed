var $featuredHolder = $("#featured");

var API = {
  createFavorite: favoriteUser => {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/userFavorite/create",
      data: JSON.stringify(favoriteUser)
    });
  },
  getFavorites: user => {
    return $.ajax({
      url: "/api/userFavorite/" + user,
      type: "GET"
    });
  },
  removeFavorite: favoriteUser => {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/userFavorite/remove",
      data: JSON.stringify(favoriteUser)
    });
  },
  getStrains: () => {
    return $.ajax({
      url: "api/strains",
      type: "GET"
    });
  },
  getNews: () => {
    return $.ajax({
      url: "api/news",
      type: "GET"
    });
  }
};

var userInteraction = {
  // Refresh strains in home
  refreshStrains: () => {
    API.getStrains().then(function(data) {
      let featuredCard = $("<div>").addClass("card");
      $("<div>")
        .addClass("card-header text-center")
        .text("Featured Strains!")
        .appendTo(featuredCard);
      let cardBody = $("<div>")
        .addClass("card-body")
        .appendTo(featuredCard);
      let row = $("<div>")
        .addClass("row")
        .appendTo(cardBody);
      for (let i = 0; i < 3; i++) {
        let col = $("<div>")
          .addClass("col-sm-4")
          .appendTo(row);
        let innerCard = $("<div>")
          .addClass("card text-center")
          .appendTo(col);
        let cardBody2 = $("<div>")
          .addClass("card-body")
          .appendTo(innerCard);
        $("<img>")
          .addClass("img-thumbnail")
          .attr({
            alt: data[i].name,
            src: data[i].image,
            "data-id": data[i].id
          })
          .appendTo(cardBody2);
        $("<h5>")
          .addClass("card-title")
          .attr("data-id", data[i].name)
          .text(data[i].name)
          .appendTo(cardBody2);
        $("<p>")
          .addClass("card-text")
          .text(data[i].ailment)
          .appendTo(cardBody2);
        $("<a>")
          .addClass("hvr-grow")
          .attr("href", data[i].url)
          .text("Learn More")
          .appendTo(cardBody2);

        // console.log(data[1].ailment);
        $("#featured").append(featuredCard);
      }
    });
  },
  // Refresh news in home
  refreshNews: () => {
    API.getNews().then(function(data) {
      let articleCard = $("<div>").addClass("card");
      $("<div>")
        .addClass("card-header text-center")
        .text("News")
        .appendTo(articleCard);
      let cardBody = $("<div>")
        .addClass("card-body")
        .appendTo(articleCard);
      let ul = $("<ul>")
        .addClass("list-unstyled")
        .appendTo(cardBody);
      for (let i = 0; i < 3; i++) {
        let li = $("<li>").appendTo(ul);
        $("<p>")
          .addClass("article_title")
          .text(data[i].title)
          .appendTo(li);
        $("<p>")
          .addClass("article_text")
          .text(data[i].description)
          .appendTo(li);
        $("<a>")
          .addClass("hvr-grow")
          .attr("href", data[i].url)
          .text("Read More")
          .appendTo(li);
        $("<p>")
          .addClass("article_author")
          .text(data[i].author)
          .appendTo(li);
        $("<hr>");
      }
      $("#article").append(articleCard);
    });
    // console.log(data[1].ailment);
  },

  refreshFavorites: user => {
    API.getFavorites(user).then(function(data) {
      let featuredCard = $("<div>").addClass("card");
      $("<div>")
        .addClass("card-header text-center")
        .text("Featured Strains!")
        .appendTo(featuredCard);
      let cardBody = $("<div>")
        .addClass("card-body")
        .appendTo(featuredCard);
      let row = $("<div>")
        .addClass("row")
        .appendTo(cardBody);
      for (let i = 0; i < data.length; i++) {
        let col = $("<div>")
          .addClass("col-sm-4")
          .appendTo(row);
        let innerCard = $("<div>")
          .addClass("card text-center")
          .appendTo(col);
        let cardBody2 = $("<div>")
          .addClass("card-body")
          .appendTo(innerCard);
        $("<img>")
          .addClass("img-thumbnail")
          .attr({
            alt: data[i].name,
            src: data[i].image,
            "data-id": data[i].id
          })
          .appendTo(cardBody2);
        $("<h5>")
          .addClass("card-title")
          .attr("data-id", data[i].name)
          .text(data[i].name)
          .appendTo(cardBody2);
        $("<p>")
          .addClass("card-text")
          .text(data[i].ailment)
          .appendTo(cardBody2);
        $("<a>")
          .addClass("hvr-grow")
          .attr("href", data[i].url)
          .text("Learn More")
          .appendTo(cardBody2);

        $("#favorites").append(featuredCard);
      }
    });
  },

  handleCreateFavorite: () => {
    var favoriteUser = {
      id: this.id,
      username: this.username
    };
    API.createFavorite(favoriteUser).then(() => {
      refreshFavorites();
    });
  },
  handleRemoveFavorite: () => {
    var favoriteUser = {
      id: this.id,
      username: this.username
    };
    API.createFavorite(favoriteUser).then(() => {
      refreshFavorites();
    });
  }
};

getFeaturedStrains = () => {
  userInteraction.refreshStrains();
};

getTopNews = () => {
  userInteraction.refreshNews();
};

// TODO figure out how to call this function efficiently
getFavorites = user => {
  if (user) {
    userInteraction.refreshFavorites();
  }
};

getFeaturedStrains();
getTopNews();
