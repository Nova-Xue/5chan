const uuid = require('uuid/v4');
module.exports = (sequelize , DataTypes)=>{
    const Topic = sequelize.define("Topic",{
        tid : {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: uuid(),
            autoIncrement : false
        },
        aid : {
            allowNull: false,
            foreignKey: true,
            type: DataTypes.UUID,
            autoIncrement : false
        },
        rid : {
            allowNull: false,
            foreignKey: true,
            type: DataTypes.UUID,
            autoIncrement : false
        },
        title :{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          },
        tbody :{
            type: DataTypes.TEXT,
            allowNull: false,
            len: [15]
          }
    });
    Topic.associate = models => {
        Topic.hasMany(models.Comment,{
            onDelete: "cascade"
        });
        Topic.hasOne(models.User, {
            foreignKey : "aid",
            onUpdate : "cascade"
        });
        Topic.hasOne(models.User, {
            foreignKey : "rid",
            onUpdate : "cascade"
        });
    };
   
    return Topic;
}