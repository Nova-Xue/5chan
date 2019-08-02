const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./models");
const userRoutes = require("./controllers/userControlloer");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }
//app.use(routes);
// Routes
// =============================================================
app.use(userRoutes);
db.sequelize.sync({force:true}).then(()=>{
    app.listen(PORT,()=>{
        console.log("App listening on PORT " + PORT);
    });
});