const db = require("../models");
const Promotion = db.promotion;
var passwordHash = require('password-hash');
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const User = db.User

//#region Check promotion exist
exports.addPromotionToUser = (req, res) => {
    // Validate request
    if (!req.body.codePromo) {
        res.status(400).send({
            message: "aucune données reçu"
        });

        return;
    }

    Promotion.findOne({ where: { codePromo: req.body.codePromo } }).then((promotion) => {
        console.log(promotion);
        if (promotion == null) {
            res.status(406).send({
                message: "Qr code non valide"
            });
        }
        else {
            promotion.getUsers({ where: { id: req.body.userId } }).then((user) => {
                if (user == "") {
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

