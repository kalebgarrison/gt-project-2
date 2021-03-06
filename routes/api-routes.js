const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {
  //Get route to display member info
  //ID needs to come from the login click
  //dashboard or login for path?
  app.get("/api/dashboard/:id", function (req, res) {
    db.Educator.findOne({
      where: {
        id: req.params.id,
      },
    }).then(function (dbEducator) {
      res.json(dbEducator);
    });
  });

  //Create Route for new Member
  app.post("/api/register", function (req, res) {
    console.log(req.body);
    db.Educator.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      bio: req.body.bio,
      SpecialityId: parseInt(req.body.SpecialityId),
    }).then(function (dbEducator) {
      res.json(dbEducator);
    });
  });

  //Update Route for Updated Member
  app.put("/api/dashboard/:id", function (req, res) {
    console.log(req.body);
    db.Educator.findOne({
      where: {
        id: parseInt(req.body.id),
      },
    }).then(function (dbEducator) {
      dbEducator.update({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        bio: req.body.bio
      })
      res.json(dbEducator);
    });
  });

  //Delete Route for Delete Member
  app.delete("/api/dashboard/delete/:id", function (req, res) {
    db.Educator.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    }).then(function (dbEducator) {
      res.json(dbEducator);
    });
  });

  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // console.log(req.body);
    console.log(req.user);
    res.json(req.user);
  });

  //Get route for search page. Need to adjust where clause
  //app.post("/api/search/:SpecialityId", function (req, res) {

  //});
};
