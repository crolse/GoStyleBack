module.exports = (sequelize, Sequelize) => {
    const Promotion = sequelize.define("promotion", {
        codePromo: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        percentage: {
            type: Sequelize.FLOAT,

        },
        valueReduction: {
            type: Sequelize.FLOAT,

        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },

        dateStart: {
            type: Sequelize.DATE,
            allowNull: false
        },
        dateEnd: {
            type: Sequelize.DATE,
            allowNull: false
        },
    });

    return Promotion;
};

