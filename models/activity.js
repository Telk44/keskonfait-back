'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {

    static associate(models) {
      console.log(models)
      Activity.User = Activity.belongsTo( models.User,{
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate:'CASCADE'
      });

     Activity.Ages = Activity.belongsToMany(models.Age, {
        through: "age_activity",
        as:"ages",
        foreignKey:"activityId"
      })
    }
  }
  Activity.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    price: DataTypes.FLOAT,
    phone: DataTypes.STRING,
    bookingEmail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Activity',
    tableName:'Activities'
  });
  // console.log("user", User.create)

  return Activity;
};