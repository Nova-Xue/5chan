const express = require("express");
const router = express.Router();
const db = require("../models");

    router.post("/topic",(req,res)=>{
       //tid =uuid
       //title
       //tbody
       //aid == author uuid
       //userId default == aid 
    });
    router.put("/topic/:id",(req,res)=>{
        //update last reply
        //id == reply uuid
     });
   //   router.delete("/user/:id",(req,res)=>{
   //      //id === delete user by id
   //    });
module.exports = router;