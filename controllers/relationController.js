const db = require("../models");
module.exports = {
      create : (req,res)=>{
        db.Relationship.create(req.body)
        .then(data => res.json(data))
        .catch(err=>console.log(err))
      },
      delete : (req,res)=>{
        db.Relationship.destroy({
          where : req.body
        })
        .then(data => res.json(data))
        .catch(err=>console.log(err))
      }
}
