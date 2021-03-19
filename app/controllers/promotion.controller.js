const db = require("../models");
const Promotion = db.promotion;
var passwordHash = require('password-hash');
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');

//#region Check promotion exist
exports.promotionExist = (req, res) => {
    // Validate request
    if (!req.body.codePromo) {
        res.status(400).send({
            message: "aucune données reçu"
        });

        return;
    }

    Promotion.findOne({ where: { codePromo: req.body.codePromo } }).then((value) => {
        console.log(value);
        if (value == null) {
            res.status(406).send({
                message: "Qr code non valide"
            });
        }
        else {
            res.status(200).json({
                message: "Qr code valide"
            })
        }
    })
}
