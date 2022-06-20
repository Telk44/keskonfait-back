const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');
const helmet = require('helmet');
const db = require('./models');
const userRoutes = require("./routes/user");

db.sequelize
    .authenticate()
    .then(() => {
        console.log('connexion à la bdd ok');
        db.sequelize.sync({
             // force:true
        })
    })
    .catch(error => {
        console.log(error);
    });

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(helmet());

app.use('/', userRoutes);

module.exports = app;