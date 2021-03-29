const db = require("../models");
const Promotion = db.promotion;
var passwordHash = require('password-hash');
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const User = db.User

//#region add promotion to user
exports.addPromotionToUser = (req, res) => {
    // Validate request
    if (!req.body.codePromo || !req.body.userId ) {
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
                        err.message || "Une erreur c'est produit lors de l'ajout de la promotion"
                });
            });
        }
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Une erreur c'est produit lors de l'ajout de la promotion"
        });
    });
}
//#endregion

//#region list promotion to a user 
exports.listPromotion = (req, res) => {
    if (!req.body.userId ) {
        res.status(400).send({
            message: "aucune données reçu"
        });

        return;
    }
    
}
//#endregion