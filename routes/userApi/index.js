const router = require("express").Router();
const userRoutes = require("../userApi/user");
router.use("/user",userRoutes);
module.exports = router;