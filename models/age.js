'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Age extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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