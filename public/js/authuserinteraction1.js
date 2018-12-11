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
        if (data.hasOwnProperty("username")) {
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
        for (let i = 0; i < 3; i++) {
          let j = Math.floor(Math.random() * (250 - 1) + 1);
          let card = $("<div>").addClass("card mb-4");
          let overlay = $("<div>")
            .addClass("view overlay")
            .appendTo(card);
          $("<img>")
            .addClass("card-img-top")
            .attr({
              // eslint-disable-next-line prettier/prettier
              "alt": data[j].name,
              // eslint-disable-next-line prettier/prettier
              "src": data[j].image,
              "data-id": data[j].favoriteId
            })
            .appendTo(overlay);
          $("<a>")
            .addClass("mask rgba-white-slight")
            .attr("href", data[j].url)
            .appendTo(overlay);
          let cardBody = $("<div>")
            .addClass("card-body")
            .appendTo(card);
          $("<h4>")
            .addClass("card-title")
            .attr("data-id", data[j].name)
            .text(data[j].name)
            .appendTo(cardBody);
          $("<p>")
            .addClass("card-text")
            .text(data[j].ailments)
            .appendTo(cardBody);
          $("<button>")
            .addClass("btn btn-light-blue btn-md")
            .attr("href", data[j].url)
            .text("Learn More")
            .appendTo(cardBody);
          $("#featured").append(card);
        }
      });
    },
    // Refresh all strains
    refreshStrainsAll: () => {
      API.getStrains().then(data => {
        for (let i = 0; i < data.length; i++) {
          let card = $("<div>").addClass("card mb-4");
          let overlay = $("<div>")
            .addClass("view overlay")
            .appendTo(card);
          $("<img>")
            .addClass("card-img-top")
            .attr({
              // eslint-disable-next-line prettier/prettier
              "alt": data[i].name,
              // eslint-disable-next-line prettier/prettier
              "src": data[i].image,
              "data-id": data[i].favoriteId
            })
            .appendTo(overlay);
          $("<a>")
            .addClass("mask rgba-white-slight")
            .attr("href", data[i].url)
            .appendTo(overlay);
          let cardBody = $("<div>")
            .addClass("card-body")
            .appendTo(card);
          $("<h4>")
            .addClass("card-title")
            .attr("data-id", data[i].name)
            .text(data[i].name)
            .appendTo(cardBody);
          $("<p>")
            .addClass("card-text")
            .text(data[i].ailments)
            .appendTo(cardBody);
          $("<button>")
            .addClass("btn btn-light-blue btn-md")
            .attr("href", data[i].url)
            .text("Learn More")
            .appendTo(cardBody);
          $("#all_card").append(card);
        }
      });
    },
    // Refresh featured strains in home after auth
    AuthRefreshStrains: username => {
      API.getStrains().then(data => {
        for (let i = 0; i < 3; i++) {
          let j = Math.floor(Math.random() * (250 - 1) + 1);
          let card = $("<div>").addClass("card mb-4");
          let overlay = $("<div>")
            .addClass("view overlay")
            .appendTo(card);
          $("<img>")
            .addClass("card-img-top")
            .attr({
              // eslint-disable-next-line prettier/prettier
              "alt": data[j].name,
              // eslint-disable-next-line prettier/prettier
              "src": data[j].image,
              "data-id": data[j].favoriteId
            })
            .appendTo(overlay);
          $("<a>")
            .addClass("mask rgba-white-slight")
            .attr("href", data[j].url)
            .appendTo(overlay);
          let cardBody = $("<div>")
            .addClass("card-body")
            .appendTo(card);
          $("<h4>")
            .addClass("card-title")
            .attr("data-id", data[j].name)
            .text(data[j].name)
            .appendTo(cardBody);
          $("<p>")
            .addClass("card-text")
            .text(data[j].ailments)
            .appendTo(cardBody);
          $("<button>")
            .addClass("btn btn-light-blue btn-md")
            .attr("href", data[j].url)
            .text("Learn More")
            .appendTo(cardBody);
          $("<button>")
            .addClass("btn btn-light-blue btn-md addbtn")
            .attr({
              "data-favid": data[j].favoriteId,
              "data-user": username
            })
            .text("Make Favorite!")
            .appendTo(cardBody);
          $("#featured").append(card);
        }
      });
    },
    //Refresh all strains after auth
    AuthrefreshStrainsAll: username => {
      API.getStrains().then(data => {
        for (let i = 0; i < data.length; i++) {
          let card = $("<div>").addClass("card mb-4");
          let overlay = $("<div>")
            .addClass("view overlay")
            .appendTo(card);
          $("<img>")
            .addClass("card-img-top")
            .attr({
              // eslint-disable-next-line prettier/prettier
              "alt": data[i].name,
              // eslint-disable-next-line prettier/prettier
              "src": data[i].image,
              "data-id": data[i].favoriteId
            })
            .appendTo(overlay);
          $("<a>")
            .addClass("mask rgba-white-slight")
            .attr("href", data[i].url)
            .appendTo(overlay);
          let cardBody = $("<div>")
            .addClass("card-body")
            .appendTo(card);
          $("<h4>")
            .addClass("card-title")
            .attr("data-id", data[i].name)
            .text(data[i].name)
            .appendTo(cardBody);
          $("<p>")
            .addClass("card-text")
            .text(data[i].ailments)
            .appendTo(cardBody);
          $("<button>")
            .addClass("btn btn-light-blue btn-md")
            .attr("href", data[i].url)
            .text("Learn More")
            .appendTo(cardBody);
          $("<button>")
            .addClass("btn btn-light-blue btn-md addbtn")
            .attr({
              "data-favid": data[i].favoriteId,
              "data-user": username
            })
            .text("Make Favorite!")
            .appendTo(cardBody);
          $("#all_card").append(card);
        }
      });
    },
    // Refresh news in home
    refreshNews: () => {
      API.getNews().then(function(data) {
        for (let i = 0; i < data.length; i++) {
          if (i < 4) {
            let col = $("<div>").addClass("col-xl-3 col-lg-6");
            let row = $("<div>")
              .addClass("row")
              .appendTo(col);
            let div1 = $("<div>")
              .addClass("row")
              .appendTo(row);
            let col2 = $("<div>")
              .addClass("col-2")
              .appendTo(div1);
            $("<i>")
              .addClass("fa fa-location-arrow fa-2x mb-1 indigo-text")
              .attr("aria-hidden", "true")
              .appendTo(col2);
            let div2 = $("<div>")
              .addClass("col-10 mb-2 pl-3")
              .appendTo(row);
            $("<h5>")
              .addClass("feature-title font-bold mb-1")
              .text(data[i].title)
              .appendTo(div2);
            $("<p>")
              .addClass("grey-text mt-2 article_text")
              .text(data[i].description)
              .appendTo(div2);
            $("<a>")
              .addClass("hvr-grow")
              .attr("href", data[i].url)
              .text("Read More")
              .appendTo(div2);
            $("<p>")
              .addClass("article_author")
              .text(data[i].author)
              .appendTo(div2);
            $("#first_news").append(col);
          } else if (i > 6) {
            let col = $("<div>").addClass("col-xl-3 col-lg-6");
            let row = $("<div>")
              .addClass("row")
              .appendTo(col);
            let div1 = $("<div>")
              .addClass("row")
              .appendTo(row);
            let col2 = $("<div>")
              .addClass("col-2")
              .appendTo(div1);
            $("<i>")
              .addClass("fa fa-location-arrow fa-2x mb-1 indigo-text")
              .attr("aria-hidden", "true")
              .appendTo(col2);
            let div2 = $("<div>")
              .addClass("col-10 mb-2 pl-3")
              .appendTo(row);
            $("<h5>")
              .addClass("feature-title font-bold mb-1")
              .text(data[i].title)
              .appendTo(div2);
            $("<p>")
              .addClass("grey-text mt-2 article_text")
              .text(data[i].description)
              .appendTo(div2);
            $("<a>")
              .addClass("hvr-grow")
              .attr("href", data[i].url)
              .text("Read More")
              .appendTo(div2);
            $("<p>")
              .addClass("article_author")
              .text(data[i].author)
              .appendTo(div2);
            $("#second_news").append(col);
          }
        }
      });
    },

    refreshFavorites: username => {
      if (username) {
        API.getFavorites(username).then(data => {
          let dataF = data.Favorites;
          $("#sectionf").removeClass("d-none");
          $("#sectionh").removeClass("d-none");
          $("#sectionhr").removeClass("d-none");
          $("#favorites").removeClass("d-none");
          let div = $("<div>").attr("id", "favorites");
          if (dataF[0]) {
            for (let i = 0; i < dataF.length; i++) {
              let card = $("<div>")
                .addClass("card mb-4")
                .appendTo(div);
              let overlay = $("<div>")
                .addClass("view overlay")
                .appendTo(card);
              $("<img>")
                .addClass("card-img-top")
                .attr({
                  // eslint-disable-next-line prettier/prettier
                  "alt": dataF[i].name,
                  // eslint-disable-next-line prettier/prettier
                  "src": dataF[i].image,
                  "data-id": dataF[i].favoriteId
                })
                .appendTo(overlay);
              $("<a>")
                .addClass("mask rgba-white-slight")
                .attr("href", dataF[i].url)
                .appendTo(overlay);
              let cardBody = $("<div>")
                .addClass("card-body")
                .appendTo(card);
              $("<h4>")
                .addClass("card-title")
                .attr("data-id", dataF[i].name)
                .text(dataF[i].name)
                .appendTo(cardBody);
              $("<p>")
                .addClass("card-text")
                .text(dataF[i].ailments)
                .appendTo(cardBody);
              $("<button>")
                .addClass("btn btn-light-blue btn-md")
                .attr("href", dataF[i].url)
                .text("Learn More")
                .appendTo(cardBody);
              $("<button>")
                .addClass("btn btn-light-blue btn-md removebtn")
                .attr({
                  "data-favid": dataF[i].favoriteId,
                  "data-user": username
                })
                .text("Remove Favorite!")
                .appendTo(cardBody);
              $("#favorites").replaceWith(div);
            }
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
        userInteraction.refreshFavorites(user);
      });
    },
    handleRemoveFavorite: (favId, username) => {
      let favoriteUser = {
        favId: favId,
        username: username
      };
      API.removeFavorite(favoriteUser).then(user => {
        userInteraction.refreshFavorites(user);
      });
    }
  };

  $("div#favorites").on("click", ".removebtn", function() {
    let user = $(this).attr("data-user");
    let favId = $(this).attr("data-favid");
    userInteraction.handleRemoveFavorite(favId, user);
  });

  $("div#featured").on("click", ".addbtn", function() {
    let user = $(this).attr("data-user");
    let favId = $(this).attr("data-favid");
    userInteraction.handleCreateFavorite(favId, user);
  });

  $("div#all_card").on("click", ".addbtn", function() {
    let user = $(this).attr("data-user");
    let favId = $(this).attr("data-favid");
    userInteraction.handleCreateFavorite(favId, user);
  });

  API.getUser();
});
