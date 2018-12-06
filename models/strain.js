module.exports = function(sequelize, DataTypes) {
  const Strain = sequelize.define("Strain", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    type: DataTypes.STRING,
    breeder: DataTypes.STRING,
    effects: DataTypes.STRING,
    ailment: DataTypes.STRING,
    flavor: DataTypes.STRING,
    thc: DataTypes.INTEGER,
    cbd: DataTypes.INTEGER
  });
  return Strain;
};
