module.exports = (sequelize , DataTypes)=>{
    const Relationship = sequelize.define("Relationship",{
        followId : {
            allowNull : false,
            type : DataTypes.UUID
        }

    });
    Relationship.associate = models =>{
        Relationship.belongsTo(models.User, {
            foreignKey : {
                allowNull : false
            }
        });
    }
    
    return Relationship;
};