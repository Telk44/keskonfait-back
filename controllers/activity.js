const {Activity, User, Age, Category } = require('../models');
const {Op, where} = require("sequelize");
const getAuthUserId = require("../middleware/getAuthUserId");
const fs = require('fs');


// Création d'une activité(test ok)

exports.createActivity = (req, res, next) => {

    // if (!req.body.title || !req.body.description || !req.body.startDate || !req.body.endDate || !req.body.phone || !req.body.bookingEmail) {
    //     res.status(400).send({
    //         message: "Merci de remplir ces champs!"
    //     });
    //     return
    // }

    // const ages = req.body.ages

    // if (req.file) {
    //     Activity.create({
    //         userId: getAuthUserId(req),
    //         categoryId: req.body.categoryId,
    //         title: req.body.title,
    //         description: req.body.description,
    //         startDate: req.body.startDate,
    //         endDate: req.body.endDate,
    //         price: req.body.price,
    //         phone: req.body.phone,
    //         bookingEmail: req.body.bookingEmail,
    //         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    //     })
    //         .then(result => {
    //             // console.log("result", result)
    //             Age.findAll({
    //                 where: {
    //                     [Op.or]: ages.map(age => {
    //                         return {id: age}
    //                     })
    //                 }
    //             })
    //                 .then(ageResult => {
    //                     result.addAge(ageResult)
    //                     res.status(201).json({message: "Activité créée!"})
    //                 })
    //                 .catch(error => res.status(400).json({error,  message: 'Vous ne pouvez pas publier cette activité'}));
    //         })
    // } else {

    const formData = {
        userId:getAuthUserId(req),
        categoryId: req.body.categoryId,
        title: req.body.title,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        price: req.body.price,
        phone: req.body.phone,
        bookingEmail: req.body.bookingEmail,
        imageUrl: null
    }

        Activity.create(formData
        )
            .then(() => res.status(200).json({message: 'Activité créé'}))
            // .then(result => {
            //     // console.log("result", result)
            //     Age.findAll({
            //         where: {
            //             [Op.or]: ages.map(age => {
            //                 return {id: age}
            //             })
            //         }
            //     })
            //         .then(ageResult => {
            //             result.addAge(ageResult)
            //             res.status(201).json({message: "Activité créée!"})
            //         })
            //         .catch(error => res.status(400).json({error,  message: 'Vous ne pouvez pas publier cette activité'}));
            // })
            .catch(error => res.status(400).json({error,  message: 'oups, ça passe pas! '}))

    // }
}


//Liste de toutes les activités(test ok)

exports.findAllActivities = (req, res, next) => {
    Activity.findAll()
        .then((activities) => res.status(200).json(activities))
        .catch(error => res.status(400).json({error}))
}

// Liste de toutes les activités d'un utilisateur(test ok)

exports.getUserActivities = (req, res, next) => {
    Activity.findAll({ where: {userId:req.params.id}})
        .then((activities) => res.status(200).json(activities))
        .catch(error => res.status(400).json({error}))
}


//Supprimer une activité

exports.deleteActivity = (req, res, next) => {
    Activity.destroy({where: {id: req.params.id}})
        .then(() => res.status(200).json({message: 'Activité supprimée'}))
        .catch(error => res.status(400).json({error}))
};


//Modifier une activité
exports.updateActivity = (req, res, next) => {
    Activity.update({
        categoryId: req.body.categoryId,
        title: req.body.title,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        price: req.body.price,
        phone: req.body.phone,
        bookingEmail: req.body.bookingEmail,
    }, {
        where: {
            id: req.params.id
        }
    })
        .then(response => res.status(200).json({
            message: "Activité modifiée"
        }))
        .catch(error => res.status(404).json({ error }));
}


//Trouver une activité par Id
exports.getOneActivity = (req, res, next) => {
    Activity.findByPk(req.params.id,
        {
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ['firstname', 'lastname', 'userName']
                },
                {
                    model: Age,
                    as: "ages",
                    attributes: ["childrenAge"],
                    through: {
                        attributes: [],
                    }
                },
                {
                    model: Category,
                    as: "category",
                    attributes: ["name"],
                }
            ]
        }
    )
        .then(message => res.status(200).json(message))
        .catch(error => res.status(404).json({ error }));
};



//     const activityData = {
//         // image: req.file.path,
//         userId: getAuthUserId(req),
//         categoryId: req.body.categoryId,
//         title: req.body.title,
//         description: req.body.description,
//         startDate: req.body.startDate,
//         endDate: req.body.endDate,
//         price: req.body.price,
//         phone: req.body.phone,
//         bookingEmail: req.body.bookingEmail,
//     };
//     console.log(activityData)
//     Activity.create(activityData)
//         .then(result => {
//             // console.log("result", result)
//             Age.findAll({
//                 where: {
//                     [Op.or]: ages.map(age => {
//                         return {id: age}
//                     })
//                 }
//             })
//                 .then(ageResult => {
//                     result.addAge(ageResult)
//                     res.status(201).json({message: "Activité créée!"})
//                 })
//                 .catch(error => res.status(400).json({error}));
//         })
//         .catch(error => res.status(400).json({error}));
// };