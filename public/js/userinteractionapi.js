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
  getFavorites: id => {
    return $.get("/api/userFavorite/" + id);
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
    return $.get("/api/strains");
  }
};
