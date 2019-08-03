const express = require("express");
const router = express.Router();
const db = require("../models");

    router.post("/follow",(req,res)=>{
        //body = {followid from page useruid from session }
      db.Relationship.create(req.body)
      .then(data => console.log(data)
      )
      .catch(err => console.log(err)
      );
    });
    router.post("/unfollow",(req,res)=>{
        //same body  followid from page userid from session
        db.Relationship.destroy({
            where : req.body
        })
        .then(data => console.log(data)
        )
        .catch(err => console.log(err)
        );
      });
      //get relation for single user
      //for following display
      router.get("/relationfollowing",(req,res)=>{
      //same body  followid from page userid from session
            // use raw query here
            db.Relationship.find()
            .then(data => console.log(data)
            )
            .catch(err => console.log(err)
            );
          });
        //for follower display
        router.get("/relationfollower",(req,res)=>{

            //same body  followid from page userid from session
            // use raw query here
            db.Relationship.find()
            .then(data => console.log(data)
            )
            .catch(err => console.log(err)
            );
          });
      // get relationship from db to render buttons 
      router.get("/status",(req,res)=>{
        //same body  followid from page userid from session
        db.Relationship.find()
        .then(data => console.log(data)
        )
        .catch(err => console.log(err)
        );
      });
module.exports = router;