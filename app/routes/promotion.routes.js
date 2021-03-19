module.exports = app => {
    const promotion = require("../controllers/promotion.controller");

    var router = require("express").Router();

    // Check promotion exist
    router.post("/verification", promotion.promotionExist);

    app.use('/api/promotion', router);
};