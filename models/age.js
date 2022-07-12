'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Age extends Model {

    static associate(models) {
      console.log(models)
      Age.Activities = Age.belongsToMany(models.Activity, {
        through: "age_activity",
        as:"activities",
        foreignKey:"ageId"
      })
      // define association here
    }
  }
  Age.init({
    childrenAge: DataTypes.STRING
  }, {
    sequelize: sequelize,
    modelName: 'Age',
    tableName: 'Ages'
  });
  return Age;
};