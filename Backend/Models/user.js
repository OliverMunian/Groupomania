module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('Users',{
      email:{
        type: DataTypes.STRING,
        unique: true,
        allow: false
      },
      nom:{
        type: DataTypes.STRING,
        allow: false
      },
      prenom:{
        type: DataTypes.STRING,
        allow: false
      },
      password:{
        type: DataTypes.STRING,
        allow: false
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    },
    {
      timestamps: true,
      createdAt:'created',
      updateAt: false
    })
  }