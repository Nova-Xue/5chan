const path = require("path");
const router = require("express").Router();
const topicApi = require("./topicApi");
const userApi = require("./userApi");
// API Routes
router.use("/api", topicApi);
router.use("/api/",userApi);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;