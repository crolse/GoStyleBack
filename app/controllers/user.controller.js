const db = require("../models");
const User = db.user;
var passwordHash = require('password-hash');
const Op = db.Sequelize.Op;

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
                password: passwordHash.generate(req.body.password)

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

