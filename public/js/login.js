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

$("a#log_in").on("click", event => {
  event.preventDefault();
  $("a#log_in").popover("dispose");
  let username = $("#inputUsernameEmail1")
    .val()
    .trim();
  let password = $("#inputPassword1")
    .val()
    .trim();
  let user = username.length;
  let pass = password.length;
  if (user < 3) {
    $("a#log_in").popover({
      trigger: "focus",
      content: "Your username has to be at least 3 characters long"
    });
    $("a#log_in").popover("show");
  } else if (user > 32) {
    $("a#log_in").popover({
      trigger: "focus",
      content: "Your username cannot be more than 32 characters long"
    });
    $("a#log_in").popover("show");
  } else if (pass < 3) {
    $("a#log_in").popover({
      trigger: "focus",
      content: "Your password has to be at least 3 characters long"
    });
    $("a#log_in").popover("show");
  } else if (pass > 32) {
    $("a#log_in").popover({
      trigger: "focus",
      content: "Your password cannot be more than 32 characters long"
    });
    $("a#log_in").popover("show");
  } else {
    let userInfo = { username: username, password: password };

    APIlogin.login(userInfo).then(result => {
      console.log(result.result);
      $("a#log_in").popover("dispose");
      if (result.result === "success") {
        $("#login_modal").modal("hide");
        window.location.href = "/";
      } else {
        $("a#log_in").popover({
          trigger: "focus",
          content: "Sorry could not log you in, try again"
        });
        $("a#log_in").popover("show");
      }
    });
  }
});

$("#sign_up").on("click", event => {
  event.preventDefault();
  $("a#sign_up").popover("dispose");
  let username = $("#inputUsernameEmail1")
    .val()
    .trim();
  let password = $("#inputPassword1")
    .val()
    .trim();
  let user = username.length;
  let pass = password.length;
  if (user < 3) {
    $("a#sign_up").popover({
      trigger: "focus",
      content: "Your username has to be at least 3 characters long"
    });
    $("a#sign_up").popover("show");
  } else if (user > 32) {
    $("a#sign_up").popover({
      trigger: "focus",
      content: "Your username cannot be more than 32 characters long"
    });
    $("a#sign_up").popover("show");
  } else if (pass < 3) {
    $("a#sign_up").popover({
      trigger: "focus",
      content: "Your password has to be at least 3 characters long"
    });
    $("a#sign_up").popover("show");
  } else if (pass > 32) {
    $("a#sign_up").popover({
      trigger: "focus",
      content: "Your password cannot be more than 32 characters long"
    });
    $("a#sign_up").popover("show");
  } else {
    let userInfo = { username: username, password: password };

    APIlogin.signup(userInfo).then(result => {
      console.log(result);
      $("#login_modal").modal("hide");
      window.location.href = "/";
    });
  }
});

$("#log_out").on("click", event => {
  event.preventDefault();

  APIlogin.logout();
});
