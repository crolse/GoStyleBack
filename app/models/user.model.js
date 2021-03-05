module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {

        mail: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },

        password: {
            type: Sequelize.TEXT,
            allowNull: false
        },
    });

    return User;
};