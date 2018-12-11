getUser = () => {
  $.getJSON("api/user_data", function(data) {
    if (data.hasOwnProperty("username")) {
      AuthrefreshStrainsAll(data.username.username);
    } else {
      refreshStrainsAll();
    }
  });
};

getStrains = () => {
  return $.ajax({
    url: "api/strains",
    type: "GET"
  });
};

createFavorite = favoriteUser => {
  return $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "/api/userFavorite/create",
    data: JSON.stringify(favoriteUser)
  });
};

AuthrefreshStrainsAll = username => {
  getStrains().then(data => {
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
        .html(
          "Ailments: " +
            data[i].ailments +
            "<br>" +
            "Feelings: " +
            data[i].feelings +
            "<br>" +
            "Flavor: " +
            data[i].flavor +
            "<br>" +
            " THC: " +
            data[i].thc +
            " CBD: " +
            data[i].cbd +
            "<br>" +
            "Location: " +
            data[i].location
        )
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
      $("#allCardNew").append(card);
    }
  });
};

refreshStrainsAll = () => {
  getStrains().then(data => {
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
        .html(
          "Ailments: " +
            data[i].ailments +
            "<br>" +
            "Feelings: " +
            data[i].feelings +
            "<br>" +
            "Flavor: " +
            data[i].flavor +
            "<br>" +
            " THC: " +
            data[i].thc +
            " CBD: " +
            data[i].cbd +
            "<br>" +
            "Location: " +
            data[i].location
        )
        .appendTo(cardBody);
      $("<button>")
        .addClass("btn btn-light-blue btn-md")
        .attr("href", data[i].url)
        .text("Learn More")
        .appendTo(cardBody);
      $("#allCardNew").append(card);
    }
  });
};

handleCreateFavorite = (favId, username) => {
  let favoriteUser = {
    favId: favId,
    username: username
  };
  createFavorite(favoriteUser);
};

$("div#allCardNew").on("click", ".addbtn", function() {
  let user = $(this).attr("data-user");
  let favId = $(this).attr("data-favid");
  handleCreateFavorite(favId, user);
});

getUser();
