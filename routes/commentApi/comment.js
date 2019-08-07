const router = require("express").Router();
const commentController = require("../../controllers/commentController");

// Matches with "/api/comment"
router.route("/")
  .post(commentController.create);

// Matches with "/api/comment/:id"
router
  .route("/:id")
  .put(commentController.updateById)
  .delete(commentController.delete);
router
  .route("/topic/:id")
  .get(commentController.findCommentsByTopic);

module.exports = router;