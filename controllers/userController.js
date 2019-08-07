const db = require("../models");
module.exports = {
      findById : (req, res) => {
         db.User.find({
            where: {
               uid: req.params.id
            },
            include : [db.Comment]

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
      }
}

//get single user 
// router.get("/user/:id", (req, res) => {
//    db.User.find({
//       where: {
//          uid: req.params.id
//       }
//    })
//       .then(data => console.log(data))
//       .catch(err => console.log(err));
// });
//check existence of user before register
// router.get("/checkusername/:username", (req, res) => {
//    db.User.find({
//       where: {
//          username: req.params.username
//       }
//    })
//       .then(data => console.log(data))
//       .catch(err => console.log(err));
// });
//working
// router.post("/user", (req, res) => {
//    db.User.create(req.body)
//       .then(data => console.log(data))
//       .catch(err => console.log(err));
// });
//working 
// router.put("/user/:id", (req, res) => {
//    db.User.update({
//       email: req.body.email,
//       location: req.body.location
//    }, {
//          where: {
//             uid: req.params.id
//          }
//       })
//       .then(data => console.log(data))
//       .catch(err => console.log(err));
// });
// //working 
// router.delete("/user/:id", (req, res) => {
//    //id === delete user by id
//    db.User.destroy({
//       where: {
//          uid: req.params.id
//       }
//    })
//       .then(data => console.log(data))
//       .catch(err => console.log(err));
// });
// module.exports = router;