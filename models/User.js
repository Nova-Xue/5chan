const uuid = require('uuid/v4');
module.exports = (sequelize ,DataTypes) =>{
    const User = sequelize.define("User",{
        uid : {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: uuid(),
            autoIncrement : false
        },
        username : {
            allowNull: false,
            tyep : DataTypes.STRING,
            validate: {
                len: [6]
              }
        },
        password : {
            allowNull: false,
            tyep : DataTypes.STRING,
            validate: {
                len: [8]
              }
        },
        email : {
            allowNull: false,
            unique: true,
            lowercase: true,
            tyep : DataTypes.STRING,
            validate: {
                isEmail: true, 
              }
        },
        location : {
            tyep : DataTypes.STRING
        }
    });
    User.associate = models =>{
        User.hasMany(models.Comment,{
            onDelete: "cascade"
        })
        User.hasMany(models.User,{
            through : "Relationship",
            as : "follower",
            foreignKey : "followingId",
            otherKey : "followerId"
        });
        User.belongsToMany(models.User,{
            through : "Relationship",
            as : "following",
            foreignKey : "followerId",
            otherKey : "followingId"
        });
    }
    return User;
};