const express = require("express");
const app = express();
var session = require("express-session");
var passport = require("./config/passport");
const PORT = process.env.PORT || 3001;
const db = require("./models");
const routes = require("./routes");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }
app.use(routes);
db.sequelize.sync({force:true}).then(()=>{
    app.listen(PORT,()=>{
        console.log("App listening on PORT " + PORT);
    });
});