const getAuthUserIdToken = require("../middleware/getAuthUserId");
/*** l'application du middleware à touts les routes pour les sécuriser ***/
module.exports = (req, res, next) => {
    /*** récupèrer le userId de la requête  ***/
    const userId = req.body.userId;
    /*** récupèrer les headers de la requête authorization ***/
    const reqAuthoriztion = req.headers.authorization;
    try {
        if (!reqAuthoriztion) throw new Error("Problème auth");
        /*** vérification du userId envoyé avec la requête qui doit correspondre au userId encodé du token ***/
        if (userId && userId !== getAuthUserIdToken(req)) throw new Error("userId est invalide");
        next();
    } catch (error) {
        res.status(401).json({
            error
        });
    }
};

