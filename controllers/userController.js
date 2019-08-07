const db = require("../models");
const sequelize = require("../node_modules/sequelize");
module.exports = {
      findById : (req, res) => {
         db.User.findOne({
            where: {
               uid: req.params.id
            },

         })
            .then(data => res.json(data))
            .catch(err => console.log(err));
      },
      create : (req, res) => {
         db.User.create(req.body)
            .then(data => res.json(data))
            .catch(err => console.log(err));
      },
      updateById :(req, res) => {
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
      },
      delete : (req, res) => {
         //id === delete user by id
         db.User.destroy({
            where: {
               uid: req.params.id
            }
         })
            .then(data => console.log(data))
            .catch(err => console.log(err));
      },
      getFollower : (res,req)=>{
         sequelize.query("select *from `relationships` where `followId` = "+res.params.id)
         .then(data => res.json(data))
         .catch(err => console.log(err));
      },
      getFollowing : (res,req)=>{
         sequelize.query("select *from `relationships` where `UserUid` = "+res.params.id)
         .then(data => res.json(data))
         .catch(err => console.log(err));
      }
}

