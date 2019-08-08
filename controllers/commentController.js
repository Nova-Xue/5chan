const db = require("../models");
module.exports = {
            create : (req,res)=>{
              db.Comment.create({
                  cbody : req.body.cbody,
                  cauthor : req.body.cauthor,
                  TopicTid : req.body.TopicTid,
                  UserUid : req.body.UserUid,
              }).then(data => res.json(data)).catch(err=>console.log(err));
            },
            findCommentsByTopic : (req,res)=>{
              db.Comment.findAll({
                where : {
                  TopicTid : req.params.id
                },
                order : [["createdAt","ASC"]]
              }).then(data => res.json(data)).catch(err=>console.log(err));
            }
            ,
            updateById : (req,res)=>{
              db.Comment.update(req.body,{
                where : {
                  cid : req.params.cid
                }
              }).then(data => res.json(data)).catch(err=>console.log(err));
            },
            delete : (req,res) =>{
              db.Comment.destroy({
                where : {
                  cid : req.params.id
                }
              }).then(data => res.json(data)).catch(err=>console.log(err));
            }
}