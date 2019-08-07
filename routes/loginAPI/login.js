const router = require("express").Router();
var passport = require("../../config/passport");
// Matches with "/api/login"
router.route("/")
  .post(passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });
module.exports = router;