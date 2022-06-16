const { Sequelize } = require('sequelize');

module.exports = new Sequelize('keskonfait', 'kristell', '', {
    host: 'localhost',
    dialect:  'mariadb'
});
