module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: {
        args: [3, 32],
        msg: "Username not in this length"
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len: {
        args: [3, 32],
        msg: "password not in this length"
      }
    },

    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active"
    }
  });
  User.associate = models => {
    User.belongsToMany(models.Favorite, {
      through: "UserFavorite"
    });
  };
  return User;
};
