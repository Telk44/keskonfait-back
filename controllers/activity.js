const {Activity, Age} = require('../models');
const {Op} = require("sequelize");

// Création d'une activité
exports.createActivity = (req, res, next) => {
    const ages = req.body.ages
    const activityData = {
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,

    };
    const activity = Activity.create(activityData)
    activity.then(result => {
        console.log("result", result)
        const age = Age.findAll({
            where: {
                [Op.or]: ages.map(age => {
                    return { id:age }
                })
            }
        });
        age.then(ageResult => {
            result.addAge(ageResult)
            res.status(201).json({ message: "Activité créée!" })
        })
    })


    // .then(() => res.status(201).json({ message: "Message envoyé!" }))
    // .catch(error => res.status(400).json({ error }));
};


// const activity = Activity.create({
//     userId: "3",
//     title: "Basket",
//
// }, {
//     include: [
//         // {
//         //     association: Activity.associations.user
//         // },
//         {
//             association: Activity.associations.ages
//         }
//     ]
// });
