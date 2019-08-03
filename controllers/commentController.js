const express = require("express");
const router = express.Router();
const db = require("../models");
    router.post("/comment/:id/:uid",(req,res)=>{
      //id === topicId
      db.Comment.create({
          cid : "",//uuid,
          cbody : req.body.cbody,
          TopicTid : req.params.id,
          UserUid : req.params.uid
      })
      .then(data =>{
        // if(){
        //   res.redirect("/reply/"+UserUid)
        // needs to be get
        // }
      })
      .catch();
    });
    router.delete("/comment/:id",(req,res)=>{
        //id === deletecommentby id 
      });
module.exports = router;