
module.exports = (sequelize,DataTypes) =>{

    const users = sequelize.define('users',{
        "user_id":{
            type:DataTypes.STRING(20),
            primarykey:true,
        },
        "user_password":{
            type:DataTypes.STRING(100)
        },
        "user_name":{
            type:DataTypes.STRING(20),
        },
        "user_salt":{
            type:DataTypes.STRING(20),
        }
    });

    return users;  
}