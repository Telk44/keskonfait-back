const jwt = require('jsonwebtoken');
const db = require('../models');
require('dotenv').config();

const { User } = db.sequelize.models

module.exports = (req, res, next) => {
    try {
        console.log(req.headers)
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'process.env.DB_TOKEN');
        const userId = decodedToken.userId;
        // req.decodedToken = decodedToken
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable';
        } else {
            next()
            //on vérifie que l'UserId est dans la BDD
            // User.findOne({ where: { id: userId } }).then(user => {
            //     req.user = user
            //     next()
            // })
        }
    } catch (error) {
        res.status(401).json({
            error: new Error('Requête non authentifiée !')
        })
    }
}


// const jwt = require("jsonwebtoken");
// module.exports = {
//     validateRegister: (req, res, next) => {
//         // username min length 3
//         if (!req.body.username || req.body.username.length < 3) {
//             return res.status(400).send({
//                 msg: 'Please enter a username with min. 3 chars'
//             });
//         }
//         // password min 6 chars
//         if (!req.body.password || req.body.password.length < 6) {
//             return res.status(400).send({
//                 msg: 'Please enter a password with min. 6 chars'
//             });
//         }
//         // password (repeat) does not match
//         if (
//             !req.body.password_repeat ||
//             req.body.password != req.body.password_repeat
//         ) {
//             return res.status(400).send({
//                 msg: 'Both passwords must match'
//             });
//         }
//         next();
//     }
// };