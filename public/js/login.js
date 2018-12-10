const APIlogin = {
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
  APIlogin.login(userInfo);
  window.location.href = "/";
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

  APIlogin.signup(userInfo);
  window.location.href = "/";
});

$("#log_out").on("click", event => {
  event.preventDefault();

  APIlogin.logout();
});
