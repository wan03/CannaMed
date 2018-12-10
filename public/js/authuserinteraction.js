$(document).ready(() => {
  const API = {
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
      console.log(user, "getfav---------------------");
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
    },
    getUser: () => {
      $.getJSON("api/user_data", function(data) {
        // Make sure the data contains the username as expected before using it
        if (data.hasOwnProperty("username")) {
          console.log("Username: " + data.username.username);
          userInteraction.refreshFavorites(data.username.username);
          userInteraction.AuthRefreshStrains(data.username.username);
          userInteraction.refreshNews();
          userInteraction.AuthrefreshStrainsAll(data.username.username);
        } else {
          userInteraction.refreshStrains();
          userInteraction.refreshNews();
          userInteraction.refreshStrainsAll();
        }
      });
    }
  };

  const userInteraction = {
    // Refresh featured strains in home
    refreshStrains: () => {
      API.getStrains().then(data => {
        let featuredCard = $("<div>")
          .addClass("card")
          .attr("id", "featured");
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
          console.log(data[i].favoriteId, "id-------------------------");
          let col = $("<div>")
            .addClass("col-sm-4")
            .appendTo(row);
          let innerCard = $("<div>")
            .addClass("card text-center")
            .appendTo(col);
          let cardBody2 = $("<div>")
            .addClass("card-body")
            .appendTo(innerCard);
          let anchor = $("<a>")
            .attr("href", data[i].url)
            .appendTo(cardBody2);
          $("<img>")
            .addClass("img-thumbnail")
            .attr({
              // eslint-disable-next-line prettier/prettier
              "alt": data[i].name,
              // eslint-disable-next-line prettier/prettier
              "src": data[i].image,
              "data-id": data[i].favoriteId
            })
            .appendTo(anchor);
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
          $("#featured").replaceWith(featuredCard);
        }
      });
    },
    // Refresh all strains
    refreshStrainsAll: () => {
      API.getStrains().then(data => {
        let allCard = $("<div>")
          .addClass("card")
          .attr("id", "all_card");
        $("<div>")
          .addClass("card-header text-center")
          .text("All Strains!")
          .appendTo(allCard);
        let cardBody = $("<div>")
          .addClass("card-body")
          .appendTo(allCard);
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
          let anchor = $("<a>")
            .attr("href", data[i].url)
            .appendTo(cardBody2);
          $("<img>")
            .addClass("img-thumbnail")
            .attr({
              // eslint-disable-next-line prettier/prettier
              "alt": data[i].name,
              // eslint-disable-next-line prettier/prettier
              "src": data[i].image,
              "data-id": data[i].favoriteId
            })
            .appendTo(anchor);
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
          $("#all_card").replaceWith(allCard);
        }
      });
    },
    // Refresh featured strains in home after auth
    AuthRefreshStrains: username => {
      API.getStrains().then(data => {
        let featuredCard = $("<div>")
          .addClass("card")
          .attr("id", "featured");
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
        for (let i = 6; i < 9; i++) {
          let col = $("<div>")
            .addClass("col-sm-4")
            .appendTo(row);
          let innerCard = $("<div>")
            .addClass("card text-center")
            .appendTo(col);
          let cardBody2 = $("<div>")
            .addClass("card-body")
            .appendTo(innerCard);
          let anchor = $("<a>")
            .attr("href", data[i].url)
            .appendTo(cardBody2);
          $("<img>")
            .addClass("img-thumbnail")
            .attr({
              // eslint-disable-next-line prettier/prettier
              "alt": data[i].name,
              // eslint-disable-next-line prettier/prettier
              "src": data[i].image,
              "data-id": data[i].favoriteId
            })
            .appendTo(anchor);
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
          $("<btn>")
            .addClass("btn addbtn btn-primary")
            .attr({
              "data-favid": data[i].favoriteId,
              "data-user": username
            })
            .text("Make Favorite!")
            .appendTo(cardBody2);

          // console.log(data[1].ailment);
          $("#featured").append(featuredCard);
        }
      });
    },
    //Refresh all strains after auth
    AuthrefreshStrainsAll: username => {
      API.getStrains().then(data => {
        let allCard = $("<div>")
          .addClass("card")
          .attr("id", "all_card");
        $("<div>")
          .addClass("card-header text-center")
          .text("All Strains!")
          .appendTo(allCard);
        let cardBody = $("<div>")
          .addClass("card-body")
          .appendTo(allCard);
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
          let anchor = $("<a>")
            .attr("href", data[i].url)
            .appendTo(cardBody2);
          $("<img>")
            .addClass("img-thumbnail")
            .attr({
              // eslint-disable-next-line prettier/prettier
              "alt": data[i].name,
              // eslint-disable-next-line prettier/prettier
              "src": data[i].image,
              "data-id": data[i].favoriteId
            })
            .appendTo(anchor);
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
          $("<btn>")
            .addClass("btn addbtn btn-primary")
            .attr({
              "data-favid": data[i].favoriteId,
              "data-user": username
            })
            .text("Make Favorite!")
            .appendTo(cardBody2);

          // console.log(data[1].ailment);
          $("#all_card").replaceWith(allCard);
        }
      });
    },
    // Refresh news in home
    refreshNews: () => {
      API.getNews().then(function(data) {
        let articleCard = $("<div>")
          .addClass("card")
          .attr("id", "article");
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
          $("<hr>").appendTo(li);
        }
        $("#article").replaceWith(articleCard);
      });
      // console.log(data[1].ailment);
    },

    refreshFavorites: username => {
      if (username) {
        console.log(username, "refreshfav--------------------");
        API.getFavorites(username).then(data => {
          let dataF = data.Favorites;
          console.log(dataF[0].name, "dataFname-------------------------");
          let favoriteCard = $("<div>")
            .addClass("card")
            .attr("id", "favorites");
          $("<div>")
            .addClass("card-header text-center")
            .text("Favorite Strains!")
            .appendTo(favoriteCard);
          let cardBody = $("<div>")
            .addClass("card-body")
            .appendTo(favoriteCard);
          let row = $("<div>")
            .addClass("row")
            .appendTo(cardBody);
          for (let i = 0; i < dataF.length; i++) {
            let col = $("<div>")
              .addClass("col-sm-4")
              .appendTo(row);
            let innerCard = $("<div>")
              .addClass("card text-center")
              .appendTo(col);
            let cardBody2 = $("<div>")
              .addClass("card-body")
              .appendTo(innerCard);
            let anchor = $("<a>")
              .attr("href", dataF[i].url)
              .appendTo(cardBody2);
            $("<img>")
              .addClass("img-thumbnail")
              .attr({
                // eslint-disable-next-line prettier/prettier
                "alt": dataF[i].name,
                // eslint-disable-next-line prettier/prettier
                "src": dataF[i].image,
                "data-id": dataF[i].favoriteId
              })
              .appendTo(anchor);
            $("<h5>")
              .addClass("card-title")
              .attr("data-id", dataF[i].name)
              .text(dataF[i].name)
              .appendTo(cardBody2);
            $("<p>")
              .addClass("card-text")
              .text(dataF[i].ailment)
              .appendTo(cardBody2);
            $("<a>")
              .addClass("hvr-grow")
              .attr("href", dataF[i].url)
              .text("Learn More")
              .appendTo(cardBody2);
            $("<btn>")
              .addClass("btn removebtn btn-primary")
              .attr({
                "data-favid": dataF[i].favoriteId,
                "data-user": username
              })
              .text("Remove Favorite")
              .appendTo(cardBody2);

            $("#favorites").replaceWith(favoriteCard);
          }
        });
      }
    },

    handleCreateFavorite: (favId, username) => {
      let favoriteUser = {
        favId: favId,
        username: username
      };
      API.createFavorite(favoriteUser).then(user => {
        console.log(user, "create-------------");
        userInteraction.refreshFavorites(user);
      });
    },
    handleRemoveFavorite: (favId, username) => {
      console.log(favId, "id--------------before");
      console.log(username, "id--------------before");
      let favoriteUser = {
        favId: favId,
        username: username
      };
      API.removeFavorite(favoriteUser).then(user => {
        console.log("after api call");
        console.log(user, "remove-----------------");
        userInteraction.refreshFavorites(user);
      });
    }
  };

  $("div#favoritestop").on("click", ".removebtn", function() {
    let user = $(this).attr("data-user");
    let favId = $(this).attr("data-favid");

    console.log(favId, user, "remove----------------------");
    userInteraction.handleRemoveFavorite(favId, user);
  });

  $("div#featuredtop").on("click", ".addbtn", function() {
    let user = $(this).attr("data-user");
    let favId = $(this).attr("data-favid");
    userInteraction.handleCreateFavorite(favId, user);
  });

  $("div#all_cardtop").on("click", ".addbtn", function() {
    let user = $(this).attr("data-user");
    let favId = $(this).attr("data-favid");
    userInteraction.handleCreateFavorite(favId, user);
  });

  API.getUser();
});
