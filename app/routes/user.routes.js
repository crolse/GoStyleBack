module.exports = app => {
    const user = require("../controllers/user.controller");

    var router = require("express").Router();

    // Create a new user
    router.post("/create", user.create);
    // User connection
    router.post("/connection" , user.connection);

    app.use('/api/user', router);
};