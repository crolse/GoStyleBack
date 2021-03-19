module.exports = app => {
    const user = require("../controllers/user.controller");

    var router = require("express").Router();

    // Create a new user
    router.post("/create", user.create);
    // User connection
    router.post("/connection" , user.connection);
/*
    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);

    // Retrieve all published Tutorials
    router.get("/published", tutorials.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOne);

    // Update a Tutorial with id
    router.put("/:id", tutorials.update);

    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);

    // Delete all Tutorials
    router.delete("/", tutorials.deleteAll);
    */

    app.use('/api/user', router);
};