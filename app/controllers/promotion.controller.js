const db = require("../models");
const Promotion = db.promotion;
var passwordHash = require('password-hash');
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const User = db.user

//#region add promotion to user
exports.addPromotionToUser = (req, res) => {
    // Validate request
    if (!req.body.codePromo || !req.body.userId) {
        res.status(400).send({
            message: "aucune données reçu"
        });

        return;
    }
    // Verification promotion is valid
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

//#region list promotion to a user 
exports.listPromotion = (req, res) => {
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
            // check if user already has this promo
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