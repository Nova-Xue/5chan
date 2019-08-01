const uuid = require('uuid/v4');
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
        cid: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            autoIncrement: false
        },
        cbody : {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [8]
        }
    });
    Comment.associate = models => {
        Comment.belongsTo(models.Topic, {
            foreignKey: {
                allowNull: false
              }
        });
        Comment.belongsTo(models.User,{
            foreignKey: {
                allowNull: false
              }
        });
    }
    return Comment;

};