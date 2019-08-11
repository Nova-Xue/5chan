const router = require("express").Router();
const relationRoutes = require("./relation");
router.use("/relation",relationRoutes);
module.exports = router;