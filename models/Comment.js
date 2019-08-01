const uuid = require('uuid/v4');
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Commet", {
        cid: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: uuid(),
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
            onDelete: "cascade"
        });
        Comment.hasOne(models.User,{
            onDelete: "cascade"
        });
    }
    return Comment;

};