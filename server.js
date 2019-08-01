var express = require("express");
var app = express();
var PORT = process.env.PORT || 3001;
var db = require("./models");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }
//app.use(routes);
// Routes
// =============================================================

db.sequelize.sync({force:true}).then(()=>{
    app.listen(PORT,()=>{
        console.log("App listening on PORT " + PORT);
    });
});