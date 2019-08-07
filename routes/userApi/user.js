const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/user"

// Matches with "/api/user/:id"
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.updateById)
  .delete(userController.delete);
router
  .route("/")
  .post(userController.create);
router
  .route("/follower/:id")
  .get(userController.getFollower);
router
  .route("/following/:id")
  .get(userController.getFollowing)
module.exports = router;