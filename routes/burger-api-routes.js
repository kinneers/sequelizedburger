//Require models
var db = require('../models');

//Routes
module.exports = function(app) {
    
    //Route to redirect to the main page
    app.get("/", function(req, res) {
        res.redirect("/burgers");
    });

    //Get route for uneaten burgers
    app.get("/burgers", function(req, res) {
        db.Burger.findAll({
            where: {
                devoured: false
            }
        }).then(function(burgerData) {
            res.json(burgerData);
        });
    });

    //Get route for eaten burgers
    app.get("/burgers/devoured", function(req, res) {
        db.Burger.findAll({
            where: {
                devoured: true
            }
        }).then(function(burgersEaten) {
            res.json(burgersEaten);
        });
    });

    //Route to create new burger
    app.post("/burgers/create", function(req, res) {
        db.Burger.create(req.body).then(function(burgerPost) {
            res.json(burgerPost);
        });
    });

    //Route to update burger from uneaten to devoured
    app.put("/burgers/update", function(req, res) {
        db.Burger.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then(function(burgerPost){
            res.json(burgerPost);
        });
    });

    //Route to delete burger from database entirely
    app.delete("/burgers/delete/:id", function(req, res) {
        db.Burger.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(byeByeBurger) {
            res.json(byeByeBurger);
        });
    });
};
