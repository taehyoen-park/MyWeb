
module.exports = (sequelize,DataTypes) =>{

    const singlelog = sequelize.define('singlelog',{
        "id":{
            type:DataTypes.STRING(20),
            primarykey:true,
            autoIncrement:true
        },
        "room_id":{
            type:DataTypes.STRING(100)
        },
        "message":{
            type:DataTypes.STRING(20),
        },
        "from_id":{
            type:DataTypes.STRING(20),
        },
        "to_id":{
            type:DataTypes.STRING(20),
        },
        "data":{
            type:DataTypes.TIME,
        }
    });
    singlelog.associate = (models) => {
        singlelog.hasMany(models.users, { foreignKey: 'from_id' });
    };
    return users;  
}