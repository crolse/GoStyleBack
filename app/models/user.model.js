module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {

        mail: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: true
        },

        password: {
            type: Sequelize.TEXT,
            allowNull: false
        },
    });

    return User;
};