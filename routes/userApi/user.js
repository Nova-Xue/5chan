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
module.exports = router;