const express = require("express");
const router = express.Router();
const db = require("../models");
    router.post("/comment/:id",(req,res)=>{
      //id === topicId
    });
    router.delete("/comment/:id",(req,res)=>{
        //id === deletecommentby id 
      });
module.exports = router;