const router = require("express").Router();
const relationController = require("../../controllers/relationController");

// Matches with "/api/relation/follow"
router.route("/follow")
  .post(relationController.create);

// Matches with "/api/relation/unfollow"
router.route("/unfollow")
  .post(relationController.deleteByBody);
module.exports = router;