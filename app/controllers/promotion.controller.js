const db = require("../models");
const Promotion = db.promotion;
const User = db.user

//#region add promotion to user
exports.addPromotionToUser = (req, res) => {
    // check if the request is valid
    if (!req.body.codePromo || !req.body.userId) {
        res.status(400).send({
            message: "aucune données reçu"
        });

        return;
    }
    // verification of the existence of the Promo Code
    Promotion.findOne({ where: { codePromo: req.body.codePromo } }).then((promotion) => {
        console.log(promotion);
        if (promotion == null) {
            res.status(406).send({
                message: "Qr code non valide"
            });
        }
        else {
            // check if user already has this promo
            promotion.getUsers({ where: { id: req.body.userId } }).then((user) => {
                if (user == "") {
                    // insert promo to user
                    promotion.addUser(req.body.userId)
                    res.status(200).send({
                        codePromo: req.body.codePromo
                    });
                }
                else {
                    res.status(400).send({
                        message: "Promotion déja ajoutée"
                    });
                }
            }).catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Une erreure s'est produite lors de l'ajout de la promotion"
                });
            });
        }
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Une erreur s'est produite lors de l'ajout de la promotion"
        });
    });
}
//#endregion

//#region list of a user's promotions
exports.listPromotion = (req, res) => {
    //check if the request is valid
    if (!req.params.userId) {
        res.status(400).send({
            message: "aucune données reçu"
        });

        return;
    }
    // Verification user is valid
    User.findOne({ where: { id: req.params.userId } }).then((user) => {
        console.log(user);
        if (user == null) {
            res.status(406).send({
                message: "Erreur utilisateur"
            });
        }
        else {
            // Recovery of promotions associated with the user
            user.getPromotions().then((promotion) => {
                res.status(200).send({
                    promotion
                });
            }).catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Une erreur s'est produite lors de la récupération de la liste des promotions"
                });
            });
        }
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Une erreur s'est produite lors de la récupération de la liste des promotions"
        });
    });

}
//#endregion

//#region details of a promotion 
exports.detailsPromotion = (req, res) => {
    //check if the request is valid
    if (!req.params.codePromo) {
        res.status(400).send({
            message: "aucune données reçu"
        });

        return;
    }
    // Recovering the benefits of a promotion according to its CodePromo
    Promotion.findOne({ where: { codePromo: req.params.codePromo } }).then((promotion) => {
        res.status(200).send({
            promotion
        });

    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Une erreur s'est produite lors de la récupération des détails"
        });
    });

}
//#endregion