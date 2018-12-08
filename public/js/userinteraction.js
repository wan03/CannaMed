const $createFavoriteBtn = $(".create_favorite");

const API = require("./userinteractionapi");

module.exports = userInteraction = {
  refreshStrains: () => {
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
  },

  refreshFavorites: () => {
    API.getFavorites().then(function(data) {
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
