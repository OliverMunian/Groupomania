module.exports = (sequelize, DataTypes) =>{
  return sequelize.define('Commentaires',{
    id:{
      type: DataTypes.INTEGER,
      primaryKey:  true,
      autoIncrement: true,
    },
    userId:{
      type: DataTypes.INTEGER,
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
    message:{
      type: DataTypes.STRING,
      allow: false
    },
    postId:{
      type: DataTypes.INTEGER,
      allow: false
    },  
  },
  {
    timestamps: true,
    createdAt:'created',
    updateAt: false
  })
}