const router = require("express").Router();
router.use("/register",function(req,res){
    console.log("in register routes");
      User.create(req.body)
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
});
module.exports = router;