var API = {
  login: userInfo => {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/signin",
      data: JSON.stringify(userInfo)
    });
  },
  signup: userInfo => {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/signup",
      data: JSON.stringify(userInfo)
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

$("#log_in").on("click", event => {
  event.preventDefault();
  var username = $("#inputUsernameEmail1")
    .val()
    .trim();
  var password = $("#inputPassword1")
    .val()
    .trim();
  var userInfo = { username: username, password: password };

  API.login(userInfo);
});

$("#sign_up").on("click", event => {
  event.preventDefault();
  var username = $("#inputUsernameEmail1")
    .val()
    .trim();
  var password = $("#inputPassword1")
    .val()
    .trim();
  var userInfo = { username: username, password: password };

  API.signup(userInfo);
});
