const db = require("../models");
const User = db.user;
var passwordHash = require('password-hash');
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');

//#region  Create a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.mail && !req.body.password) {
        res.status(400).send({
            message: "mail et/ou mot de passe vide"
        });

        return;
    }

    //duplicate mail verification
    User.count({ where: { mail: req.body.mail } }).then((value) => {
        console.log(value);
        if (value != 0) {
            res.status(406).send({
                message: "mail déja utilisé"
            });
        }
        else {
            // Create a User
            const user = {
                mail: req.body.mail,
                password: passwordHash.generate(req.body.password),
                firstName: req.body.firstName,
                lastName: req.body.lastName,

            };

            // Save User in the database
            User.create(user)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Une erreur c'est produit lors de la création de l'utilisateur"
                    });
                });
        }

    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Une erreur c'est produit lors de la création de l'utilisateur"
        });
    });




};
//#endregion

//#region connection 
exports.connection = (req, res) => {
    // Validate request
    if (!req.body.mail && !req.body.password) {
        res.status(400).send({
            message: "mail et/ou mot de passe vide"
        });

        return;
    }
    User.findOne({ where: { mail: req.body.mail } }).then((value) => {
        console.log(value);
        console.log(value.dataValues.password)
        if (value == null) {
            res.status(406).send({
                message: "l'adresse mail n'existe pas"
            });
        }
        else {
            // password verification
            let checkPassword = passwordHash.verify(req.body.password, value.dataValues.password)
            if (checkPassword == true) {
                console.log("vous êtes connecté")
                res.status(200).json({
                    userId: value.dataValues.id,
                    //Create a token
                    token: jwt.sign(
                        { userId: value.dataValues.id },
                        'ULTRA_RANDOM_TOKEN_SECRET',
                        { expiresIn: '4h' }
                    )
                });
            }
            else {
                res.status(406).send({
                    message: "mot de passe invalide"
                });
            }
        }

    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Une erreur c'est produit lors de la connexion"
        });
    });


}
//#endregion