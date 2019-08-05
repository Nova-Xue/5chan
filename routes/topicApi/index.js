const router = require("express").Router();
const topicRoutes = require("./topic");
//const userRoutes = require("../userApi/user");
//const commentRoutes = require("./comment");
router.use("/topic", topicRoutes);
//router.use("/user",userRoutes);
//router.use("/comment",commentRoutes);
module.exports = router;