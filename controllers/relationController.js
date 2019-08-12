const db = require("../models");
module.exports = {
      create : (req,res)=>{
        db.Relationship.create(req.body)
        .then(data => res.json(data))
        .catch(err=>console.log(err))
      },
      deleteByBody : (req,res)=>{
        
        db.Relationship.destroy({
          where : {
            followId : req.body.followId,
            UserUid : req.body.UserUid
          }
        })
        .then(data => res.json(data))
        .catch(err=>console.log(err));
      }
}
