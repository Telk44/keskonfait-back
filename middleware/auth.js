// const jwt = require('jsonwebtoken');
// const db = require('../models');
//
// const { User } = db.sequelize.models
//
// module.exports = (req, res, next) => {
//     try {
//         console.log(req.headers)
//         const token = req.headers.authorization.split(' ')[1];
//         const decodedToken = jwt.verify(token, 'RANDOM_SECRET_KEY');
//         const userId = decodedToken.userId;
//         req.decodedToken = decodedToken
//         if (req.body.userId && req.body.userId !== userId) {
//             throw 'User ID non valable';
//         } else {//on vérifie que l'UserId est dans la BDD
//             User.findOne({ where: { id: userId } }).then(user => {
//                 req.user = user
//                 next()
//             })
//         }
//     } catch (error) {
//         res.status(401).json({
//             error: new Error('Requête non authentifiée !')
//         })
//     }
// }