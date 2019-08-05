const router = require("express").Router();
const topicController = require("../../controllers/topicController");

// Matches with "/api/topic"
router.route("/")
  .get(topicController.findAll)
  .post(topicController.create);

// Matches with "/api/topic/:id"
router
  .route("/:id")
  .get(topicController.findById)
  .put(topicController.updateById)
  .put(topicController.updateLastReply)
  .delete(topicController.delete);
router
    .route("/user/:id")
    .get(topicController.findAllByUid);
module.exports = router;