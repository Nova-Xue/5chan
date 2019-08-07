const uuid = require('uuid/v4');
module.exports = (sequelize , DataTypes)=>{
    const Topic = sequelize.define("Topic",{
        tid : {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            autoIncrement : false,
            defaultValue : ()=> uuid()
        },
        title :{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          },
        topicbody :{
            type: DataTypes.TEXT,
            allowNull: false,
            len: [15]
          },
          aid : {
              type : DataTypes.UUID,
              allowNull: false
          },
          author : {
              type : DataTypes.STRING,
              allowNull : false
          }
          
    });
    Topic.associate = models => {
        Topic.hasMany(models.Comment,{
            onDelete: "cascade"
        });
        Topic.belongsTo(models.User, {
            foreignKey : {
                allowNull : true
            }
        });
    };
   
    return Topic;
}