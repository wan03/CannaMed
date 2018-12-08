const $createFavoriteBtn = $(".create_favorite");

const API = {
  createFavorite: id => {
    return $.post({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/userFavorite",
      data: JSON.stringify(id)
    });
  },
  getFavorite: id => {
    return $.get({
      url: "/api/userFavorite/" + id
    });
  },
  removeFavorite: () => {
    console.log("somthing");
  },
  getStrains: function(id) {
    return $.get({
      url: "/api/strains" + id
    });
  }
};

var refreshStrains = () => {
  API.getStrains().then(function(data) {
    // TODO Figure out how to structure this
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

var handleCreateFavorite = () => {
  var favoriteID = {
    id: this.id
  };
  API.saveExample(favoriteID).then(() => {
    refreshStrains();
  });
};

$createFavoriteBtn.on("click", handleCreateFavorite);
