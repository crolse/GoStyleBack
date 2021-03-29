module.exports = app => {
    const promotion = require("../controllers/promotion.controller");

    var router = require("express").Router();

    // Check promotion exist and add to user 
    router.post("/add", promotion.addPromotionToUser);
    app.use('/api/promotion', router);
};