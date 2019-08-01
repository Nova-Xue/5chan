const uuid = require('uuid/v4');
module.exports = (sequelize , DataTypes)=>{
    const Topic = sequelize.define("Topic",{
        tid : {
            allowNull: false,
            primaryKey: true,
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
        Topic.belongsTo(models.User, {
            foreignKey : {
                allowNull : false
            }
        });
    };
   
    return Topic;
}