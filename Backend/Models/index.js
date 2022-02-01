const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    'groupomania',
    'root',
    'Charbel20071993',
    {
        host: 'localhost',
        dialect: 'mysql',
        allowPublicKeyRetrieval: true,
        dialectOptions: {
          timezone: 'Etc/GMT-2'
        },
        logging: true
    },
);

sequelize.authenticate()
  .then(() =>{
    console.log('la connexion a la base de donnée a bien été établie')
  })
  .catch(error =>{
    console.log(`Laconnexion a la base donnée a échouée ${error}`)
  })

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.post = require("./post.js")(sequelize, Sequelize);
db.commentaire = require("./commentaire.js")(sequelize, Sequelize);
db.post.belongsTo(db.user)
module.exports = db;