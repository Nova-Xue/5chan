const express = require("express");
const router = express.Router();
const db = require("../models");
//create 
router.post("/topic", (req, res) => {
   //tid =uuid
   //title
   //tbody
   //aid == author uuid
   //userId default == aid 
   db.Topic.create(req.body)
      .then(data => console.log(data)
      )
      .catch(err => console.log(err)
      );

});
//get all topic for main page
//get one topic for detail page and populate with comment

//count route for pagination

//update the topic
router.put("/topic/:id", (req, res) => {
   //update last reply
   //id == reply uuid
   db.Topic.update({
      title: req.body.title,
      tbody: req.body.tbody
   }, {
         where: {
            tid: req.params.id
         }
      })
      .then(data => console.log(data)
      )
      .catch(err => console.log(err)
      );
});
//update  last reply uid
router.get("/reply/:id", (req, res) => {
   db.Topic.update({
      UserUid: req.body.uid
   }, {
         where: {
            tid: req.params.id
         }
      })
      .then(data => console.log(data)
      )
      .catch(err => console.log(err)
      );
});
//deletet the topic
router.delete("/delete/:id", (req, res) => {
   db.Topic.destroy({
      where: {
         tid: req.params.id
      }
   })
      .then(data => console.log(data)
      )
      .catch(err => console.log(err)
      );
});
//   router.delete("/user/:id",(req,res)=>{
//      //id === delete user by id
//    });
module.exports = router;