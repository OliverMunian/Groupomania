module.exports = (sequelize, DataTypes)=>{
  return sequelize.define('Posts',{
    userId:{
      type: DataTypes.INTEGER,
      allow: false
    },
    message:{
      type: DataTypes.STRING,
      allow: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allow: false
    }
  },
  {
    timestamps: true,
    createdAt:'created',
    updateAt: false
  })
}