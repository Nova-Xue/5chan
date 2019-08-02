const db = require("../models");
module.exports = (app) => {
   app.post("/user", (req, res) => {
      db.User.create(req.body)
         .then(data => console.log(data))
         .catch(err => console.log(data));
   });
   app.put("/user/:id", (req, res) => {
      db.User.update({
         email: req.params.email,
         location: req.params.location
         }, {
            where: {
               uid: req.params.id
            }
         })
         .then(data => console.log(data))
         .catch(err => console.log(data));
   });
   app.delete("/user/:id", (req, res) => {
      //id === delete user by id
      db.User.destory({
         where : {
            uid : req.params.id
         }
      })
         .then(data => console.log(data))
         .catch(err => console.log(data));
   });
};