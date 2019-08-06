const router = require("express").Router();
const topicRoutes = require("./topic");
router.use("/topic", topicRoutes);
module.exports = router;