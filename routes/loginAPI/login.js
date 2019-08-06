const router = require("express").Router();
//var db = require("../../models");
var passport = require("../../config/passport");
// Matches with "/api/topic"
router.route("/")
  .post(passport.authenticate("local"), function(req, res) {
    res.redirect("/profile");
  });
module.exports = router;