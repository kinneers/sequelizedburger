//Require models
var db = require('../models');

//Routes
module.exports = function(app) {
    
  app.get("/", function(req, res) {
    res.redirect("/burgers");
  });

  app.get("/burgers", function(req, res) {
    db.Burger.findAll({}).then(function(burgerData) {
      res.json(burgerData);
    });
  });

  app.post("/burgers/create", function(req, res) {
    db.Burger.create(req.body).then(function(burgerPost) {
      res.json(burgerPost);
    });
  });

  app.put("/burgers/:id", function(req, res) {
    db.Burger.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(burgerPost){
        res.json(burgerPost);
      });
  });
}
