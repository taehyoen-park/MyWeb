
module.exports = (sequelize,DataTypes) =>{

    const friends = sequelize.define('friends',{
        "user_id":{
            type:DataTypes.STRING(20),
            primarykey:true,
        },
        "friend_id":{
            type:DataTypes.STRING(20)
        },
        "friend_name":{
            type:DataTypes.STRING(20),
        },
    });

    return users;  
}