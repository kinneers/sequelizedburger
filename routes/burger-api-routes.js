//Require models
var db = require('../models');

//Routes
module.exports = function(app) {
    
  app.get("/", function(req, res) {
    res.redirect("/burgers");
  });

  app.get("/burgers", function(req, res) {
    db.Burger.findAll({
      where: {
        devoured: false
      }
    }).then(function(burgerData) {
      res.json(burgerData);
      console.log(burgerData);
    });
  });

  // app.get("/eaten", function(req, res) {
  //   db.Burger.findAll({
  //     where: {
  //       devoured: true
  //     }
  //   }).then(function(burgerData) {
  //     res.json(burgerData);
  //     console.log(burgerData);
  //   });
  // });

  app.post("/burgers/create", function(req, res) {
    db.Burger.create(req.body).then(function(burgerPost) {
      res.json(burgerPost);
      console.log(burgerPost);
    });
  });

  app.put("/burgers/update", function(req, res) {
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
