const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
require('dotenv').config();

// const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}/;
// const regexPassword = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

// inscription new user(ok)
exports.signup = (req, res) => {
    // if (req.body.email == null || req.body.password == null || req.body.username == null) {
    //     return res.status(400).json({ 'error': 'empty space' });
    // }
    // if (!regexEmail.test(req.body.email)) {
    //     return res.status(400).json({ 'error': 'mail error' });
    // }
    // if (!regexPassword.test(req.body.password)) {
    //     return res.status(400).json({ 'error': 'password error' });
    // }
    User.findOne({
        attributes: ['email'],
        where: { email: req.body.email }
    })
        .then((user) => {
            if (!user) {
                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        console.log(hash)
                        User.create ({
                            email: req.body.email,
                            password : hash,
                            lastName : req.body.lastName,
                            firstName : req.body.firstName,
                            username : req.body.username,
                            role: req.body.role
                        })
                            .then((user) => {
                                console.log(user)
                                res.status(201).json({ message: 'user ok !' })
                            });
                    })
                    .catch(error => res.status(400).json({ error }));
            }})

        .catch(error => res.status(500).json({ 'error': 'user already exists' }));
};

// Fonction login (ok)
exports.login = (req, res, next) => {
    User.findOne({ where : {email: req.body.email }})
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur inconnu !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            'process.env.DB_TOKEN',
                            { expiresIn: '24h' }
                        ),
                        role: user.role
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Suppression d'un compte
exports.deleteAccount = (req, res, next) => {
    User.findOne({ where: { id: req.params.id }})
        .then((user) => {
            User.destroy({ where: { id: req.params.id }})
                .then(() => res.status(200).json({ message: 'Compte supprimé' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch (error => res.status(500).json({ error }));
};

// Obtention d'un compte (ok)
exports.getOneAccount = (req, res, next) => {
    User.findOne({ where: { id: req.params.id }})
        .then((user) => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
};

// Modification d'un compte (ok)

exports.modifyAccount = (req, res) => {
    User.update({
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        username: req.body.username
    }, {
        where: {
            id: req.params.id
        }
    })
        .then(response => res.status(200).json({
            message: "account modified"
        }))
        .catch(error => console.log("ERROR when updateValue"));
}


//récupération tous les comptes
exports.getAllAccounts = (req, res, next) => {
    User.findAll()
        .then((users) => res.status(200).json(users))
        // console.log(users)
        .catch(error => res.status(400).json({ error }));
};