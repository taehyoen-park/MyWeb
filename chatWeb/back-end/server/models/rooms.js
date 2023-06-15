
module.exports = (sequelize,DataTypes) =>{

    const rooms = sequelize.define('rooms',{
        "user_id":{
            type:DataTypes.STRING(20),
            primarykey:true,
        },
        "room_id":{
            type:DataTypes.STRING(100),
            primarykey:true,
        },
        "isGroup":{
            type:DataTypes.boolean,
        }
    });
    
    rooms.associate = (models) => {
        rooms.hasMany(models.users, { foreignKey: 'user_id' });
    };

    return rooms;  
}