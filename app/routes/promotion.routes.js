module.exports = app => {
    const promotion = require("../controllers/promotion.controller");

    var router = require("express").Router();

    //add promotion to user
    router.post("/add", promotion.addPromotionToUser);
    //list of a user's promotions
    router.get("/list/:userId", promotion.listPromotion)
    //details of a promotion 
    router.get("/details/:codePromo", promotion.detailsPromotion)
    
    app.use('/api/promotion', router);
};