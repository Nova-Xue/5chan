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
    router.put("/updatecomment/:id",(req,res)=>{
      db.Comment.update({
        where : {
          cid : req.params.id
        }
      },{
        cbody : req.body.cbody
    })
    .then(data =>{
    })
    .catch();
    });



    //count
    router.get("/commentcount/:id",(req,res)=>{
      //id === deletecommentby id 
      db.Comment.find()
      .then()
      .catch();
    });

    router.delete("/comment/:id",(req,res)=>{
        //id === deletecommentby id 
        db.Comment.destroy({
          where : {
            cid : req.params.id
          }
        })
        .then()
        .catch();
      });
module.exports = router;