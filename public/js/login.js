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
  logout: () => {
    return $.ajax({
      url: "/logout",
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

  $("#login_modal").modal("hide");
  API.login(userInfo);
  // .then((window.top.location = "/dashboard"));
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

$("#log_out").on("click", event => {
  event.preventDefault();

  API.logout();
});
