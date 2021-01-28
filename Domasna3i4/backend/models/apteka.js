'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apteka extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Apteka.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Ime: DataTypes.STRING,
    Adresa: DataTypes.STRING,
    Opstina: DataTypes.STRING,
    TelBroj: DataTypes.INTEGER,
    Rating: DataTypes.FLOAT,
    lat: DataTypes.DOUBLE,
    lon: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Apteka',
  });
  return Apteka;
};