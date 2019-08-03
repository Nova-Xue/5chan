const uuid = require('uuid/v4');
module.exports = (sequelize ,DataTypes) =>{
    const User = sequelize.define("User",{
        uid : {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            autoIncrement : false
        },
        username : {
            allowNull: false,
            unique: true,
            type : DataTypes.STRING,
            validate: {
                len: [6]
              }
        },
        password : {
            allowNull: false,
            type : DataTypes.STRING,
            validate: {
                len: [8]
              }
        },
        email : {
            allowNull: false,
            unique: true,
            lowercase: true,
            type : DataTypes.STRING,
            validate: {
                isEmail: true, 
              }
        },
        location : {
            type : DataTypes.STRING
        }
    });
    User.beforeCreate((user,_)=>user.uid = uuid());
    User.associate = models =>{
        User.hasMany(models.Comment,{
            onDelete: "cascade"
        });
        User.hasMany(models.Topic, {
                
            onUpdate : "cascade"
        });
        User.hasMany(models.Relationship,{
            onUpdate : "cascade"
        });
    }
    return User;
};