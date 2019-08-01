module.exports = (sequelize , DataTypes)=>{
    const Relationship = sequelize.define("Relationship",{
        followerId : {
            allowNull: false,
            foreignKey: true,
            type: DataTypes.UUID,
            autoIncrement : false
        },
        followingId : {
            allowNull: false,
            foreignKey: true,
            type: DataTypes.UUID,
            autoIncrement : false
        }
    });
    return Relationship;
};