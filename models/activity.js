'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Activity extends Model {

        static associate(models) {
            console.log(models)
            Activity.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
            Activity.belongsTo(models.Category,
                {
                    foreignKey: 'categoryId',
                    as: 'category',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                });
            Activity.belongsTo(models.Age, {
                foreignKey: "activityId",
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        }
    }

    Activity.init({
        imageUrl: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        price: DataTypes.STRING,
        phone: DataTypes.STRING,
        bookingEmail: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Activity',
        tableName: 'Activities'
    });

    return Activity;
};