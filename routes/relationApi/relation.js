const router = require("express").Router();
const relationController = require("../../controllers/relationController");

// Matches with "/api/comment"
router.route("/follow")
  .post(relationController.create);

// Matches with "/api/comment/:id"
router
  .route("/unfollow")
  .delete(relationController.delete)


module.exports = router;