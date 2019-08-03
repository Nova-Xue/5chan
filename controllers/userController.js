const express = require("express");
const router = express.Router();
const db = require("../models");
      //working
   router.post("/user", (req, res) => {
      db.User.create(req.body)
         .then(data => console.log(data))
         .catch(err => console.log(err));
   });
   //working 
   router.put("/user/:id", (req, res) => {
      db.User.update({
         email: req.body.email,
         location: req.body.location
         }, {
            where: {
               uid: req.params.id
            }
         })
         .then(data => console.log(data))
         .catch(err => console.log(err));
   });
   //working 
   router.delete("/user/:id", (req, res) => {
      //id === delete user by id
      db.User.destroy({
         where : {
            uid : req.params.id
         }
      })
         .then(data => console.log(data))
         .catch(err => console.log(err));
   });
module.exports = router;